const listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const alllist = await listing.find({});
  res.render("./listing/index.ejs", { alllist });
};
module.exports.renderNewForm = (req, res) => {
  res.render("./listing/new.ejs");
};
module.exports.postNewListing = async (req, res, next) => {
  let respond = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  let newlisting = new listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  newlisting.geometry = respond.body.features[0].geometry;
  let savelisting = await newlisting.save();
  req.flash("success", "New listing Created !");
  res.redirect("/listings");
};
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listings = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listings) {
    req.flash("error", "listing you requested for does not exits !");
    res.redirect("/listings");
  } else {
    res.render("./listing/show.ejs", { listings });
  }
};
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findById(id);
  if (!list) {
    req.flash("error", "listing you are requested does not exist !");
    res.redirect("ligstings");
  } else {
    let originalImgUrl = list.image.url;
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/h_100,w_150");
    res.render("./listing/edit.ejs", { list, originalImgUrl });
  }
};
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let uplisting = await listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true, runValidators: true }
  );
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    uplisting.image = { url, filename };
    await uplisting.save();
  }
  req.flash("success", " listing updated!");
  return res.redirect(`/listings/${id}`);
};
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let dltitm = await listing.findByIdAndDelete(id);
  req.flash("success", "listing Deleted !");
  res.redirect("/listings");
};
