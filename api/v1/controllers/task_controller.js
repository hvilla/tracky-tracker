import TaskService from '../services/task_service';
import ApiResponses from '../utils/ApiResponses';

const response = new ApiResponses();

class TaskController{
    static async createTask(req,res){
        const data = req.body;
        try{
            const newTask = await TaskService.createTask(data);
            return response.successCreated({id:newTask.id,project:newTask.project,owner:newTask.owner,status:newTask.status,started:newTask.last_start},res);
        }catch(error){
            console.log(error);
            return response.errorBadRequest(error,res);
        }
    }

    static async resumeTask(req,res){
        const data = req.body;
        try{
            await TaskService.addTask(data);
            return response.successCreated(`${data.first_name} ${data.last_name}`,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async pauseTask(req,res){
        const data = req.body;
        try{
            await TaskService.addTask(data);
            return response.successCreated(`${data.first_name} ${data.last_name}`,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async getTaskById(req,res){
        try{
            const { id } = req.params;
            const listTask = await TaskService.getTaskById(id);
            return response.successOK(listTask,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async listTasksByUser(req,res){
        try{
            const { id } = req.params;
            const listTask = await TaskService.getAllTasksByUser(id);
            return response.successOK(listTask,res);
        }catch(error){
            console.log(error)
            return response.errorBadRequest(error,res);
        }
    }

    static async listTasksByProject(req,res){
        try{
            const listTask = await TaskService.getAllTasks();
            return response.successOK(listTask,res);
        }catch(error){
            console.log(error)
            return response.errorBadRequest(error,res);
        }
    }
}

export default TaskController;