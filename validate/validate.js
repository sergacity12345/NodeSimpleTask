const joi = require('joi')

const validator = (schema) =>(payload) => schema.validate(payload,{abortEarly:false})

const signUpSchema = joi.object({
    name:joi.string().alphanum().required(),
    email:joi.string().email().required(),
    password:joi.number().min(3).required()
})

exports.validateSignup = validator(signUpSchema)