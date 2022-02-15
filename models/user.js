const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema= new Schema({
    UserName: {type:String, required:true, min:3, max:20, unique: true},
    Password: {type:String, required:true, min:6, max:20},
    firstName: {type:String, required:true },
    lastName: String,
    email: {type:String, required:true,  max:50, unique: true},
    profilePicture:{type:String, default:"", required:true},
    post: [{id:Number,
        subject: String,
        body:String
    }],
    followers:{type: Array, default: []},
    following:{type: Array, default: []},
    isAdmin:{type: Boolean, default: false},
    desc:{type: String, max:50},
    city:{type: String, max:50},
    state:{type: String, max:50},
    galleryPhoto:[String]
},
{timestamps:true});


const userModel = mongoose.model('User', UserSchema)

module.exports = userModel
