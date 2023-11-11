const e = require("express");
const db = require("../db");
const mongoose = require("mongoose");

// this endpoint takes
// 'course_id', 'rating' = { 'difficulty', 'usefulness_real_world', 'staff_responsiveness', 'quality_of_teaching', 'workload' }, 'review', 'professor'
// 'email'
exports.postReview = async (req, res) => {
    if (
        req.body.course_id == null ||
        req.body.rating == null ||
        req.body.review == null ||
        req.body.email == null ||
        req.body.professor == null
    ) {
        return res.status(400).json({ error: "Missing params." });
    }
    if (
        req.body.rating.difficulty == null ||
        req.body.rating.usefulness_real_world == null ||
        req.body.rating.staff_responsiveness == null ||
        req.body.rating.quality_of_teaching == null ||
        req.body.rating.workload == null
    ) {
        return res.status(400).json({ error: "Missing ratings." });
    }
    if (!isRating(req.body.rating.difficulty) || !isRating(req.body.rating.usefulness_real_world) || !isRating(req.body.rating.staff_responsiveness) ||
        !isRating(req.body.rating.quality_of_teaching) || !isRating(req.body.rating.workload)) {
        return res.status(400).json({ error: "invalid rating" })
    }
    let reviewData = { date: Date.now(), ...req.body };
    const review = new db.models.review(reviewData);
    try {
        const insertedReview = await review.save();
        return res.status(200).json(insertedReview);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

function isRating(x) {
    if (x <= 0 || x > 5) {
        return false
    }
    return true
}

// takes page and limit as query params
exports.getReviews = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    try {
        const reviews = await db.models.review
            .find()
            .sort({ date: -1 })
            .skip(page * limit)
            .limit(limit);
        return res.status(200).json(reviews);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// takes page and limit as query params
exports.getCourseReviews = async (req, res) => {
    let page = req.query.page || 0;
    const limit = req.query.limit || 10;
    let maxPage = 0;

    const courseId = req.params.id;
    if (courseId == null) {
        return res.status(400).json({ error: "Missing course id." });
    }
    try {
        page = Math.max(0, page);
        const numReviews = await db.models.review
            .find({ course_id: new mongoose.Types.ObjectId(courseId) })
            .countDocuments();

        if (numReviews === 0) {
            maxPage = 0;
        } else {
            maxPage = Math.ceil(numReviews / limit) - 1;
        }
        page = Math.min(page, maxPage);

        const reviews = await db.models.review
            .find({ course_id: new mongoose.Types.ObjectId(courseId) })
            .skip(page * limit)
            .limit(limit);
        return res.status(200).json({ reviews, maxPage: maxPage + 1 });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getRatingAverages = async (req, res) => {
    const courseId = req.params.id;
    if (courseId == null) {
        return res.status(400).json({ error: 'Missing course id.' })
    }
    try {
        // Cite: https://docs.mongodb.com/manual/aggregation/
        const averageRating = await db.models.review.aggregate([
            { $match: { course_id: courseId } },
            {
                $group:
                    {
                        _id: null,
                        difficulty: { $avg: "$rating.difficulty" },
                        usefulness_real_world: { $avg: "$rating.usefulness_real_world" },
                        workload: { $avg: "$rating.workload" },
                        staff_responsiveness: { $avg: "$rating.staff_responsiveness" },
                        quality_of_teaching: { $avg: "$rating.quality_of_teaching" },
                    }
            },
            {
                $project: {
                    _id: 0,
                }
            }
        ])
        if (averageRating.length > 0) {
            return res.status(200).json(averageRating[0]);
        }
        return res.status(200).json({});
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.patchReview = async (req, res) => {
    const reviewId = req.params.id;
    if (reviewId == null) {
        return res.status(400).json({ error: 'Missing review id' })
    }

    const reviewData = req.body;
    try {
        const existingReview = await db.models.review.findById(reviewId);

        if (!existingReview) {
            return res.status(404).json({ error: 'Review not found.' });
        }
        if (req.email !== existingReview.email) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const updatedReview = await db.models.review.findOneAndUpdate(
            { _id: reviewId },
            reviewData,
            { new: true }
        );
        return res.json(updatedReview);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.getTotalRatings = async (req, res) => {
    const courseId = req.params.id;
    if (courseId == null) {
        return res.status(400).json({ error: 'Missing course id.' })
    }
    let totals = {};
    const fields = ['$rating.difficulty', '$rating.usefulness_real_world', '$rating.workload', '$rating.staff_responsiveness', '$rating.quality_of_teaching']
    try {
        for (let field of fields) {
            const short = field.split('.').pop();
            const total = await db.models.review.aggregate([
                // Citation: https://docs.mongodb.com/manual/aggregation/
                { $match: { course_id: courseId } },
                {
                    $group: {
                        _id: field,
                        count: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: null,
                        [short]: {
                            $push: {
                                k: { $toString: '$_id' },
                                v: '$count',
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        [short]: { $arrayToObject: `$${short}` },
                    },
                },
            ]);
            if (total.length > 0) {
                const result = total[0][short]
                totals[short] = result;
            }
        }
        return res.status(200).json({ totals });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    if (reviewId == null) {
        return res.status(400).json({ error: 'Missing review id' })
    }

    try {
        const existingReview = await db.models.review.findById(reviewId);
        if (!existingReview) {
            return res.status(404).json({ error: 'Review not found.' });
        }
        if (req.email !== existingReview.email) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const deletedReview = await db.models.review.findByIdAndDelete(reviewId);
        return res.json(deletedReview);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
