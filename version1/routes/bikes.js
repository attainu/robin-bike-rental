const express = require('express')
const router = express.Router();
const multer = require('multer');

const bike = require('../controller/bikeController')

const upload = multer().single('profileImage');


router.get('/',bike.index);
router.post('/addBike',upload,bike.addBike);
router.post('/deleteBike',bike.destroy);
router.put('/update/:id',upload,bike.update)


module.exports = router;

