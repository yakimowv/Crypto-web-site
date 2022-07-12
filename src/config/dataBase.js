const mongoose=require('mongoose')
const {DB_CONNECT_STRING}=require(`../../constant`)

exports.startData=function(){
    return mongoose.connect(DB_CONNECT_STRING)
}

