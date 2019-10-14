import TaskService from '../services/task_service';
import ApiResponses from '../utils/ApiResponses';

const response = new ApiResponses();

class TaskController{
    static async createTask(req,res){
        const data = req.body;
        try{
            const newTask = await TaskService.createTask(data);
            return response.successCreated(newTask,res);
        }catch(error){
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

    static async toggleTask(req,res){
        const { id }= req.params;
        try{
            const taskPaused = await TaskService.toggleTask(id);
            return response.successUpdated(taskPaused,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async getTaskById(req,res){
        try{
            const { id } = req.params;
            const listTask = await TaskService.getTaskById(id);
            if(!listTask){
                return response.errorNotFound(`Task (id=${id}) doesn't exists`,res);
            }
            return response.successOK(listTask,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async listTasksByUser(req,res){
        try{
            const { id } = req.params;
            const { order } = req.query;
            const listTask = await TaskService.getAllTasksByUser(id,order);
            let totalDuration = 0;
            listTask.map(task => {
                totalDuration+=task.duration;
            });
            return response.successOK({list:listTask,totalTasksUser:totalDuration},res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async listTasksByProject(req,res){
        try{
            const { id } = req.params;
            const { order } = req.query;
            const listTask = await TaskService.getAllTasksByProject(id,order);
            let totalDuration = 0;
            listTask.map(task => {
                totalDuration+=task.duration;
            });
            return response.successOK({list:listTask,totalTasksProject:totalDuration},res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }
}

export default TaskController;