import mongoose, { Schema } from "mongoose";


const stripeSchema = new mongoose.Schema({

    sellerId: {
        type: Schema.ObjectId,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
    
   
    
},{timestamps: true})

 



const Stripe = mongoose.model("stripes" , stripeSchema);
export default Stripe;