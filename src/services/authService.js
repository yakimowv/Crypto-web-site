const jwt=require('../utils/jwt')

const User = require('../models/User')
const{JWT_SECRET}=require('../../constant')

exports.login=async({email,password})=>{
    let user=await User.findOne({email})
    if(!user){
        throw new Error('Email or Password wrong !')
    }
    let isValid= await user.validatePassword(password)

    if(!isValid){
        throw new Error('Email or Password wrong !')
    }
    let payload={
        _id:user._id,
        username:user.username,
        email:user.email
    }
   let token =await jwt.sign(payload,JWT_SECRET)

   return token
}
exports.register=(userData)=>User.create(userData)

exports.findUser=(userId)=>User.findById(userId)

