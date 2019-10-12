import { Router } from 'express';
import ProjectController from '../controllers/project_controller';



const router = Router();


router.post('/',ProjectController.createProject);
router.get('/:id',ProjectController.getProjectById);
router.get('/',ProjectController.listProject);
router.put('/:id',ProjectController.updateProject);
export default router;