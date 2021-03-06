const authController = require('./AuthController')
const userService = require('../services/UserService');
const router = require('express').Router();
let service = null;

class UserController{
  constructor() {
    this.router = router;
    this.router.all('/user', this.validateToken)
    this.router.all('/user/*', this.validateToken)
    this.router
      .route('/user')
      .get(this.getUser)
    this.router
      .route('/user/add')
      .post(this.addUser)
    this.router
      .route('/user/:id')
      .delete(this.deleteUser)
    this.router
      .route('/user/:id')
      .put(this.updateUser)
    this.initBind();
    service = this;
  }

  initBind(){
    this.validateToken = this.validateToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  routes () {
    return this.router
  }

  validateToken(req, res, next){
    authController.verifyToken(req,res,next);
  }

  async getUser(req,res) {
    try{
      const requestQuery = req.query;
      const user = await userService.getUser(requestQuery);
      if(!user){
        res.status(200).send('User not found');
      }else{
        res.status(200).send(user);
      }
    }catch (error) {
      res.status(400).send(error);
    }
  }

  async addUser(req,res) {
    try{
      const requestBody = req.body;

      await userService.addUser(requestBody, (err, result) => {
        if(err){
          res.status(400).send(result);
        }else {
          res.status(200).send(result);
        }
      });
    }catch (error) {
      res.status(400).send(error);
    }
  }

  async deleteUser(req,res){
    try{
      const id = req.params.id;
      const result = await userService.deleteUser(id);
      if(result.deletedCount > 0){
        res.status(200).send('User deleted successfully');
      }else{
        res.status(200).send('User not found');
      }
    }catch (error) {
      res.status(400).send(error);
    }
  }

  async updateUser(req,res){
    try{
      const id = req.params.id;
      const requestBody = req.body;

      const result = await userService.updateUser(id,requestBody);
      if(result.modifiedCount > 0){
        res.status(200).send('User updated successfully');
      }else{
        res.status(200).send(result.message || 'User updated failed');
      }
    }catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new UserController();
