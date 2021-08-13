const User = require("../../model/user/model");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
      return;
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
