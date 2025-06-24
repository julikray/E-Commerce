import mongoose from "mongoose";

const sellerCustomerMessageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receverId: {
      type: String,
      required: true,
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

const SellerCustomerMessage = mongoose.model(
  "sellerCustomerMessage",
  sellerCustomerMessageSchema
);
export default SellerCustomerMessage;
