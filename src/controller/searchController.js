const router=require('express').Router()
const mapError=require('../middlewares/mapperError')
const{isAuth,isGuest}=require('../middlewares/authMiddleware')

const cryptoServices=require('../services/cryptoServices')

router.get('/',isAuth,async(req,res)=>{
    let crypto
    if(req.query.searchParam === undefined){
        req.query.searchParam=''
         crypto= await cryptoServices.getAll().lean()
       }else{
         crypto = await cryptoServices.search(req.query.searchParam,req.query.searchMethod)
       }
    try{
        res.render('search',{crypto})
    }catch(err){
        console.error(err)
        const errors=mapError(err)
        res.render('search',{errors})
    }
})

module.exports=router