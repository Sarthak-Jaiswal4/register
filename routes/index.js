const express=require('express')
const router=express.Router()
const userModel=require("./user")
const passport=require('passport')
const localStrategy=require('passport-local')

passport.use(new localStrategy(userModel.authenticate()))

router.get('/',(req,res)=>{
    res.render("index")
})

router.get('/profile',isloggedin ,(req,res)=>{
    res.render("profile")
})

router.post('/register' , (req,res)=>{
    let{username,password,secret}=req.body
    var userdata=new userModel({
        username,
        password,
        secret,
    })
    userModel.register(userdata,req.body.password)
        .then(function(registereduser){
            passport.authenticate("local")(req,res,function(){
                res.redirect("/profile")
            })
        })
})

router.post('/login',passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/"
}) ,function(req,res){})

router.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err) return next(err);
        res.redirect('/')
    })
})

function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

module.exports=router