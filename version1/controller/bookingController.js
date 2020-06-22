const Booking = require('../models/booking');
const moment = require('moment')
const momentTimezone = require('moment-timezone')

const dateAEST = date => {
    return momentTimezone(date).tz('Asia/Kolkata')
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

exports.newBooking = async function(req,res){
    const bikeId = req.params.id;
    const userId = req.user._id;
    if (!userId) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});
    const newbooking=Booking({
      user:userId,
      bike:bikeId,
      startHour: dateAEST(req.body.bookingStart).format('H.mm'),
      duration: durationHours(req.body.bookingStart, req.body.bookingEnd),
      status:"Booked",
      ...req.body  
    })
    try{
        await newbooking.save()
        res.json({message:'Booked', newbooking:newbooking})
    }catch(err){
        res.status(500).json({message: error.message});
    }



}