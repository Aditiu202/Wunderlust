const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require("method-override");
 const app = express();
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
const ejsMate = require('ejs-mate');
app.engine('ejs',ejsMate);
const MongooseURL = "mongodb://127.0.0.1:27017/wanderlust";;
const listings = require("./routes/listing.js")
const userRouter = require("./routes/user.js")
const session = require("express-session");
const flash = require("connect-flash");
const reviews = require("./routes/review.js")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");







main().then(()=>{
    console.log("connected to db");
}) 
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MongooseURL);
}


app.get("/",(req,res)=>{
    res.send("Hiii I am Root");
})



const sessionOption = {
    secret: "mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires :Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
}
app.use(session(sessionOption));
 app.use(flash());

 app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error= req.flash("error");
    //  res.locals.CurrUser = req.user;
    next();
 })
//A middleware that intialise the passport
app.use(passport.initialize());
//It is used to ensure that the same person is present on different web page
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//user se related sari information ko session me store karna bar bar login nhi karna pageda
passport.serializeUser(User.serializeUser());
//user se related sari information ko session me unstore karna 
passport.deserializeUser(User.deserializeUser());


// app.get("/demouser", async(req,res)=>{
//     let fakeuser = new User({
//         email:"student@2002",
//         username:"delta course ",
//     });
//    let registereduser =   await User.register(fakeuser,"123456");
//    res.send(registereduser);
// })


app.use((req, res, next) => {
    if (req.user) {
      res.locals.CurrUser  = req.user;
    } else {
      res.locals.CurrUser  = null;
    }
    next();
  });
  

app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);

// app.use((req,res,next)=>{
// res.locals.currUser = req.user;
// })







//create route 


//review create route


//edit route



//To handle error we use some middleware
app.all("*", (req,res,next)=>{
    next(new ExpressError(404, "page not found"));
})


app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", {err});
    res.status(statusCode).send(message);
});


app.listen(8080,()=>{
    console.log("Server was listening");
});