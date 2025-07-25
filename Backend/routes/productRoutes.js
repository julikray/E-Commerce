import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import productController from "../controllers/productController.js";
 


const productRoutes = Router();


productRoutes.post('/add-Product', authMiddleware ,productController.addProduct);

productRoutes.get('/product-get', authMiddleware ,productController.getProduct);

productRoutes.get('/edit-product/:productId', authMiddleware ,productController.editProduct);

productRoutes.post('/product-update', authMiddleware ,productController.product_update);

productRoutes.post('/product-image-update', authMiddleware ,productController.product_image_update );

productRoutes.delete('/delete-product/:productId', authMiddleware, productController.deleteProduct);

 
 


export default productRoutes;
