const router = require('express').Router()

const homeController=require('./src/controller/homeController')
const authController = require('./src/controller/authController')
const createController=require('./src/controller/createController')
const catalogController=require('./src/controller/catalogController')
const detailsCotrnoller=require('./src/controller/detailsController')
const searchController=require('./src/controller/searchController')

router.use('/',homeController)
router.use(authController)
router.use('/create',createController)
router.use('/catalog',catalogController)
router.use('/details',detailsCotrnoller)
router.use('/search',searchController)





router.use('*',(req,res)=>{
    res.render(`404`)
})

module.exports=router