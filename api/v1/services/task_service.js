import Task from '../models/Task';
const mongoose = require('mongoose');
const moment = require('moment');

class TaskService{
    static async createTask(data){
        try {
            return await Task.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async toggleTask(id){
        try {

            const actualDatetime = moment();
            let tempData = await this.getTaskById(id);
            tempData instanceof mongoose.Query;

            if(!tempData){
                throw `task (id=${id}) doesn't exists`;
            }

            if (tempData.status){
                tempData.duration = tempData.duration + moment.duration(actualDatetime.diff(tempData.last_start)).asSeconds();
                tempData.pause = actualDatetime;
                tempData.paused = true;
            }else{
                tempData.last_start = actualDatetime;
                tempData.paused = false;
            }
            
            tempData.status =  !tempData.status;
            await Task.findByIdAndUpdate(id,tempData);
            return tempData;
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(id){
        try {
            const theTask = Task.findById(id);
            theTask instanceof mongoose.Query;
            return theTask;
        } catch (error) {
            throw error;
        }
    }


    static async getAllTasks(){
        try{
            const listOfTasks = Task.find().sort({owner: 'desc',project:'asc'});
            listOfTasks instanceof mongoose.Query;
            return listOfTasks;
        } catch (error) {
            throw error;
        }
    }

    static async getAllTasksByUser(id,order){
        try{
            if(!order){
                order = 'desc';
            }
            const listOfTasks = Task.find({owner:id}).sort({createdAt: order});
            listOfTasks instanceof mongoose.Query;
            return listOfTasks;
        } catch (error) {
            throw error;
        }
    }

    static async getAllTasksByProject(id,order){
        try{
            if(!order){
                order = 'desc';
            }
            const listOfTasks = Task.find({project:id}).sort({createdAt: order});
            listOfTasks instanceof mongoose.Query;
            return listOfTasks;
        } catch (error) {
            throw error;
        }
    }

    
}

export default TaskService;