const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const listingSchema = require("../schema.js");
const listing = require("../models/listing.js");
const Review = require("../models/review.js");
const review = require("../models/review.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingConroller = require("../controller/listings.js");
const multer = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
router
  .route("/")
  .get(wrapAsync(listingConroller.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    //   validateListing,
    wrapAsync(listingConroller.postNewListing)
  );
 
//new rout
router.get("/new", isLoggedIn, listingConroller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingConroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    // validateListing,
    wrapAsync(listingConroller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingConroller.deleteListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingConroller.editListing)
);

module.exports = router;
