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

  async updateUser(id,data){
    try{
      const userName = data.userName;
      const accountNumber = data.accountNumber;
      const emailAddress = data.emailAddress;
      const identityNumber = data.identityNumber;

      return await userModel.updateOne({id:id},{userName:userName, accountNumber:accountNumber, emailAddress:emailAddress, identityNumber:identityNumber});
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

  async getUser(data){
    const identityNumber = data ? data.identityNumber : null;
    const accountNumber = data ? data.accountNumber : null;
    let user = null;
    if(accountNumber){
      user = await userModel.findOne({accountNumber: accountNumber});
    }
    if(identityNumber){
      user = await userModel.findOne({identityNumber: identityNumber});
    }
    if(!accountNumber && !identityNumber){
      user = await userModel.find({});
    }
    return user;
  }
}

module.exports = new UserService();
