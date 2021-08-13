const User = require("../../model/user/model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }

    if (!user.verify) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Please Verify Your Identity",
      });
      return;
    }

    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    await User.updateOne({ _id: user._id }, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        result: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
