const mongoose = require('mongoose');
// Connecting to database
const DB = process.env.DATABASE
mongoose.set('strictQuery', false);
mongoose.connect(DB
    ,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log(err) : console.log(
        "Connected to yourDB-name database")
  );