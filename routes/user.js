const mongoose=require('mongoose')
const plm=require('passport-local-mongoose')

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    secret:String,
})
userSchema.plugin(plm)

module.exports=mongoose.model("user",userSchema)