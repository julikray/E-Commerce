import mongoose, { Schema } from "mongoose";


const myShopWalletSchema = new mongoose.Schema({

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

 



const MyShopWallet = mongoose.model("myShopWallet" , myShopWalletSchema);
export default MyShopWallet;