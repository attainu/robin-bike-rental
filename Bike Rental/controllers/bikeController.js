const Bike = require('../models/Bikes');
const { uploader } = require('../utils/index');
const jwt = require('jsonwebtoken')

exports.index = async function (req, res) {
        Bike.find((err,data)=>{
            res.render('bikes',{user:req.user,bikes:data})
        })
};

exports.viewbike = async (req,res)=>{
        const ids = req.params.id;
        Bike.findById(ids,(err,data)=>[
            res.render('viewbike',{user:req.user,bikes:data})
        ])
};

exports.addBikeget = async(req,res)=>{
    res.render('add_bike',{user:req.user})
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

exports.updateget = async (req,res)=>{
    const ids = req.params.id
    const data = await Bike.findById(ids)
    res.render('update_bike',{user:req.user,bikeid:ids,bikes:data})
};

exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;
        const bike = await Bike.findByIdAndUpdate(id, {$set: update}, {new: true});

        //if there is no image, return success message
        if (!req.file) return res.status(200).redirect('/bikes');

        //Attempt to upload to cloudinary
        const result = await uploader(req);
        await Bike.findByIdAndUpdate(id, {$set: update}, {$set: {bikemage: result.url}}, {new: true});

        if (!req.file) return res.status(200).redirect('/bikes');

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(200).redirect('/bikes');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};