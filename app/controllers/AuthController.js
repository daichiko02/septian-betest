const router = require('express').Router();
const jwt = require('jsonwebtoken');

class AuthController {
  constructor() {
    this.router = router;
    this.router
      .route('/auth/generateToken')
      .post(this.generateToken)
    this.generateToken = this.generateToken.bind(this);
  }

  routes () {
    return this.router
  }

  generateToken(req,res){
    try{
      const token = jwt.sign({type:'token'}, process.env.SECRET_KEY,{expiresIn: 3600})
      res.status(200).send(token);
    }catch (error) {
      res.status(400).send(error);
    }
  }

  verifyToken(req,res,next){
    try{
      let jwtHeader = req.headers['x-access-token'];
      if(!jwtHeader) return res.status(500).send('JWT must not be null');
      jwt.verify(jwtHeader, process.env.TOKEN_RAHASIA, (err, decoded) => {
        if(err){
          return res.status(500).send({
            auth: false,
            message: "Error",
            errors: err
          });
        }
        next();
      });
    }catch (error) {
      res.status(400).send(error);
    }
  }

}

module.exports = new AuthController();
