const express=require('express')
const cookieParser=require('cookie-parser')
const {auth}=require('../middlewares/authMiddleware')

function expressConfig(app){
    app.locals.title=`Real Estate`
    app.use('/static',express.static('static'))
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())
    app.use(auth)
}

module.exports=expressConfig