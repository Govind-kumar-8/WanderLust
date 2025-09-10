const User=require("../models/users.js");
module.exports.renderSignUPpage= (req, res) => {
  res.render("user/signup.ejs");
}
module.exports.signUp=async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registerUser = await User.register(newUser, password);
      req.logIn(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wandarlust !");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }
  module.exports.renderLoginPage=(req, res) => {
  res.render("user/login.ejs");
}
module.exports.logIn=async (req, res) => {
    req.flash("success", "Welcom to Wanderlust !");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
  module.exports.logOut=(req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "You are logged Out !");
      res.redirect("/listings");
    }
  });
}