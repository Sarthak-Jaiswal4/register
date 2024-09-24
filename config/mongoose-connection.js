const mongoose=require('mongoose')
const config=require('config')

mongoose.connect(`${config.get("MONGODB_URL")}/poster`)
.then(function(){
    console.log(`Connected`)
})
.catch(function(err){
    console.log(err.message)
})

module.exports=mongoose.connection