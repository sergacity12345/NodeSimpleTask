
const Room = require('../model/room')

const RoomType = require('../model/Roomtypes')

const { validateSignup } = require('../validate/validate')


const User = require('../model/user')

const mongoose = require('mongoose')

exports.creatUser = (req, res, next)=>{
    const { error,value} = validateSignup(req.body)
    if(error){
        console.log(error.details)
        return res.status(406).json({
            errorMessage:error.details.map(curr=>{
                return{
                    emailMessageError:curr.message
                }
                
            })
        })
    }
    User.find({email:req.body.email})
     .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message:' Admin already exit'
            })
        }
        else{
            const user = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            user.save()
             .then(results=>{
                res.status(200).json({
                    message:'User created',
                    name:results.name,
                    email:results.email,
                    userId:results._id,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/fetch/roomtype/' + results._id
                    }
                })
             })
        }
     })
}

exports.fetchRoomTypes = (req,res,next)=>{
    const userId = req.params.userId
    console.log(userId)
    User.find({_id:userId})
     .then(user=>{
        if(user.length >= 1){
            RoomType.find()
             .then(roomtype=>{
                res.status(200).json({
                    room:roomtype.map(curr=>{
                        return{
                            roomId:curr._id,
                            roomName:curr.name,
                            roomTypeId:curr.roomType,
                            price:curr.price,
                            request:{
                                type:"POST",
                                url:`http://localhost:3000/user/create/room/${userId}?roomId=${curr._id}&roomTypeId=${curr.roomType} `
                            }
                        }
                    })
                })
             })
             .catch(err=>{
                res.status(404).json({
                    error:err
                })
             })
        }else{
            res.status(409).json({
                message:"creat account"
            })
        }
     })
     .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
}

exports.userCreateRoom =(req,res,next)=>{
    // const roomId = req.query.userId
    const roomTypeID = req.query.roomTypeId
    const userName = req.body.name
    User.find({_id:req.params.userId})
     .then(user=>{
        console.log(user)
        if(user.length>=1){
            const room = new Room({
                name:userName,
                roomType:roomTypeID,
                userId:req.params.userId
            })
            room.save()
             .then(result=>{
                res.status(201).json({
                    message:"Room created by " + userName,
                    result:result,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/user/fetch/room/"+req.params.userId
                    }
                })
             })
             .catch(err=>{
                res.status(404).json({
                    error:err
                })
             })
        }
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
}


exports.fetchRoom = (req,res,next)=>{
    const userId = req.params.userId
    User.find({_id:userId})
     .then(result=>{
        if(result.length >= 1){
            Room.find({userId:userId})
             .then(userRoom=>{
                res.status(200).json({
                    userRoom:userRoom.map(curr=>{
                        return{
                            roomId:curr._id,
                            name:curr.name,
                            roomType:curr.roomType,
                            request:{
                                type:"GET",
                                url:"http://localhost:3000/fetch/single/rooms/"+userId +"?roomId="+curr._id
                            }
                        }
                    })
                })
             })
             .catch(err=>{
                res.status(404).json({
                    error:err
                })
             })
        }
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
}

exports.getOneRoom = (req,res,next)=>{
    const roomId = req.query.roomId
    const userId = req.params.userId
    User.find({_id:userId})
     .then(result=>{
        if(result.length >= 1){
            Room.findById(roomId)
             .then(result=>{
                res.status(200).json({
                    result,
                    request:{
                        type:"DELETE",
                        url:"http://localhost:3000/user/delete/room/"+userId+"?roomId="+roomId
                    }
                })
            })
            .catch(err=>{
                res.status(200).json({
                    error:err
                })
            })
        }
     })
    
}

exports.deleteOneRoom = (req,res,next)=>{
    const roomId = req.query.roomId
    const userId = req.params.userId
    User.find({_id:userId})
     .then(result=>{
        if(result.length >= 1){
            Room.remove({_id:roomId})
             .then(result=>{
                res.status(200).json({
                    result,
                    message:roomId + 'deleted'
                })
            })
            .catch(err=>{
                res.status(200).json({
                    error:err
                })
            })
        }
     })
}