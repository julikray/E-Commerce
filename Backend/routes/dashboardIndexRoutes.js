import { Router } from "express";
import dashboardIndexController from "../controllers/dashboardIndexController.js";
import authMiddleware from "../middleware/authMiddleware.js";
  
 

const dashboardIndexRoutes = Router();

 

dashboardIndexRoutes.get('/seller/getSellerReqDashboardIndex' , authMiddleware ,   dashboardIndexController.getSellerReqDashboardIndex)
 
dashboardIndexRoutes.get('/admin/getAdminReqDashboardIndex' , authMiddleware ,   dashboardIndexController.getAdminReqDashboardIndex)


export default dashboardIndexRoutes;
