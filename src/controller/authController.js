const router=require('express').Router()
const{isAuth,isGuest}=require('../middlewares/authMiddleware')
const authService=require('../services/authService')
const{AUTH_COOKIE_NAME}=require('../../constant')
const mapError = require('../middlewares/mapperError')


router.get('/login',isGuest,(req,res)=>{
    res.render('login')
})
router.post('/login',isGuest,async(req,res)=>{
    try{
        const {email,password} =req.body
        let token = await authService.login({email,password})
        res.cookie(AUTH_COOKIE_NAME,token)
        
        res.redirect('/')
    }catch(err){
        console.error(err)
        const errors=mapError(err)
        res.render('login',{errors})
    }
})

router.get('/register',isGuest,(req,res)=>{
    res.render('register')
})

router.post('/register',isGuest,async(req,res)=>{
    try{
    const {username,email,password,repas} =req.body
    if(password === ''){
        throw new Error('Password must be field!')
    }
    if(password !== repas){
        throw new Error('Passwords must be equal!')
    }
           await authService.register({
            username,
            email,
            password
        })
        let token=await authService.login({email,password})

        res.cookie(AUTH_COOKIE_NAME,token)
        res.redirect('/')

    }catch(err){
        console.error(err)
        const errors=mapError(err)
        res.render('register',{errors})
    }
   
})
router.get('/logout',isAuth,(req,res)=>{
    res.clearCookie(AUTH_COOKIE_NAME)
    res.redirect('/')
})


module.exports=router