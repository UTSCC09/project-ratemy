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

// takes page and limit as query params
exports.getReviews = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    try {
        const reviews = await db.models.review.find().sort({ date: -1 }).skip(page * limit).limit(limit);
        return res.status(200).json(reviews);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// takes page and limit as query params
exports.getCourseReviews = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const courseId = req.params.courseId;
    if (courseId == null) {
        return res.status(400).json({ error: 'Missing course id.' })
    }
    try {
        const reviews = await db.models.review.find({ course_id: mongoose.Types.ObjectId(courseId) }).skip(page * limit).limit(limit);
        console.log("here");
        return res.status(200).json(reviews);
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
        const deletedReview = await db.models.review.findByIdAndDelete(reviewId);
        return res.json(deletedReview);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
