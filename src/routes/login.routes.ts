import {Router} from 'express'
const router = Router();
import { login as loginController } from '../controllers/user.controller';

router.post('/login',loginController);

export default router;