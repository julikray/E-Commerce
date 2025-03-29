import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name:{
        type:String,
         required: true,
    },
    password:{
        type: String,
        required : true
    },
   
    image:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        default : 'admin'
    },
   
    
})



const Admin = mongoose.model("admins" , adminSchema);
export default Admin;