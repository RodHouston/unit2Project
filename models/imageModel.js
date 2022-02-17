
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ImageSchema = new mongoose.Schema({
   UserName: {type:String, required:true},  
   desc: String,
   img:
   {
       data: Buffer,
       contentType: String
   }
},{timestamps: true});


const imageModel = mongoose.model("image", ImageSchema);
module.exports = imageModel;
