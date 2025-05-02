import { Router } from "express";
import categoryController from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
 


const categoryRoutes = Router();


categoryRoutes.post('/category-Add', authMiddleware ,categoryController.add_category);
categoryRoutes.get('/category-get', authMiddleware ,categoryController.get_category);
 
 


export default categoryRoutes;
