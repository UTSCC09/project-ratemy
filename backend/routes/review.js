const db = require("../db");

// this endpoint takes 
// 'course_id', 'rating' = { 'difficulty', 'usefulness_real_world', 'staff_responsiveness', 'quality_of_teaching', 'workload' }, 'review', 
// 'email'
exports.postReview = async (req, res) => {
    if (req.body.course_id == null || req.body.rating == null || req.body.review == null || req.body.email == null) {
        res.status(400).json({ error: 'Missing params.' })
    }
    if (req.body.rating.difficulty == null || req.body.rating.usefulness_real_world == null || req.body.rating.staff_responsiveness == null ||
        req.body.rating.quality_of_teaching == null || req.body.rating.workload == null) {
        res.status(400).json({ error: 'Missing ratings.' })
    }
    let reviewData = { date: Date.now(), ...req.body };
    const review = new db.models.review(reviewData);
    try {
        const insertedReview = await review.save();
        return res.status(200).json(insertedReview);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
