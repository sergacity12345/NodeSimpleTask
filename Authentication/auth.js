const admin = require('../model/admin')

exports.auth = (res,req,next)=>{
    const id = req.param._id
    admin.find({_id:id})
     .then(result=>{
        if(result){
            next()
        }else{
            return res.status(500).json({
                message:'Not authorized'
            })
        }
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
}