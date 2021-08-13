const User = require("../../model/user/model");

const logout = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user._id }, { token: null });

    res.status(204).json({
      status: "Not Content",
      code: 204,
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
