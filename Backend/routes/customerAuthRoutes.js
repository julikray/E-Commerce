import { Router } from "express";
import customerAuthController from "../controllers/customerAuthController.js";
 
 


const customerAuthRoutes = Router();

customerAuthRoutes.post('/customerRegister' , customerAuthController.customerRegister)
customerAuthRoutes.post('/customerLogin' , customerAuthController.customerLogin)




export default customerAuthRoutes;
