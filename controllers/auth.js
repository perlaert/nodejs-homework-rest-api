const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user/model");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email });

    if (result) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is use",
      });
      return;
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registration successful",
    });
  } catch (error) {
    next(error);
  }
};

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

const getProfile = async (req, res, next) => {
  const userProfile = {
    _id: req.user._id,
    email: req.user.email,
    subscription: req.user.subscription,
  };

  res.json({
    staus: "success",
    code: 200,
    data: {
      result: userProfile,
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
};
