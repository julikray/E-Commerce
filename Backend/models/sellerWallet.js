import mongoose, { Schema } from "mongoose";


const sellerWalletSchema = new mongoose.Schema({

    sellerId: {
        type: Schema.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
    
   
    
},{timestamps: true})

 



const SellerWallet = mongoose.model("sellerWallet" , sellerWalletSchema);
export default SellerWallet;