const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const SALT_ROUNDS=10

const userSchema = new mongoose.Schema({
    username:{type:String,required:[true,'Username is required!'],minlength:[5,`At least five characters long!`]},
    email:{type:String,required:true,minlength:[10,`At least ten characters long!`],validate:[/^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/,'Need email!']},
    password :{type:String,required:true,minlength:[4,`At least four characters long!`]},
})


userSchema.pre('save',function(next){
return bcrypt.hash(this.password,SALT_ROUNDS)
.then((hash)=>{
    this.password=hash
    return next()
})
})


userSchema.method('validatePassword',function(password){
   return bcrypt.compare(password,this.password)

})


const User=mongoose.model('User',userSchema)

module.exports=User