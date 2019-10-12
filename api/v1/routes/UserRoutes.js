import { Router } from 'express';
import UserController from '../controllers/user_controller';

const router = Router();

router.post('/',UserController.createUser);
router.get('/:id',UserController.getUserById);
router.get('/',UserController.listUser);
export default router;