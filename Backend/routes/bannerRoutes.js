import { Router } from "express";
import bannerController from "../controllers/bannerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
 
const bannerRoutes = Router();

bannerRoutes.post('/addBanner', authMiddleware ,bannerController.addBanner);
bannerRoutes.get('/getBanner/:productId', authMiddleware ,bannerController.getBanner);
bannerRoutes.put('/updateBanner/:bannerId', authMiddleware ,bannerController.updateBanner);
bannerRoutes.get('/getHomeBanner' ,bannerController.getHomeBanner);

 


export default bannerRoutes;
