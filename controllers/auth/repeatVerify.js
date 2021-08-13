const User = require("../../model/user/model");
const sendMail = require("../../utils/sendMail");

const { PORT = process.env.PORT || 3000 } = process.env;

const repeatVerify = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `User isn't found with this email: ${email}`,
      });
      return;
    }

    if (user.verify) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Verification has already been passed",
      });
      return;
    }

    const mail = {
      to: email,
      subject: "Please Verify Your Identity",
      html: `<a href=http://localhost:${PORT}/api/users/verify/${user.verificationToken}>Verify Identity</a>`,
    };

    await sendMail(mail);

    res.json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatVerify;
