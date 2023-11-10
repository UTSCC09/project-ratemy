const db = require("../db");
const mongoose = require("mongoose")

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
        res.status(400).json({ error: "Missing params." });
    }
    if (
        req.body.rating.difficulty == null ||
        req.body.rating.usefulness_real_world == null ||
        req.body.rating.staff_responsiveness == null ||
        req.body.rating.quality_of_teaching == null ||
        req.body.rating.workload == null
    ) {
        res.status(400).json({ error: "Missing ratings." });
    }
    if (!isRating(req.body.rating.difficulty) || !isRating(req.body.rating.usefulness_real_world) || !isRating(req.body.rating.staff_responsiveness) ||
        !isRating(req.body.rating.quality_of_teaching) || !isRating(req.body.rating.workload)) {
        res.status(400).json({ error: "invalid rating" })
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
    if (x !== "1" && x !== "2" && x !== "3" && x !== "4" && x !== "5") {
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
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const courseId = req.params.id;
    if (courseId == null) {
        return res.status(400).json({ error: "Missing course id." });
    }
    try {
        const reviews = await db.models.review
            .find({ course_id: new mongoose.Types.ObjectId(courseId) })
            .skip(page * limit)
            .limit(limit);
        return res.status(200).json(reviews);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.getRatingAverages = async (req, res) => {
    const courseId = req.params.id;
    console.log("yo");
    if (courseId == null) {
        return res.status(400).json({ error: 'Missing course id.' })
    }
    try {
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
            }
        ])
        console.log(averageRating[0])
        if (averageRating.length > 0) {
            return res.status(200).json(averageRating[0]);
        }
        return res.status(200).json({});
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
