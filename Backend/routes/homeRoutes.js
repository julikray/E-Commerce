import { Router } from "express";
import homeController from "../controllers/homeController.js";

const homeRoutes = Router();

homeRoutes.get('/getCategorys' , homeController.getCategorys)
homeRoutes.get('/getProducts' , homeController.getProducts )
homeRoutes.get('/getProductDetails/:slug' , homeController.getProductDetails )
homeRoutes.get('/priceRangeProduct' , homeController.priceRangeProduct )
homeRoutes.get('/queryProducts' , homeController.queryProducts )

homeRoutes.post('/customerReview' , homeController.customerReview )
homeRoutes.get('/getCustomerReview/:productId' , homeController.getCustomerReview )


export default homeRoutes;
