import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import paymentController from "../controllers/paymentController.js";
 
 


const paymentRoutes = Router();


paymentRoutes.get('/payment/createStripeConnectAccount' , authMiddleware , paymentController.createStripeConnectAccount )


 



export default paymentRoutes;
