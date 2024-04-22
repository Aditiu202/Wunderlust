const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
    title:{
    type:String,
    require:true,
    },
    description:{
    type:String,
    },
    image:{
      type:String,
      default:"https://th.bing.com/th/id/OIP.W78vS2hxjB4E-d6dKu3tbwHaE7?w=195&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      set:(v)=> v===""?"https://th.bing.com/th/id/OIP.W78vS2hxjB4E-d6dKu3tbwHaE7?w=195&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7":v,
    },
    price:Number,
    location:Array,
    country:String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref:"Review",
      },
    ],

    owner:{
           type:Schema.Types.ObjectId,
           ref:"User",
    },
});
listingSchema.post("findOneAndDelete" ,async(listing)=>{
  if(listing){
 await Review.deleteMany({_id:  {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;