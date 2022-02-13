const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema= new Schema({
    UserName: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: String,
    img: {type:String, required:true},
    email: {type:String, required:true},
    post: [{id:Number,
        subject: String,
        body:String
    }],
    galleryPhoto:[String]
    });


const userModel = mongoose.model('User', UserSchema)

module.exports = userModel
