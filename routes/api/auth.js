const express = require("express");
const router = express.Router();
const { signup, login, logout, getProfile } = require("../../controllers/auth");
const { validateUser } = require("../../routes/api/validate");
const { authenticate } = require("../../middlewares/authenticate");

router.post("/signup", validateUser, signup);
router.post("/login", validateUser, login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getProfile);

module.exports = router;
