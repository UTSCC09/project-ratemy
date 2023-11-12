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
    let reviewData = { date: Date.now(), ...req.body };
    const review = new db.models.review(reviewData);
    try {
        const insertedReview = await review.save();
        return res.status(200).json(insertedReview);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// takes page and limit as query params
exports.getReviews = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const sortField = req.query.sortField || 'date';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; 
    try {
        const reviews = await db.models.review
            .find()
            .sort({ [sortField]: sortOrder })
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

    const sortField = req.query.sortField || 'date';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    const professorFilter = req.query.professor ? { professor: req.query.professor } : {};

    try {
        const reviews = await db.models.review
            .find({ course_id: new mongoose.Types.ObjectId(courseId), ...professorFilter })
            .sort({ [sortField]: sortOrder })
            .skip(page * limit)
            .limit(limit);

        return res.status(200).json(reviews);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};