import { Router } from "express";
const router = Router();
import {allProducts as productController} from '../controllers/product.controller'
import { signleProduct as singleProductController } from "../controllers/product.controller";
import { addProduct as addProductController } from "../controllers/product.controller";
import { updateProduct as updateProductController } from "../controllers/product.controller";

router.get('/products',productController);
router.get('/products/:productId/:productName',singleProductController);
router.post('/add/products',addProductController);
router.put('/update/products',updateProductController)

export default router;