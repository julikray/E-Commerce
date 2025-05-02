import mongoose from "mongoose";


const  sellerCustomerSchema = new mongoose.Schema({
    myId:{
        type:String,
         required: true,
    },
    myFriends:{
        type:Array,
        default : []
    }
},{timestamps: true})



const SellerCustomer = mongoose.model("sellerCustomer" , sellerCustomerSchema);
export default SellerCustomer;