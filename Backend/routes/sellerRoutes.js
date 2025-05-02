import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import sellerController from "../controllers/sellerController.js";
 


const sellerRoutes = Router();


sellerRoutes.get('/request-seller-get', authMiddleware ,sellerController.getSellerReq );
sellerRoutes.get('/get-seller/:sellerId', authMiddleware ,sellerController.getSeller );
sellerRoutes.post('/seller-status-update', authMiddleware ,sellerController.sellerStatusUpdate );




export default sellerRoutes;
