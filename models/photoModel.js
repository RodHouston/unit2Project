const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PhotoSchema = new mongoose.Schema({
   UserName: {type:String, required:true},
   desc: {type:String, required:true},
   src:{type:String, required:true}

},{timestamps: true});


const photoModel = mongoose.model("Photo", PhotoSchema);
module.exports = photoModel;
