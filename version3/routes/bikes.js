const express = require('express')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const router = express.Router();
const bike = require('../controllers/bikeController')
const uploads = require('../utils/multer')
const upload = uploads.single('bikeimage')

router.get('/',ensureAuthenticated,bike.index);
router.get('/view/:id', ensureAuthenticated,bike.viewbike)
router.get('/addBike',ensureAuthenticated,bike.addBikeget)
router.post('/addBike',upload,ensureAuthenticated,bike.addBike);
router.get('/update/:id',ensureAuthenticated,bike.updateget)
router.put('/update/:id',ensureAuthenticated,upload,bike.update)
router.post('/deleteBike/:id',ensureAuthenticated,bike.destroy);


module.exports = router;

