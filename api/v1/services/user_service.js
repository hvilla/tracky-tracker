import User from '../models/User';
const mongoose = require('mongoose');

class UserService{
    static async addUser(data){
        try {
           return await User.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async getUserBydId(id){
        try {
            const theUser = User.findById(id);
            theUser instanceof mongoose.Query; // true
            return theUser;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers(){
        try{
            const listUsers = User.find();
            listUsers instanceof mongoose.Query; // true
            return listUsers;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;