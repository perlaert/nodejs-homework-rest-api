const User = require("../../model/user/model");
const uuid = require("uuid");
const sendMail = require("../../utils/sendMail");

const { PORT = process.env.PORT || 3000 } = process.env;

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

    const verificationToken = uuid.v4();

    const newUser = new User({ email, verificationToken });
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
      to: email,
      subject: "Please Verify Your Identity",
      html: `<a href=http://localhost:${PORT}/api/users/verify/${verificationToken}>Verify Identity</a>`,
    };

    await sendMail(mail);

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
