class ApiResponses{
    successOK(data,res){
        try {
          return res.status(200).json(data);
        } catch {
          return 'Bad Promise';
        }
      }
  
    successDeleted(item,res){
        try{
            return res.status(204).json({msg: 'Deleted Succesfully',data:item});
        }catch{
            return 'Bad Promise';
        }
    }

    successUpdated(item,res){
        try{
            return res.status(200).json({msg: 'Updated Succesfully',data:item});
        }catch{
            return 'Bad Promise';
        }
    }

    successCreated(item,res){
        try{
            return res.status(201).json({msg: 'Created Succesfully',data:item});
        }catch{
            return 'Bad Promise';
        }
    }

    successAccepted(message,res){
        try{
            return res.status(202).json({msg: message});
        }catch{
            return 'Bad Promise';
        }
    }

    errorNotFound(message,res){
        try{
            return res.status(404).json({errors:message});
        }catch{
            return 'Bad Promise';
        }
    }
    

    errorBadRequest(message,res){
        try{
            return  res.status(400).json({errors:message});
        }catch{
            return 'Bad Promise';
        }
    }

    errorForbbiden(message,res){
        try{
            return res.status(403).json({errors:message});
        }catch{
            return 'Bad Promise';
        }
    }
}

export default ApiResponses;