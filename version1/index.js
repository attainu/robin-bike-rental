require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require("path");

/*require('dotenv').config();

import express, { json, urlencoded } from 'express';
import { promise, connect, connection as _connection } from 'mongoose';
import cors from 'cors';
import passport, { initialize } from "passport";
*/


//port and mongo db url
const connUri = process.env.MONGO_LOCAL_CONN_URL;
const PORT = process.env.PORT || 3000;

//create app
const app = express();

app.use(cors());

//prasing json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//Db connect
mongoose.connect(
    connUri,
    { useNewUrlParser: true,useUnifiedTopology: true },
    ()=>console.log('connected to db!')
);

//View Setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'))


//import passport from './middlewares/jwt.js';
app.use(passport.initialize());
require("./middlewares/jwt")(passport);


//Configure Route
require('./routes/index')(app);



//Start Server
app.listen(PORT, () => {console.log('Server running on '+PORT+'/')});