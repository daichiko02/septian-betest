const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DATABASE = "mongodb+srv://septian-user:fm6Fs7KjQ8AAGd3N@cluster0.zv72p.mongodb.net/db_septian_betest?retryWrites=true&w=majority";
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const userController = require('./app/controllers/UserController')
const authController = require('./app/controllers/AuthController')
require('./app/kafka/KafkaConsumer')

class Server{
  constructor(){
    this.initConfiguration();
    this.initDatabase();
  }

  initConfiguration(){
    dotenv.config();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(userController.routes())
    app.use(authController.routes())
  }

  initDatabase(){
    mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() =>{
      console.log('DB Connected')
      this.initApplication();
    })
      .catch((err) => console.log(err));
  }

  initApplication(){
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`)
    })
  }
}

new Server();
