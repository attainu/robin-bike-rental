const auth =require('./auth.js');
const bike = require('./bikes.js')
const booking = require('./bookingRoute')

const authenticate = require('../middlewares/authenticate');
const { index } = require('../controller/bikeController.js');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).redirect('/api/auth');
    });

    app.use('/api/auth', auth);
    //use authenticate for protected routes
    app.use('/api/bikes',authenticate,bike);
    app.use('/api/booking',authenticate,booking)
};