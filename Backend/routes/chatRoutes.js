import { Router } from "express";
import chatController from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";
 

const chatRoutes = Router();


chatRoutes.post('/chat/customer/addCustomerFriend' , chatController.addCustomerFriend)
chatRoutes.post('/chat/customer/sendMessageCustomerToSeller' , chatController.sendMessageCustomerToSeller)

//seller to customer chat
chatRoutes.get('/chat/seller/getCustomers/:sellerId' , chatController.getCustomers)
chatRoutes.get('/chat/seller/getCustomersMessage/:customerId' , authMiddleware ,  chatController.getCustomersMessage)
chatRoutes.post('/chat/seller/sendMessageSellerToCustomer' , chatController.sendMessageSellerToCustomer)

//admin to seller chat
chatRoutes.get('/chat/admin/getSeller' , chatController.getSeller)
chatRoutes.post('/chat/admin/sendMessageSellerToAdmin' , chatController.sendMessageSellerToAdmin)
chatRoutes.get('/chat/admin/getAdminMessage/:receverId' , chatController.getAdminMessage)
chatRoutes.get('/chat/admin/getSellerMessage' , authMiddleware , chatController.getSellerMessage)

 
 

export default chatRoutes;
