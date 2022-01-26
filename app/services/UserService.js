const userModel = require('../models/UserModel');

class UserService {

  async addUser(data, callback) {
    try{
      const userName = data.userName;
      const accountNumber = data.accountNumber;
      const emailAddress = data.emailAddress;
      const identityNumber = data.identityNumber;

      const existingUser = await userModel.find({});
      const length = existingUser.length + 1;

      const user = new userModel({
        id: length,
        userName: userName,
        accountNumber: accountNumber,
        emailAddress: emailAddress,
        identityNumber: identityNumber,
      })

      const userData = await userModel.find({accountNumber:accountNumber});
      if(userData.length > 0){
        callback('Error', 'accountNumber is exist');
        return;
      }

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
