const listing=require("../models/listing.js");
const Review=require("../models/review.js");
module.exports.createReview=async (req, res, next) => {
  let foundlistings = await listing.findById(req.params.id);
  let new_reviews = new Review(req.body.review);
  new_reviews.author = req.user._id;
  console.log(new_reviews);
  foundlistings.reviews.push(new_reviews);

  await new_reviews.save();
  await foundlistings.save();
  console.log("new review save");
  req.flash("success", "New review added!");
  res.redirect(`/listings/${foundlistings._id}`);
}
module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  }