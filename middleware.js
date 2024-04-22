const Listing = require("./models/listing");
const Review = require("./models/listing");
module.exports.isloggedIn = (req,res,next)=>{
     
    if(!req.isAuthenticated()){
          req.session.redirecturl = req.originalUrl;
           req.flash("error", "Please login yourself");
         return res.redirect("/login");
    }
    next();
}

module.exports.saveredirecturl=(req,res,next)=>{
  if(req.session.redirecturl){
     res.locals.redirecturl =req.session.redirecturl;
  }
  next();
}


//is there permission to update the code
// module.exports.isOwner = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//       return res.status(404).send('Listing not found');
//     }
//     if (!listing.Owner) {
//       return res.status(500).send('Listing owner information is missing');
//     }
//     if (!listing.Owner.equals(res.locals.currUser._id)) {
//       return res.redirect(`/listings/${id}`);
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Internal Server Error');
//   }
// };

module.exports.isOwner=async(req,res,next)=>{
  let{id}=req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.CurrUser._id)){
    req.flash("error", "You dont have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
