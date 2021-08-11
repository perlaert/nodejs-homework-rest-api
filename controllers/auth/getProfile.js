const getProfile = async (req, res, next) => {
  const userProfile = {
    _id: req.user._id,
    email: req.user.email,
    subscription: req.user.subscription,
  };

  res.json({
    status: "success",
    code: 200,
    data: {
      result: userProfile,
    },
  });
};

module.exports = getProfile;
