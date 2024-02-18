import { Router } from "express";
const router = Router();

import { authAdmin as AdminAccessOnly } from "../middlewares/authAdmin";
import { allProducts as productController} from '../controllers/product.controller'
import { signleProduct as singleProductController } from "../controllers/product.controller";
import { addProduct as addProductController } from "../controllers/product.controller";
import { updateProduct as updateProductController } from "../controllers/product.controller";
import { deleteProduct as deleteProductController} from '../controllers/product.controller'

router.get('/products',productController);
router.get('/products/:productId/:productName',singleProductController);
router.post('/add/products',AdminAccessOnly,addProductController);
router.put('/update/products/:productId',AdminAccessOnly,updateProductController);
router.delete('/delete/products/:productId',AdminAccessOnly,deleteProductController);

export default router;