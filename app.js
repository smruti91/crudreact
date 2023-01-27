const express = require('express');
const app = express();
require("dotenv").config();
require('./db/conn');
const users = require('./models/userSchema');
const cors = require("cors");
const router = require('./routes/router');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})
