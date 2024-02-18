import { Router } from "express";
const router = Router();
import { getAllAdmins as getAllAdminController} from "../controllers/admin.controller";
import { addAdmin as addAdminController } from "../controllers/admin.controller";
import { deleteAdmin as deleteAdminController } from "../controllers/admin.controller";
import { verifyBoss } from "../middlewares/verifyBoss";
import { verifyAdminAndGiveToken as loginAdminController } from "../config/verifyAdmin";

router.get('/alladmins',verifyBoss,getAllAdminController);
router.post('/add/admin',verifyBoss,addAdminController);
router.delete('/delete/admin',verifyBoss,deleteAdminController);
router.post('/login/admin',loginAdminController);

export default router;