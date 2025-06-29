import { Router } from "express";
import customerAuthController from "../controllers/customerAuthController.js";
 
 


const customerAuthRoutes = Router();

customerAuthRoutes.post('/customerRegister' , customerAuthController.customerRegister)
customerAuthRoutes.post('/customerLogin' , customerAuthController.customerLogin)
customerAuthRoutes.get('/logout' , customerAuthController.customerLogout)



export default customerAuthRoutes;
