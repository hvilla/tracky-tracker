import Project from '../models/Project';
const mongoose = require('mongoose');

class ProjectService{
    static async createProject(data){
        try {
            await Project.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async getProjectById(id){
        try {
            const theProject = Project.findById(id);
            theProject instanceof mongoose.Query; // true
            return theProject;
        } catch (error) {
            throw error;
        }
    }

    static async updateProject(id,data){
        try {
            await Project.findByIdAndUpdate(id,data);
        } catch (error) {
            throw error;
        }
    }

    static async getAllProjects(){
        try{
            const listOfProjects = Project.find();
            listOfProjects instanceof mongoose.Query; // true
            return listOfProjects;
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectService;