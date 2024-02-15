import {Router} from 'express'
const router = Router();

import {register as RegisterController} from '../controllers/user.controller'

router.post('/register',RegisterController);

export default router;