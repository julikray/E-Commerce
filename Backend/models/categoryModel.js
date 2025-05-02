import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
         required: true,
    },
    image:{
        type: String,
        required:true,
    },
    slug:{
        type: String,
        required:true,
    }
    
    
},{timeseries:true } );



const Category = mongoose.model("category" , categorySchema);
export default Category;