var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
//require routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index")

   
//add local db env var with export DATABASEURL=mongodb://localhost/yelp_camp (C9) dont forget to start ./mongod on terminal
//mLab add env on heroku dashboard DATABASEURL:mlab url (can changes it depends what changes i make in mlab)

// can use var url=process.env.DATABASEURL || "mongodb://localhost/yelp_camp" and use var on mongoose connect, this is in case the first one fails (this is backup option)
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
app.locals.moment=require("moment");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Uncharted 4 best game ever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //User authenticate comes with passport local mongoose in the users model (if we didnt have that package we would have to write that methos by ourselves)
passport.serializeUser(User.serializeUser()); //also this
passport.deserializeUser(User.deserializeUser()); //also this

app.use(function(req,res,next){
   res.locals.currentUser = req.user; //req user available in all routes
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("The YelpCamp Server has started!");
});