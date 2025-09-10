const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, } = require("../middleware.js");
const userController=require("../controller/users.js");

router.route("/signup")
.get(userController.renderSignUPpage)
.post(
  wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLoginPage)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 wrapAsync(userController.logIn));
router.get("/logout", userController.logOut);


module.exports = router;
