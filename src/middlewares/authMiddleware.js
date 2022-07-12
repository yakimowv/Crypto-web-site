const jwt = require('../utils/jwt')
const {AUTH_COOKIE_NAME,JWT_SECRET} = require('../../constant')

exports.auth=function(req,res,next){
    let token =req.cookies[AUTH_COOKIE_NAME]

    if(token){
        jwt.verify(token,JWT_SECRET)
        .then(decodedToken=>{
            req.user=decodedToken
            res.locals.user=decodedToken
            next()
        })
        .catch(err=>{
            res.clearCookie(AUTH_COOKIE_NAME)
            res.status(403).render('404')
        })
    }else{
        next()
    }
}

exports.isAuth=function(req,res,next){
    if(req.user){
        next()
    }else{
        res.status(403).render('404')    }
}
exports.isGuest = function(req,res,next){
    if(!req.user){
        next()
    }else{
        res.redirect('/login')
    }
  
}
