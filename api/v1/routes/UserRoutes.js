import { Router } from 'express';
import UserController from '../controllers/user_controller';

const router = Router();

router.post('/',UserController.createUser); //POST RESOURCE CREATE USER
router.get('/:id',UserController.getUserById);//GET RESOURCE GET USER BY ID
router.get('/',UserController.listUser);//GET RESOURCE LIST ALL USERS REGISTERED (Password included for information of bcryptjs it works)
export default router;