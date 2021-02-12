const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Booking = require('../models/booking')
const Bike = require('../models/Bikes')
const booking  = require('../controllers/bookingController');
const moment = require('moment')
const momentTimezone = require('moment-timezone');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  console.log(req.user._id)
  res.render('dashboard', { user: req.user })
});

router.get('/mybooking/:id',ensureAuthenticated,booking.mybookings)
router.get('/dates',ensureAuthenticated,booking.getDates)
router.post('/dates',ensureAuthenticated,booking.postDates)
router.get('/bike/:id',ensureAuthenticated,booking.booking);
router.get('/booking/view/:id',ensureAuthenticated,booking.bookingView)


module.exports = router;
