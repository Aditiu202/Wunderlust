module.exports.signupform=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup=async (req, res) => {
    try{
     let {username, email, password } = req.body;
     const newUser = new User({ email, username });
     
     // Correct order of parameters: user, password, callback
     const registeredUser = await User.register(newUser, password);
      req.flash("success","Successfully registration in Wanderlust");
     req.login(registeredUser,(err)=>{
         if(err){
             return next(err);
          }
          res.redirect("/listings");
      });
     }catch(e){
         console.log(e);
         res.redirect("/signup");
     }
   
     
     
 }


 module.exports.loginform=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.login=async(req,res)=>{
    req.flash("success","Successfully login in Wanderlust");
    let redirecturl=res.locals.redirecturl || "/listings";
 res.redirect(redirecturl);
   
}

module.exports.logout=(req,res, next)=>{
    req.logout((err)=>{
       if(err){
        return next(err);
       }
       req.flash("success","Successfully logout from Wanderlust");
       res.redirect("/listings");
    });
}


 