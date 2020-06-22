const Bike = require('../models/Bikes');
const { uploader } = require('../utils');

exports.index = async function (req, res) {
    const bikes = await Bike.find({});
    res.status(200).json({bikes});
};

exports.addBike = async(req,res)=>{
    const bike = Bike({
        bikename:req.body.bikename,
        modelyear:req.body.modelyear,
        transmission:req.body.transmission,
        price:req.body.price,
        quantity:req.body.quantity,
        city:req.body.city,
        
    })
    try{
        if(req.file){
            const result = await uploader(req.file)
            bike.bikeimage = result
            bike.save()
        }else{
        await bike.save()
        }
        res.status(200).json({bike:bike});
    }catch(err){
        res.status(200).json({error:err})
    }
};



exports.destroy = async function (req, res) {
    try {
        const id = req.body.id;
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'Bike has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;
        const bike = await Bike.findByIdAndUpdate(id, {$set: update}, {new: true});

        //if there is no image, return success message
        if (!req.file) return res.status(200).json({user, message: 'Bike has been updated'});

        //Attempt to upload to cloudinary
        const result = await uploader(req);
        const bike_ = await Bike.findByIdAndUpdate(id, {$set: update}, {$set: {bikemage: result.url}}, {new: true});

        if (!req.file) return res.status(200).json({user: bike_, message: 'Bike has been updated'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
