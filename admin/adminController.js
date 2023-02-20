const mongoose = require('mongoose');

const Admin = require('../model/admin')

const RoomType = require('../model/Roomtypes')

// const Joi = require('joi')

const { validateSignup } = require('../validate/validate')

const bycrypt = require('bcrypt')

// after creatin an admin, it will take us to an api route which will be meant for creating room type
exports.createAdmin = (req, res, next)=>{
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
    Admin.find({email:req.body.email})
     .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message:' Admin already exit'
            })
        }
        else{
            const admin = new Admin({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            admin.save()
             .then(results=>{
                res.status(200).json({
                    message:'Admin created',
                    name:results.name,
                    email:results.email,
                    adminID:results._id,
                    request:{
                        type:'POST',
                        url:'http://localhost:3000/create/roomtypes/' + results._id
                    }
                })
             })
        }
     })
}

exports.creatRoomType = (req,res,next)=>{
    // console.log(req.params.adminId)
    const id = req.params.adminId
    Admin.find({_id:id})
     .then(result=>{
        if(result.length >= 1){
            const room = new RoomType({
                name:req.body.name,
                price:req.body.price,
                roomType:id

            })
            room.save()
             .then(result=>{
                res.status(201).json({
                    message:'Room created',
                    createdBy:id,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/admin/roomtypes/"+ id
                    }
                })
             })
             .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }else{
            res.status(500).json({
                messaage:'Not Authorized',
                error:err
            })
        }
     })
     .catch(err=>{
        res.status(500).json({
            message:'ERROR',
            error:err
        })
    })
}
// An ADMIN can get all the room he?she created 
exports.getAdminRoomType = (req,res,next)=>{
    const id = req.params.adminId
    Admin.find({_id:id})
     .then(result=>{
        if(result.length >= 1){
            RoomType.find()
             .then(roomT=>{
                res.status(200).json({
                    roomTy:roomT.map(curr=>{
                        return{
                            roomId:curr._id,
                            name:curr.name,
                            roomType:curr.roomType,
                            price:curr.price,
                            GETrequest:{
                                tyep:"GET",
                                url:`http://localhost:3000/admin/roomtypes/getoneroom/${id}?id=${curr._id}`
                            },
                            DELETErequest:{
                                type:"DELETE",
                                url:"http://localhost:3000/admin/roomtypes/delete/"+ id + '?id='+ curr._id
                            }
            
                        }
                    })

                })
             })
            
        }else{
            res.status(409).json({
                messaage:'Not Authorized',
                error:err
            })
        }
     })
     .catch(err=>{
        res.status(500).json({
            message:'ERROR',
            error:err
        })
    })
}



exports.getOneAdminRoomtype = (req,res,next)=>{
    Admin.find({_id:req.params.adminId})
     .then(result=>{
         if(result.length >= 1){
             RoomType.find({roomType:req.params.adminId})
             .then(results=>{
                res.status(200).json({
                    res:results,
                    details:results.map(curr=>{
                        return {
                            GETrequest:{
                                type:"GET",
                                url:'http://localhost:3000/admin/roomtypes/'+ req.params.adminId
                            },
                            POSTrequest:{
                                
                                type:"PATCH",
                                url:'http://localhost:3000/admin/roomtypes/update/'+ req.params.adminId +"?id="+ curr._id
                            }
                        }
                    })
                })
             })
             .catch(err=>{
                res.status(409).json({
                    error:err
                })
             })
        }else{
            return res.status(500).json({
                message:'Not authorized'
            })
        }
     })
     .catch(err=>{
        res.status(500).json({
            meesage:"YYY",
            error:err
        })
     })
}


exports.adminUpdateRoomtype = (req,res,next)=>{
    const name = req.body.name
    const price = req.body.price
    const roomTypeID = req.query.id
    Admin.find({_id:req.params.adminId})
     .then(result=>{
         if(result.length >= 1){
             RoomType.updateOne({_id:roomTypeID},{
                name:name,
                price:price
             })
             .then(results=>{
                res.status(201).json({
                    message:"Roomtype updated",
                    result:results,
                    request:{
                        type:"GET",
                        url:'http://localhost:3000/admin/roomtypes/'+ req.params.adminId
                    }
                })
             })
             .catch(err=>{
                res.status(409).json({
                    error:err
                })
             })
        }else{
            return res.status(500).json({
                message:'Not authorized'
            })
        }
     })
     .catch(err=>{
        res.status(500).json({
            meesage:"Error",
            error:err
        })
     })
}


exports.adminDeleteOneRoomtype = (req,res,next)=>{
    const roomTypeID = req.query.id
    console.log(roomTypeID)
    Admin.find({_id:req.params.adminId})
     .then(result=>{
         if(result.length >= 1){
            RoomType.deleteOne({_id:roomTypeID})
             .then(results=>{
                res.status(200).json({
                    message:"Room type deleted",
                    results:results,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/admin/roomtypes/" + req.params.adminId
                    }
                })
             })
             .catch(err=>{
                res.status(409).json({
                    meesage:"Error",
                    error:err
                })
             })
         }
     })
     .catch(err=>{
        res.status(500).json({
            meesage:"Error",
            error:err
        })
     })
}