const router=require('express').Router()

const cryptoServices=require('../services/cryptoServices')
const mapError=require('../middlewares/mapperError')

router.get('/',async(req,res)=>{
    const cryptos=await cryptoServices.getAll({}).lean()
    try{
        res.render('catalog',{cryptos})
    }catch(err){
        console.error(err)
        const errors=mapError(err)
        res.render('catalog',{errors})
    }
})

module.exports=router