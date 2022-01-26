const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userController = require('../../app/controllers/UserController')
const authController = require('../../app/controllers/AuthController')
const userService = require('../../app/services/UserService')
const userModel = require('../../app/models/userModel')

jest.mock('jsonwebtoken', () => {
  return {
    verify: jest.fn().mockReturnValueOnce({})
  };
});

describe('UserController', () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(userController.routes())

  describe('#getUser', () => {
    it('should return http status 200 when getUser succeed', async(done) => {
      const user = new userModel({
        id: 111,
        userName: 'septian',
        accountNumber: 123,
        emailAddress: 'septian@gmail.com',
        identityNumber: 11501,
      })
      userService.getUser = jest.fn().mockResolvedValue(user)

      await request(app)
        .get('/user')
        .set('x-access-token', 'token')
        .query({identityNumber:2138123})
        .expect(200)
      done();
    });
  });

  describe('#deleteUser', () => {
    it('should return http status 200 when deleteUser succeed', async(done) => {
      const user = new userModel({
        id: 111,
        userName: 'septian',
        accountNumber: 123,
        emailAddress: 'septian@gmail.com',
        identityNumber: 11501,
      })
      userService.deleteUser = jest.fn().mockResolvedValue({deletedCount: 1})

      await request(app)
        .delete('/user/1')
        .set('x-access-token', 'token')
        .expect(200)
      done();
    });
  });
});
