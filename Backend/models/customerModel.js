import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    name:{
        type:String,
         required: true,
    },
    email:{
        type:String,
         required: true,
    },
    password:{
        type: String,
        required : true,
        select: false
    },
    method:{
        type: String,
        required : true
    }

    
},{timestamps: true})


const Customers = mongoose.model("customers" , customerSchema);
export default Customers;