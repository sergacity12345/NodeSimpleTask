const RoomType = require('../model/RoomType')

const Room = require('../model/Room')

const mongoose = require('mongoose')

exports.postRoomType = (req, res, next)=>{
    const room = new RoomType({
        name:req.body.name
    })
    room.save()
     .then(result=>{
        res.status(201).json({
            message:'Room created'
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

exports.getRoomType = (req,res,next)=>{
    RoomType.find()
     .then(result=>{
        res.status(200).json({
            result
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
}

exports.postRoom = (req,res,next)=>{
    const room = new Room({
        name: req.body.name,
        price:req.body.price,
        roomType:req.body.roomType
    })
    room.save()
        .then(result=>{
            res.status(201).json({
                message:'room created',
                result:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    
}

exports.getRoom =(req,res,next)=>{
    Room.find()
     .then(result=>{
        res.status(200).json({
            rooms:result.map(curr=>{
                return{
                    id:curr._id,
                    name:curr.name,
                    roomTypeId:curr.roomType,
                    price:curr.price
                }
            })
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
}


exports.updateRoom = (req,res,next)=>{
    const roomId = req.params.roomId
    Room.updateOne({_id:roomId},{
        name: req.body.name,
        price:req.body.price,
        roomType:req.body.roomType
    })
     .then(result=>{
        res.status(201).json({
            message:'room updated',
            // result:result
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
}

exports.getOneRoom = (req,res,next)=>{
    const roomId = req.params.roomId
    Room.findById(roomId)
     .then(result=>{
        res.status(200).json({
            result
        })
     })
     .catch(err=>{
        res.status(200).json({
            error:err
        })
     })
}

exports.deleteOneRoom = (req,res,next)=>{
    const roomId = req.params.roomId
    Room.deleteOne({_id:roomId})
     .then(result=>{
        res.status(200).json({
            message:'room deleted'
        })
     })
     .catch(err=>{
        res.status(200).json({
            error:err
        })
     })
}