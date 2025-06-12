import mongoose, { Schema } from "mongoose";


const cardSchema = new mongoose.Schema({
    userId : {
        type: Schema.ObjectId,
        required: true
    },
     productId : {
        type: Schema.ObjectId,
        required: true
    },
     quantity : {
        type: Number,
        required: true
    }
    
    
},{timestamps: true})



const Card = mongoose.model("cardProducts" , cardSchema);
export default Card;