import mongoose from "mongoose";

const adminSellerMessageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      default: '',
    },
    receverId: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  { timestamps: true }
);

const adminSellerMessage = mongoose.model(
  "adminSellerMessage",
  adminSellerMessageSchema
);
export default adminSellerMessage;
