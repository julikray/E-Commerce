import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sellerLoginValidator,
  sellerRegisterValidator,
  validateRequest,
} from "../utiles/authValidator.js";

const authRoutes = Router();

authRoutes.post("/admin-login", authController.admin_login);
authRoutes.get("/get-user", authMiddleware, authController.getUser);
authRoutes.post( "/seller-register", sellerRegisterValidator, validateRequest, authController.seller_register );
authRoutes.post("/seller-login", sellerLoginValidator, validateRequest, authController.seller_login );
authRoutes.post("/profile-image-upload", authMiddleware, authController.profile_image_upload );
authRoutes.post( "/profile-Info-Add", authMiddleware, authController.profileInfoAdd );

authRoutes.get("/logout", authController.logout);

export default authRoutes;
