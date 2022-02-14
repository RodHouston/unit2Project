
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ImageSchema = new mongoose.Schema({
   owner: String,
   desc: String,
   img:
   {
       data: Buffer,
       contentType: String
   }
});

//Image is a model which has a schema imageSchema
const imageModel = mongoose.model("image", ImageSchema);
module.exports = imageModel;
