const router=require('express').Router()
const mapError=require('../middlewares/mapperError')

router.get('/',(req,res)=>{
    try{
        res.render('home')
    }catch(err){
        console.error(err)
        const errors=mapError(err)
        res.render('home',{errors})
    }
})

module.exports=router