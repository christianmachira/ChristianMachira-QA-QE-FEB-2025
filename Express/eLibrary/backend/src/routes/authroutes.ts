import {Router} from 'express';
import { createuser, loginuser, logoutuser } from '../controllers/authcontroller';
import { protect } from '../middleware/authMiddlewares/protect';

const router = Router();

router.post('/register', createuser);
router.post('/login', loginuser);
router.post('/logout', logoutuser);



export default router;