const db = require("../db");


exports.postReview = async (req, res) => {
    let reviewData = req.body;
    const review = new db.models.review(reviewData);
    const insertedReview = await review.save();
    return res.status(200).json(insertedReview);
}
exports.getReviews = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const reviews = await db.models.review.find().skip(page * limit).limit(limit);
    return res.json(reviews);
}
exports.getReviewsByCourseCode = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const courseCode = req.params.courseCode;
    const reviews = await db.models.review.find({ courseCode: courseCode }).skip(page * limit).limit(limit);
    return res.json(reviews);
}
exports.patchReview = async (req, res) => {
    const reviewId = req.params.id;
    const reviewData = req.body;
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

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const existingReview = await db.models.review.findById(reviewId);
    if (!existingReview) {
        return res.status(404).json({ error: 'Review not found.' });
    }
    const deletedReview = await db.models.review.findByIdAndDelete(reviewId);
    return res.json(deletedReview);
}
