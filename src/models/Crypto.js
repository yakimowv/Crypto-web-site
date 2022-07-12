const moongose =require('mongoose')


let cryptoSchema = new moongose.Schema({
    name:{type:String,required:[true,`Name is required!`],
    minlength:[2,`At least two characters long!`]},

    image:{type:String,validate:[/^https?:\/\//i,'Image need start with http!']}, 
    price:{type:Number,min:[0,'Price need to be positive! '],required:[true,`Price is required!`]}, 
    description:{type:String,required:[true,`Description is required!`],
    minlength:[10,`At least ten characters long!`]}, 
    method:{type:String,required:[true,`Method is required!`]}, 
    buyCrypto:[{
        type:moongose.Types.ObjectId,
        ref:'User'
    }],
    owner:{
        type:moongose.Types.ObjectId,
        ref:'User'
    },
})

let Crypto=moongose.model('Crypto',cryptoSchema)


module.exports=Crypto