const mongoose=require("mongoose");
const review=require("./review.js");
const {Schema}=mongoose;
const listingschema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type: String,
    },
   image: {
    url:String,
    filename:String,
  },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
    geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  // category:{
  //   type:String,
  //   enum:["mountains","artics","farms", "deserts",]
  // }
});

listingschema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await review.deleteMany({_id : {$in : listing.reviews}});
  }
});


const listing = mongoose.model("listing",listingschema);





module.exports=listing;

