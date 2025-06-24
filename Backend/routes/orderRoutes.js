import { Router } from "express";
import orderController from "../controllers/orderController.js";
 


const orderRoutes = Router();

// customer routes
orderRoutes.post('/placeOrder' , orderController.placeOrder )
orderRoutes.get('/customer/getDashboardIndexData/:userId' , orderController.getDashboardIndexData )
orderRoutes.get('/customer/getOrder/:customerId/:status' , orderController.getOrder )
orderRoutes.get('/customer/getOrder/:customerId/:status' , orderController.getOrder )
orderRoutes.get('/customer/getOrders/:orderId' , orderController.getOrders )

//admin routes 
orderRoutes.get('/admin/getAdminOrders' , orderController.getAdminOrders )
orderRoutes.get('/admin/getAdminOrdersDetails/:orderId' , orderController.getAdminOrdersDetails )
orderRoutes.put('/admin/adminOrderStatusUpdate/:orderId' , orderController.adminOrderStatusUpdate )


//seller routes
orderRoutes.get('/seller/getSellerOrders/:sellerId' , orderController.getSellerOrders)
orderRoutes.get('/seller/getSellerOrdersDetails/:orderId' , orderController.getSellerOrdersDetails )
orderRoutes.put('/seller/sellerOrderStatusUpdate/:orderId' , orderController.sellerOrderStatusUpdate )

 
 


export default orderRoutes;
