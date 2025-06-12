import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId:{
        type: Schema.ObjectId,
        required: true

    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0 ,
    },
    review: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);
export default Review;
