const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },

  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: "250" }, true);
    },
  },

  token: {
    type: String,
    default: null,
  },

  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = userSchema;
