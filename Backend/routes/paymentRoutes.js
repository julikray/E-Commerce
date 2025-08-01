import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import paymentController from "../controllers/paymentController.js";
 
 


const paymentRoutes = Router();


paymentRoutes.get('/payment/createStripeConnectAccount' , authMiddleware , paymentController.createStripeConnectAccount )

paymentRoutes.put('/payment/activeStripeConnectAccount/:activeCode' , authMiddleware , paymentController.activeStripeConnectAccount )

paymentRoutes.get('/payment/sellerPaymentDetails/:sellerId' , authMiddleware , paymentController.getSellerPaymentDetails)




paymentRoutes.post('/payment/withdrawalRequest' , authMiddleware , paymentController.sendWithdrawalRequest)


paymentRoutes.get('/payment/getPaymentRequest' , authMiddleware , paymentController.getPaymentRequeest)
 
paymentRoutes.post('/payment/confirmPaymentRequest' , authMiddleware , paymentController.confirmPaymentRequest)


export default paymentRoutes;
