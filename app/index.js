const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const DATABASE = "mongodb+srv://septian-user:fm6Fs7KjQ8AAGd3N@cluster0.zv72p.mongodb.net/db_septian_betest?retryWrites=true&w=majority";

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>{
  console.log('DB Connected')
  app.listen(process.env.PORT || port, () => {
    console.log(`app listening on port ${port}`)
  })
})
  .catch((err) => console.log(err));
