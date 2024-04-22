const express = require("express");
const {reviewschema} = require("../schema.js");
const ExpressErrors = require("../utils/ExpressError.js");
const wrapasync = require("../utils/wrapasync.js");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isloggedIn,isreviewOwner } = require("../middleware.js");
const ListingControllers = require("../controllers/reviews.js");

const validatereviews = (req,res,next)=>{
    let {error} = reviewschema.validate(req.body);
    if(error){
        throw new ExpressErrors(400, error);
    }
    else{
        next();
    }
}

router.post("/", isloggedIn,validatereviews,wrapasync(ListingControllers.create));

//delete review route
router.delete("/:reviewId",isloggedIn,wrapasync(ListingControllers.delete))
module.exports = router;