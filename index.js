const express=require('express')

const {PORT}=require('./constant')
const router=require('./routes')

const{startData}=require('./src/config/dataBase')

const app =express()


require('./src/config/express')(app)
require('./src/config/handlebars')(app)


app.use(router)

startData()
.then(()=>{
    app.listen(PORT,()=>console.log(`Server is starting on port ${PORT}...`))
})
.catch((err)=>{
    console.log('Not Good',err)
})