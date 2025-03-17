import {Router} from 'express';
import { deleteuser, getallusers, getuserbyid, updateuser } from '../controllers/usercontroller';

const router = Router();

router.get('/', getallusers);
router.get('/:id', getuserbyid);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);

export default router;