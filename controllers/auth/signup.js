const User = require("../../model/user/model");

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

module.exports = signup;
