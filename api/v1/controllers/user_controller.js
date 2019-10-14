import UserService from '../services/user_service';
import ApiResponses from '../utils/ApiResponses';

const response = new ApiResponses();

class UserController{
    static async createUser(req,res){
        const data = req.body;
        try{
            let newUser = await UserService.addUser(data);
            let jsonResponse = {
                _id:newUser._id,
                first_name:newUser.first_name,
                last_name:newUser.last_name,
                email:newUser.email
            }
            return response.successCreated(jsonResponse,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async getUserById(req,res){
        try{
            const { id } = req.params;
            const theUser = await UserService.getUserBydId(id);
            if(!theUser){
                return response.errorNotFound(`User (id=${id}) doesn't exists`,res);
            }
            return response.successOK(theUser,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }

    static async listUser(req,res){
        try{
            const listUser = await UserService.getAllUsers();
            return response.successOK(listUser,res);
        }catch(error){
            return response.errorBadRequest(error,res);
        }
    }
}

export default UserController;