import ApiResponse from '../utils/ApiResponses';
import ProjectService from '../services/project_service';

const response = new ApiResponse();
class ProjectController{
    static async createProject(req,res){
        const data = req.body;
        try{
            await ProjectService.createProject(data);
            return response.successCreated(`${data.name}`,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async getProjectById(req,res){
        try{
            const { id } = req.params;
            const listProject = await ProjectService.getProjectById(id);
            return response.successOK(listProject,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async listProject(req,res){
        try{
            const listProject = await ProjectService.getAllProjects();
            return response.successOK(listProject,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async updateProject(req,res){
        try {
            const { id } = req.params;
            const data = req.body;

            const listProject = await ProjectService.updateProject(id,data);
            return response.successOK(listProject,res);
        } catch (error) {
            return response.errorBadRequest(error,res);
        }
    }
}

export default ProjectController;