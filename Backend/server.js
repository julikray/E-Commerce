import express from "express"
import cors from "cors"
import "dotenv/config.js"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/categoryRoutes.js"; 
import productRoutes from "./routes/productRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";

// app config
const app = express()
const port = process.env.PORT


//middleware
app.use(express.json())

// app.use(cors())

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  }));
  
  app.use(cookieParser());

//db connection 
connectDB();

// api endpoints
app.use("/api", authRoutes);
app.use("/api", categoryRoutes); 
app.use("/api" , productRoutes);
app.use("/api" , sellerRoutes );

app.get("/" ,(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})