import Task from '../models/Task';
const mongoose = require('mongoose');

class TaskService{
    static async createTask(data){
        try {
            return await Task.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(id){
        try {
            const theTask = Task.findById(id);
            theTask instanceof mongoose.Query; // true
            return theTask;
        } catch (error) {
            throw error;
        }
    }


    static async getAllTasks(){
        try{
            const listOfTasks = Task.find();
            listOfTasks instanceof mongoose.Query; // true
            return listOfTasks;
        } catch (error) {
            throw error;
        }
    }

    static async getAllTasksByUser(id){
        try{
            const listOfTasks = Task.find({owner:id});
            listOfTasks instanceof mongoose.Query; // true
            return listOfTasks;
        } catch (error) {
            throw error;
        }
    }

    
}

export default TaskService;