const userModel = require('../models/UserModel');

class UserService {

  async addUser(data) {
    try{
      return await data.save();
    }catch (error) {
      return error;
    }
  }

  async updateUser(data){
    try{
      return await userModel.updateOne({id:data.id},{userName:data.userName, accountNumber:data.accountNumber, emailAddress:data.emailAddress, identityNumber:data.identityNumber});
    }catch (error) {
      return error;
    }
  }

  async deleteUser(id) {
    try {
      return await userModel.deleteOne({ id: id });
    } catch (error) {
      return error;
    }
  }

  async fetchUserByAccountNumber(accountNumber){
    try{
      return await userModel.findOne({accountNumber: accountNumber});
    }catch (error) {
      return error;
    }
  }

  async fetchUserByIdentityNumber(identityNumber){
    try{
      return await userModel.findOne({identityNumber: identityNumber});
    }catch (error) {
      return error;
    }
  }

  async getAllUser(){
    try{
      return await userModel.find({});
    }catch (error) {
      return error;
    }
  }
}

module.exports = new UserService();
