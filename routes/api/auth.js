const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { validateUser, validateRepeatVerify } = require("../../routes/api/validate");
const { authenticate } = require("../../middlewares/authenticate");
const { uploadMiddleware } = require("../../middlewares/uploadMiddleware");

router.post("/signup", validateUser, ctrl.signup);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getProfile);
router.patch("/avatars", authenticate, uploadMiddleware.single("avatar"), ctrl.updateAvatar);
router.get("/verify/:verificationToken", ctrl.verify);
router.post("/verify", validateRepeatVerify, ctrl.repeatVerify);

module.exports = router;
