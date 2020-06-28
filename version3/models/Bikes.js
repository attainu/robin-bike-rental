const mongoose = require('mongoose');

const validator = require('validator')
const joi = require('joi')
const required = joi.required
 
const bikeSchema = new mongoose.Schema({
    bikename:{
        type:String,
        required:[true, "Please Enter BIke Name"]
    },
    modelyear:{
        type:Number,
        default:2020
    },
    transmission:{
        type:String,
        required:[true, "Please Enter transmission type of bike"]
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number,
        min:1,
        max:50,
    },
    bikeimage:{
        type:String,
        required:false,
        
        
    },
    city:{
        type:String,
        required:[true, "Please Enter City  Name of bike"]
    },
    status:{
        type:Number,
        required:true,
        default:0
    },
    addedon:{
        type:Date,
        default:Date.now
    },
});

bikeSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
  });
  
  // Setter
  bikeSchema.path('price').set(function(num) {
    return num * 100;
  });

module.exports = mongoose.model('Bike',bikeSchema);
//export const Bike = model("Bike", bikeSchema);