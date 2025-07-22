import { Router } from "express";
import customerAuthController from "../controllers/customerAuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    customerLoginValidator,
  customerRegisterValidator,
  validateRequest
} from "../utiles/authValidator.js";
 
 


const customerAuthRoutes = Router();

customerAuthRoutes.post('/customerRegister' , customerRegisterValidator , validateRequest , customerAuthController.customerRegister)
customerAuthRoutes.post('/customerLogin' , customerLoginValidator , validateRequest,  customerAuthController.customerLogin)
customerAuthRoutes.get('/logout' , customerAuthController.customerLogout)

customerAuthRoutes.post("/change-password" , authMiddleware, customerAuthController.customerChangePassword )



export default customerAuthRoutes;
