import mongoose, { Schema } from "mongoose";


const withdrawalSchema = new mongoose.Schema({

    sellerId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }

    
},{timestamps: true})
 

const Withdrawal = mongoose.model("withdrawal" , withdrawalSchema);
export default Withdrawal;