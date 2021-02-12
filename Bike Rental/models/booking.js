const mongoose = require('mongoose');
const validator = require('validator')
const joi = require('joi')
const required = joi.required
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
        type: String
    },
    bookingEnd:{
        type:String
    },
    city:{
        type:String
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