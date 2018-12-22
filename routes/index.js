var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user"); 

router .get("/",function(req,res){
res.render("landing");
});



///AUTH ROUTES::

router .get("/register",function(req,res){
    res.render("register"); 
})

router .post("/register",function(req,res){
    var new_user = new User({username : req.body.username});
    User.register(new_user,req.body.password,function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            return res.render("/register");
        }
           passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to yelpcamp "+user.username);
           res.redirect("/campgrounds");
        });
    });
});

router .get("/login",function(req,res){
    res.render("login");
})

///handling login logic
///app.post("/login",middleware,callback_function)---> basic prototype for post route logic

router .post("/login",passport.authenticate("local",
{
    successRedirect : "/campgrounds",
    failureRedirect  : "/login"
}),
function(req,res){

});

router .get("/logout",function(req,res){
    req.logout();
req.flash("success","logged u out");
    res.redirect("/campgrounds");
})

function Isloggedin(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
        res.redirect("/login");
    }
}

module.exports = router;

