const express = require('express')
const router = express.Router();
const booking  = require('../controller/bookingController');

router.post('/bike/:id',booking.newBooking);

module.exports = router;