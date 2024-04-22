const Listing = require("../models/listing"); 
module.exports.index =async(req, res) => {
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
  }

  module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
   }

   module.exports.create=async(req,res,next)=>{
    if( !req.body.listing){
      throw new ExpressErrors(404, "Send valid data for listing");
    }
    const newlisting =  new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("success","New list created");
    res.redirect("/listings");
  }

  module.exports.show=async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('owner');
       if(!listing){
        req.flash("error","You are not the owner of this listing");
        res.redirect('/listings');
       }
      res.render("listings/show.ejs", {listing});
  }

  module.exports.edit=async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
  }

  module.exports.update=async(req,res)=>{
    if( !req.body.listing){
      throw new ExpressErrors(404, "Send valid data for listing");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,  {...req.body.listing});
    
    req.flash("success","New list update");
    res.redirect("/listings");
  }

  module.exports.destroy=async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id); 
    req.flash("success"," list deleted");
     res.redirect("/listings");
  }
