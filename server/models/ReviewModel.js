import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    review_id: { type: String },
    customer_name: { type: String, required: true },
    feedback: String,
    rating: { type: Number, min: 0, max: 5, required: true },
    hotel_id: { type: String, ref: 'Hotel' }
});

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
