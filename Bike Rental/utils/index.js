const Datauri = require('datauri');
const path = require('path');

const cloudinary = require('../config/cloudinary');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function uploader(req){

    const result = await cloudinary.uploader.upload(req.path,{ transformation: { width: 500, height: 500, crop: "fill" }})
    return result.secure_url
}

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { uploader, sendEmail };

