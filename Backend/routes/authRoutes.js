import { Router } from "express";
import authController from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";



const authRoutes = Router();

authRoutes.post('/admin-login', authController.admin_login);
authRoutes.get('/get-user', authMiddleware , authController.getUser);
authRoutes.post('/seller-register', authController.seller_register);
authRoutes.post('/seller-login', authController.seller_login);
authRoutes.post('/profile-image-upload', authMiddleware , authController.profile_image_upload);
authRoutes.post('/profile-Info-Add', authMiddleware , authController.profileInfoAdd);



export default authRoutes;
