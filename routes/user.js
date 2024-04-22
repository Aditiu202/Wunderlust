const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveredirecturl } = require("../middleware.js");
const ListingControllers = require("../controllers/users.js");

router.get("/signup",ListingControllers.signupform)

router.post("/signup",  wrapasync(ListingControllers.signup));

router.get("/login",ListingControllers.loginform);

router.post("/login", saveredirecturl, passport.authenticate("local",{failureRedirect: '/login'}),ListingControllers.login)

router.get("/logout", ListingControllers.logout)






module.exports = router;