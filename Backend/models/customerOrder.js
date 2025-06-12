import mongoose, { Schema } from "mongoose";


const customerOrderSchema = new mongoose.Schema({
    customerId : {
        type: Schema.ObjectId,
        required: true
    },
     products : {
        type: Array,
        required: true
    },
     price : {
        type: Number,
        required: true
    },
     paymentStatus : {
        type: String,
        required: true
    },
     shippingInfo : {
        type: Object,
        required: true
    },
     deliveryStatus : {
        type: String,
        required: true
    },
     date : {
        type: String,
        required: true
    }
    
    
},{timestamps: true})



const order = mongoose.model("customerOrder" , customerOrderSchema);
export default order;