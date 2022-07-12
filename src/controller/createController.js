const router=require('express').Router()
const mapError = require('../middlewares/mapperError')
const cryptoServices=require('../services/cryptoServices')
const {isAuth}=require('../middlewares/authMiddleware')


router.get('/',isAuth,(req,res)=>{
    res.render('create')
})
router.post('/',isAuth,async(req,res)=>{
    try{
     await cryptoServices.create({...req.body, owner:req.user._id})
        res.redirect('/catalog')
    }catch(err){
        console.log(err)
        const errors=mapError(err)
        res.render('create',{errors})
    }
})

module.exports=router