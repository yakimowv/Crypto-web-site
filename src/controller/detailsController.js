const router=require('express').Router()
const cryptoServices=require('../services/cryptoServices')

// const userService=require('../services/authService')
const {isAuthor,notAuthor}=require('../middlewares/gard')
const mapError = require('../middlewares/mapperError')

router.get('/:id',async(req,res)=>{
    try{
    const cryptoId=req.params.id
    const crypto=await cryptoServices.getOneDetaild(cryptoId).populate('buyCrypto').lean()
    const isOwner=crypto.owner._id == req.user?._id
    const isBuy=crypto.buyCrypto.some(x=>x._id==req.user?._id)

    res.render('details',{...crypto,isOwner,isBuy})
    }catch(err){
        console.error(err)
        res.redirect('/404')
    }
})

router.get('/edit/:id',isAuthor,async(req,res)=>{
    const cryptoId=req.params.id
    let crypto= await cryptoServices.getOne(cryptoId).lean()
    if(crypto.method === 'crypto-wallet'){
        crypto.method1=true
    } 
    if(crypto.method === 'credit-card'){
        crypto.method2=true
    } 
    if(crypto.method === 'debit-card'){
        crypto.method3=true
    }
    if(crypto.method === 'paypal'){
        crypto.method4=true
    }
     try{
         res.render('edit',{...crypto})
     }catch(err){
         console.error(err)
         const errors=mapError(err)
         res.render('edit',{errors})
     }
 })

router.post('/edit/:id',isAuthor,async(req,res)=>{
    let cryptoId=req.params.id
    const newCryptoData=req.body
    let oldCryptoData = await cryptoServices.getOne(cryptoId).lean()
    try{
        await cryptoServices.update(oldCryptoData,newCryptoData)
        res.redirect(`/details/${cryptoId}`)
    }catch(err){
        console.error(err)
        const errors=mapError(err)
        res.render(`edit`,{...req.body,errors})
    }
})
    router.get('/delete/:id',isAuthor,async(req,res)=>{
    let cryptoId=req.params.id
    await cryptoServices.deleteCrypto(cryptoId)
    res.redirect('/catalog')
})
router.get('/buy/:id',notAuthor,async(req,res)=>{
    let cryptoId=req.params.id
    const userId=req.user._id
    try{
        await cryptoServices.buyCrypto(cryptoId,userId)
        res.redirect(`/details/${cryptoId}`)
    }catch(err){
    console.error(err)
    const errors=mapError(err)
    res.render(`details`,{errors})
    }

})



module.exports=router