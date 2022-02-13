const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema= new Schema({
    author: {type:String, required:true},
    subject: {type:String, required:true},
    content: {type:String, required:true},
    img:String

    }
, {timestamps: true});


const postModel = mongoose.model('Post', PostSchema)

module.exports = postModel
