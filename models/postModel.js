const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema= new Schema({
    UserName: {type:String, required:true},
    subject: {type:String, required:true},
    content: {type:String, required:true, max:500},
    img: {type:String}
    }
, {timestamps: true});


const postModel = mongoose.model('Post', PostSchema)

module.exports = postModel

//=============================
// owner: req.body.owner,
// desc: req.body.desc,
// contentType:req.file.mimetype,
// image:new Buffer(encode_img,'base64')
// };
//
//
//
// <%for(let val of allUsers){%>
