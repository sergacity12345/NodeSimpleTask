
const mongoose = require('mongoose')

const roomTypeSchema = mongoose.Schema({
    name:{type:String},
    roomType:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Room"},
    price:{type:Number, required:true}
})

module.exports = mongoose.model("RoomType", roomTypeSchema)
