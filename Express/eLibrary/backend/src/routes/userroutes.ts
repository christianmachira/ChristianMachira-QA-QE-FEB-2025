import {Router} from 'express';
import { deleteuser, getallusers, getuserbyid, updateuser } from '../controllers/usercontroller';
import { protect } from '../middleware/authMiddlewares/protect';
import { adminGuard } from '../middleware/authMiddlewares/guards';
import { createuser } from '../controllers/usercontroller';

const router = Router();

router.get('/getuser', protect, adminGuard, getallusers);
router.get('/getuser:id', protect, adminGuard, getuserbyid);
router.put('/edit:id', protect, adminGuard, updateuser);
router.delete('/delete:id', protect, adminGuard, deleteuser);
router.post('/adduser', protect, adminGuard, createuser);
export default router;