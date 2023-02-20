
const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name: {type:String, required:true},
    roomType:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"RoomType"},
    userId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"}


})

module.exports = mongoose.model('Room', roomSchema)