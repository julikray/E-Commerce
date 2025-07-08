import { Router } from "express";
import customerAuthController from "../controllers/customerAuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
 
 


const customerAuthRoutes = Router();

customerAuthRoutes.post('/customerRegister' , customerAuthController.customerRegister)
customerAuthRoutes.post('/customerLogin' , customerAuthController.customerLogin)
customerAuthRoutes.get('/logout' , customerAuthController.customerLogout)

customerAuthRoutes.post("/change-password" , authMiddleware, customerAuthController.customerChangePassword )



export default customerAuthRoutes;
