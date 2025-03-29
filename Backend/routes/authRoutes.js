import { Router } from "express";
import authController from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";



const authRoutes = Router();

authRoutes.post('/admin-login', authController.admin_login);
authRoutes.get('/get-user', authMiddleware , authController.getUser);


export default authRoutes;
