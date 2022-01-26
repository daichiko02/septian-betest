const userModel = require('../models/UserModel');

class UserService {

  async addUser(data, callback) {
    try{
      const id = data.id;
      const userName = data.userName;
      const accountNumber = data.accountNumber;
      const emailAddress = data.emailAddress;
      const identityNumber = data.identityNumber;

      const user = new userModel({
        id: id,
        userName: userName,
        accountNumber: accountNumber,
        emailAddress: emailAddress,
        identityNumber: identityNumber,
      })
      const result = await user.save();
      if(callback){
        callback(undefined, result);
      }
    }catch (error) {
      if(callback){
        callback(error, 'System Error');
      }
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
