var express      = require("express");
var router       = express.Router();
var Campground   = require("../models/campgrounds");
var middleware   = require("../middleware")     

router.get("/",function(req,res){
   
        //res.render("campgrounds",{campgrounds: campgrounds});
         Campground.find({},function(err,allcampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds: allcampgrounds });
        }
    });
})

router.get("/new",middleware.Isloggedin,function(req,res){
    res.render("campgrounds/new");
     
});

router.post("/",middleware.Isloggedin,function(req,res){
    //redirect to the campground route.
 var name    =  req.body.name;
 var image   =  req.body.image;
 var des     =  req.body.description;

 var author = {
    id : req.user._id,
    username : req.user.username
 };

 
 var newcampgroundobject={name:name,image:image,description:des,author:author};
 //console.log(req.user);
 Campground.create(newcampgroundobject,function(err,newlycreated){
    if(err){
        console.log(err)
    }
    else
    {
        res.redirect("/campgrounds")
    }

 })

});

router.get("/:id",function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }
        else{
          res.render("campgrounds/show",{campgrounds:foundcampground});
        }

    });
    
});

///edit 

router.get("/:id/edit",middleware.checkcampauthority,function(req,res){

       Campground.findById(req.params.id,function(err,foundcampground){
              res.render("campgrounds/edit",{campground : foundcampground});
       });
    });

///update

router.put("/:id",middleware.checkcampauthority,function(req,res){
    //find the campground and update the changes..
    //and then redirect somewhere.
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
      if(err)
      {
        console.log(err);
      }
      else
      {
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
});

router.delete("/:id",middleware.checkcampauthority,function(req,res){
Campground.findByIdAndRemove(req.params.id,function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
        res.redirect("/campgrounds");
    }
});
});



module.exports = router;