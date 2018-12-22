var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment   = require("./models/comment")

var data = [
{
   name : "image 1",
   image : "https://images.unsplash.com/photo-1544070643-24128d1f6033?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
   description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
},
{
   name: "image 2",
   image: "https://images.unsplash.com/photo-1544081185-e4f83084f51d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
   description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
},
{
   name: "image 3",
   image: "https://images.unsplash.com/photo-1543868093-83f61f777f87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
   description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
}
];


function seedDB(){

////remove all the campgrounds..
	Campground.remove({},function(err){
	if(err)
	{
		console.log(err);
	}
	 console.log("all the campgrounds have been removed");

	 data.forEach(function(seed){
    	Campground.create(seed,function(err,campground){
    		if(err)
    		{
    			console.log(err);
    		}
    		else
    	     {
    	        console.log("new campground added");
    	        ///add a new comment..

    	        Comment.create(
    	        {
    	        	text : "this place is better than heaven!!",
    	        	author : "homer"
    	        },
                 function(err,comment){
                 	if(err)
                 	{
                 		console.log(err);
                 	}
                 	else
                 	{
                       campground.comments.push(comment);
                       campground.save();
                       console.log("created an new comment.");
                 	}
                 });
    	     }
    	});
    });
}
);
	///add in a few campgrounds...
    
    

	/// add comments into the campgrounds..
}

module.exports = seedDB;
