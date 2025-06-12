import { Router } from "express";
import orderController from "../controllers/orderController.js";
 


const orderRoutes = Router();

orderRoutes.post('/placeOrder' , orderController.placeOrder )
orderRoutes.get('/customer/getDashboardIndexData/:userId' , orderController.getDashboardIndexData )
orderRoutes.get('/customer/getOrder/:customerId/:status' , orderController.getOrder )
orderRoutes.get('/customer/getOrder/:customerId/:status' , orderController.getOrder )
orderRoutes.get('/customer/getOrders/:orderId' , orderController.getOrders )
 
 


export default orderRoutes;
