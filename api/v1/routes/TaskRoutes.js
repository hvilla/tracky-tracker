import { Router } from 'express';
import TaskController from '../controllers/task_controller';

const router = Router();

router.post('/',TaskController.createTask); //POST RESOURCE CREATE A TASK
router.get('/:id',TaskController.getTaskById); //GET RESOURCE GET A TASK BY ID
router.get('/project/:id',TaskController.listTasksByProject); //GET RESOURCE GET A LIST OF TASK ASIGNED TO AN PROJECT BY ID
router.get('/user/:id',TaskController.listTasksByUser); //GET RESOURCE GET A LIST OF TASK ASIGNED TO AN USER BY USER ID
router.get('/',TaskController.listAllTasks); //GET RESOURCE GET A LIST OF ALL TASKS IN THE SYSTEM
router.put('/toggle/:id',TaskController.toggleTask); //PUT RESOURCE CHANGE BETWEEN PAUSE/RESUME AN APP BY TASK ID
export default router;