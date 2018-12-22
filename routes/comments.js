
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");
var middleware  = require("../middleware")

router .get("/campgrounds/:id/comments/new",middleware.Isloggedin,function(req,res){

    Campground.findById(req.params.id,function(err,foundcampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new",{campground : foundcampground});
        }
    });
    
});

router .post("/campgrounds/:id/comments",middleware.Isloggedin,function(req,res){
///lookup for the campground
///create a new comment
///connect new comment to the campground
///redirect to show page of campground.
Campground.findById(req.params.id,function(err,campground){
if(err)
{
    console.log(err);
    res.redirect("/campgrounds");
}
else
{
  Comment.create(req.body.comment,function(err,comment){
    if(err)
    {
        req.flash("error","Something went wrong!"); 
        res.redirect("back");
    }
    else
    {
    	//console.log("new comment created by " +  req.user.username);

        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        
        campground.comments.push(comment);
        campground.save();

        //console.log(comment);
        req.flash("success","Successfully Added");
        res.redirect('/campgrounds/'+ campground._id);
    }
  })
}

});

});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkcommentauthority,function(req,res){

   Campground.findById(req.params.id,function(err,foundcampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            Comment.findById(req.params.comment_id,function(err,foundcomment){
                if(err)
                {
                    res.redirect("back");
                }
                else
                {
                    res.render("comments/edit",{campground : foundcampground, comment : foundcomment});
                }
            });
            
        }

    });
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkcommentauthority,function(req,res){

  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
     if(err)
     {
        res.redirect("back");
     }
     else
     {
        res.redirect('/campgrounds/'+ req.params.id);
     }
  });

});

///delete/destroy part!!

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkcommentauthority,function(req,res){
Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err)
    {
        res.redirect("back");
    }
    else
    {
        req.flash("success","Comment deleted!")
        res.redirect('/campgrounds/'+req.params.id);
    }
});

});



module.exports = router;