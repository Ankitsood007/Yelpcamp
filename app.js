var express             =  require("express");
var app                 =  express();
var bodyparser          =  require("body-parser");
var mongoose            =  require("mongoose");
var Campground          =  require("./models/campgrounds");
var seedDB              =  require("./seeds")
var Comment             =  require("./models/comment");
var passport            =  require("passport");
var LocalStrategy       =  require("passport-local");
var User                =  require("./models/user");
var methodOverride      =  require("method-override");
var flash               =  require("connect-flash");


var commentRoutes           =  require("./routes/comments");
var campgroundsRoutes       =  require("./routes/campgrounds");
var indexRoutes           =  require("./routes/index");

//seedDB();

///PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "Music is win!!",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));
app.use(flash());

app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    res.locals.error       = req.flash("error")
    res.locals.success     = req.flash("success");
    next();
})

mongoose.connect("mongodb://localhost/yelp_camp_v11");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static( __dirname+ "/public"));

app.set("view engine","ejs");

///beginning of the routes



///an example of nested routes...

app.use(indexRoutes);
app.use(commentRoutes);
app.use("/campgrounds",campgroundsRoutes); 


app.listen(3000,function(){
    console.log("server has started");
});