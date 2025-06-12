import { Router } from "express";
import cardController from "../controllers/cardController.js";
 


const cardRoutes = Router();

cardRoutes.post('/addToCard' , cardController.addToCard )
cardRoutes.get('/getCardProducts/:userId', cardController.getCardProducts); 
cardRoutes.delete('/deleteCardProduct/:cardId', cardController.deleteCardProduct); 
cardRoutes.put('/quantityInc/:cardId', cardController.quantityInc); 
cardRoutes.put('/quantityDec/:cardId', cardController.quantityDec); 
 
cardRoutes.post('/addToWishlist' , cardController.addToWishlist)
cardRoutes.get('/getWishlistProducts/:userId', cardController.getWishlistProducts);
cardRoutes.delete('/removeWishlistProducts/:wishlistId', cardController.removeWishlistProducts); 


export default cardRoutes;
