const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter:(res,file,cb)=>{
        console.log(file)
        if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)){
            cb(new Error('File is not supported'), false)
            return
        }
        cb(null,true)
    }
})