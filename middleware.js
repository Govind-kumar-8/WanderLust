const listing=require("./models/listing");
const Review=require("./models/review");

module.exports.isLoggedIn = (req,res, next)=>{
      if(! req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
    req.flash("error", "You must be logged in ");
   return res.redirect("/login");
}
next();
}
module.exports.saveRedirectUrl=(req, res, next)=>{
if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
}
next();
}

module.exports.isOwner= async (req,res,next)=>{
    let { id } = req.params;
    let listingcheck= await listing.findById(id);
    if (
      res.locals.currUser &&
      !listingcheck.owner._id.equals(res.locals.currUser._id)
    ) {
      req.flash("error", "You are not owner of this list");
      return res.redirect(`/listings/${id}`);
    }
    next()
}
module.exports.isReviewAuthor= async (req,res,next)=>{
    let { id,reviewId } = req.params;
    let reviwedAuthor= await Review.findById(reviewId);
    if (
      res.locals.currUser &&
      ! reviwedAuthor.author.equals(res.locals.currUser._id)
    ) {
      req.flash("error", "You are not author of this review");
      return res.redirect(`/listings/${id}`);
    }
    next()
}