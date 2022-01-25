const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authController = require('../../app/controllers/AuthController')

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn().mockReturnValueOnce('a728djad8829dja9d97273019adj_28')
  };
});

describe('AutController', () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(authController.routes())

  describe('#generateToken', () => {
    it('should return http status 200 when generateToken succeed', async(done) => {
      await request(app)
        .post('/auth/generateToken')
        .expect(200)
      done();
    });
  });
});
