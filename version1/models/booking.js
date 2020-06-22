const mongoose = require('mongoose');
import validator from 'validator'
import { required } from "joi";
var Schema = mongoose.Schema
const bookingSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    bike:{
        type:Schema.Types.ObjectId,
        ref:'Bike'
    },
    bookingStart:{
        type: Date
    },
    bookingEnd:{
        type:Date
    },
    startHour:{
        type:Number
    },
    duration:{
        type: Number
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        default:null
    }
});

module.exports = mongoose.model('Booking', bookingSchema);