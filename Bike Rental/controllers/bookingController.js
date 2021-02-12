const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Booking = require('../models/booking')
const Bike = require('../models/Bikes')
const { uploader } = require('../utils/index');
const moment = require('moment')
const momentTimezone = require('moment-timezone');
const User = require('../models/User');


const dateAEST = date => {
    return momentTimezone(date)
};
  
  
const durationHours = (bookingStart, bookingEnd) => {
    // convert the UTC Date objects to Moment.js objeccts
    let startDateLocal = dateAEST(bookingStart)
    let endDateLocal = dateAEST(bookingEnd)
    // calculate the duration of the difference between the two times
    let difference = moment.duration(endDateLocal.diff(startDateLocal))
    // return the difference in decimal format
    return difference.hours() + difference.minutes() / 60
};
  

exports.getDates = async (req,res)=>{
    res.render('form',{user:req.user})
};
  
exports.postDates = async(req,res)=>{
      const currentDate = req.body.bookingStart
      const tillDate = req.body.bookingEnd
      const newCity = req.body.selectpicker
      if(!(req.cookies['bookingStart'] || req.cookies['bookingEnd'] || req.cookies['city'])){
        console.log('in if')
      res.cookie('bookingStart',currentDate,{overwrite: true})
      res.cookie('bookingEnd',tillDate,{overwrite: true})
      res.cookie('city',newCity,{overwrite: true})
      Bike.find((err,data)=>{
        if(!err){
            return res.render('index',{bikes:data,user:req.user})
        }
        else{
            console.log(err)
        }
      })
      
    }else{
      console.log('in else dates')
      const currentDate = req.body.bookingStart
      const tillDate = req.body.bookingEnd
      const newCity = req.body.selectpicker
      res.cookie('bookingStart',currentDate,{overwrite: true})
      res.cookie('bookingEnd',tillDate,{overwrite: true})
      res.cookie('city',newCity,{overwrite: true})
      Bike.find((err,data)=>{
        if(!err){
            return res.render('index',{bikes:data,user:req.user})
        }
        else{
            console.log(err)
        }
    })
      
    }
};
  
  

exports.booking = async(req,res)=>{ 
    const bikeId = req.params.id;
    const userId = req.user._id;
    console.log(userId)
    if (!userId) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
    const newbooking=Booking({
      user:userId,
      bike:bikeId,
      bookingStart:req.cookies['bookingStart'],
      bookingEnd:req.cookies['bookingEnd'],
      startHour: dateAEST(req.cookies['bookingStart']).format('H.mm'),
      duration: durationHours(req.cookies['bookingStart'], req.cookies['bookingEnd']),
      city:req.cookies['city'],
      status:"Booked"
    })
    try{
      Booking.find(
        {$and:[{bookingStart:{$lte:req.cookies['bookingStart']}},{bookingEnd:{$gte:req.cookies['bookingEnd']}},{bike:{$eq:bikeId}},{city:{$eq:req.cookies['city']}}]},async(err,data)=>{
          console.log(data)
          if(data.length>0){
            res.render('already_booked', { user: req.user })
          }else{
          await newbooking.save()
          res.render('booked',{user:req.user})
        }
        })        
    }catch(err){
        res.render('already_booked', { user: req.user })
    }
  
};

exports.mybookings = async (req,res)=>{
    const userId = req.user._id
    const data = await Booking.find({user:userId})
    res.render('my_bookings',{user:req.user,booking:data})
}

exports.bookingView = async (req,res)=>{
    const ids = req.params.id
    const data = await Bike.find({_id:ids})
    res.render('booking_view',{user:req.user,bikes:data})


}
  