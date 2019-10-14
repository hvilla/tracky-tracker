import { Router } from 'express';
import ProjectController from '../controllers/project_controller';

const router = Router();

router.post('/',ProjectController.createProject); //POST RESOURCE CREATE A PROJECT
router.get('/:id',ProjectController.getProjectById); //GET RESOURCE GET INFORMATION ABOUT PROJECT BY ID
router.get('/',ProjectController.listProject); //GET RESOURCE GET LIST OF ALL PROJECTS CREATED
router.put('/:id',ProjectController.updateProject); //PUT UPDATE PROJECT INFORMATION
export default router;