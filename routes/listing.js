const express = require("express");
const wrapasync = require("../utils/wrapasync.js");
const {listingSchema, reviewschema} = require("../schema.js");
const ExpressErrors = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const router = express.Router();
const {isloggedIn} = require("../middleware.js");
const{isOwner} = require("../middleware.js")
const path = require("path");
const ListingControllers = require("../controllers/listings.js");




const validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    throw new ExpressErrors(400, error);
  }

  else{
      next();
  }
}

const validatereview=(req,res,next)=>{
   let{error} = reviewschema.validate(req.body);
   if(error){
    throw new ExpressErrors(400,error);
}

   else{
    next();
   }
}

//index route
router.get("/", wrapasync(ListingControllers.index));
//new route
router.get("/new",isloggedIn,ListingControllers.renderNewForm);

//new listing added here
router.post("/", isloggedIn,wrapasync(ListingControllers.create));


//show route
router.get("/:id",isloggedIn, wrapasync(ListingControllers.show))


//edit route
router.get("/:id/edit",isloggedIn,isOwner,wrapasync(ListingControllers.edit));

//update route
router.put("/:id",isloggedIn,isOwner,validateListing,wrapasync(ListingControllers.update))


//delete route
router.delete("/:id",isloggedIn,isOwner,wrapasync(ListingControllers.destroy))
module.exports = router;
