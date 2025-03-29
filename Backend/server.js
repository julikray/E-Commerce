import express from "express"
import cors from "cors"
import "dotenv/config.js"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";


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


//db connection 
connectDB();

// api endpoints
app.use("/api", authRoutes);

app.get("/" ,(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})