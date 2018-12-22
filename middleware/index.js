//all the middleware goes here

var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkcampauthority = function (req,res,next){

    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err,foundcampground){
       if(err)
       {
        console.log(err);
       }
       else
       {
          if(foundcampground.author.id.equals(req.user.id))
          {
              next();
          }
          else
          {
              res.redirect("back");
          }
       }
    });

    }
    else
    {
       res.redirect("back");
    }
};

middlewareObj.checkcommentauthority  = function(req,res,next){

    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundcomment){
       if(err)
       {
        req.flash("error","Campground not found!")
        res.redirect("back");
       }
       else
       {
          if(foundcomment.author.id.equals(req.user.id))
          {
              next();
          }
          else
          {
             req.flash("You don't have permission to access this page!");
              res.redirect("back");
          }
       }
    });

    }
    else
    {
       req.flash("error","You need to be logged in to do that!");
       res.redirect("back");
    }
};

middlewareObj.Isloggedin = function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
       req.flash("error","Please login first!!");
        res.redirect("/login");
    }
};


module.exports = middlewareObj;
