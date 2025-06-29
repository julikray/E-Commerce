import mongoose, { Schema } from "mongoose";


const bannerSchema = new mongoose.Schema({
    productId : {
        type: Schema.ObjectId,
        required: true
    },
     banner : {
        type: String,
        required: true
    },
     link : {
        type: String,
        required: true
    } 
    
},{timestamps: true})



const banner = mongoose.model("banner" , bannerSchema);
export default banner;