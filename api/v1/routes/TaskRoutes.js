import { Router } from 'express';
import TaskController from '../controllers/task_controller';

const router = Router();

router.post('/',TaskController.createTask);
router.get('/:id',TaskController.getTaskById);
router.get('/project/:id',TaskController.listTasksByProject);
router.get('/user/:id',TaskController.listTasksByUser);
router.get('/',TaskController.listAllTasks);
router.put('/toggle/:id',TaskController.toggleTask);
export default router;