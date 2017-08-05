var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

//Root Route
router.get("/",function(req,res){
    res.render("landing");
});

//Show Register Form
router.get("/register", function(req,res){
    res.render("register");
});

//Handle Signup Logic
router.post("/register", function(req,res){
   var newUser= new User({username:req.body.username});     //provided by passport local mongoose package
   if(req.body.adminCode === 'secret'){
       newUser.isAdmin = true;
   }
   User.register(newUser, req.body.password, function(err,user){
       if(err){
        req.flash("error", err.message);
        return res.redirect("/register");
       }
       passport.authenticate("local")(req,res, function(){
           req.flash("success", "Welcome to Lit "+user.username+" !");
           return res.redirect("/campgrounds");
       });
   });
});

//Show Login Form
router.get("/login",function(req,res){
    res.render("login");
});

//Handling Login Logic
router.post("/login",passport.authenticate("local",
    {
     successRedirect:"/campgrounds",
     failureRedirect:"/login",
     failureFlash: "Invalid username or password",
     successFlash: "Welcome back!!"
    }),function(req,res){
});

//Logout Route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});


module.exports=router;
