const cryptoServices=require('../services/cryptoServices')
exports.isAuthor=async function (req,res,next){
    let crypto=await cryptoServices.getOneForGard(req.params.id)
    if(crypto.owner==req.user?._id){
        next()
    }else{
        res.redirect('/')
    }
}
exports.notAuthor=async function (req,res,next){
    let crypto=await cryptoServices.getOneForGard(req.params.id)
    if(crypto.owner!=req.user?._id){
        next()
    }else{
        res.redirect('/')
    }
}

