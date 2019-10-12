import UserService from '../services/user_service';
import ApiResponses from '../utils/ApiResponses';

const response = new ApiResponses();

class UserController{
    static async createUser(req,res){
        const data = req.body;
        try{
            await UserService.addUser(data);
            return response.successCreated(`${data.first_name} ${data.last_name}`,res);
        }catch(error){
            console.log("Anda",error)
            return response.errorBadRequest(error,res);
        }
    }

    static async getUserById(req,res){
        try{
            const { id } = req.params;
            const listUser = await UserService.getUserBydId(id);
            return response.successOK(listUser,res);
        }catch(error){
            console.log(error)
            return response.errorBadRequest(error,res);
        }
    }

    static async listUser(req,res){
        try{
            const listUser = await UserService.getAllUsers();
            return response.successOK(listUser,res);
        }catch(error){
            console.log(error)
            return response.errorBadRequest(error,res);
        }
    }
}

export default UserController;