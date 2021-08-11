const User = require("../../model/user/model");
const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "File is not found",
      });
      return;
    }

    const { path: tempName } = req.file;
    const { _id } = req.user;
    const uniqueName = _id.toString();
    const avatarsFolder = path.join(process.cwd(), "public", "avatars");
    const userFile = path.join(avatarsFolder, `${uniqueName}.jpeg`);

    const img = await jimp.read(tempName);
    await img
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(tempName);

    await fs.rename(tempName, userFile);

    const updateUserAvatar = {
      avatarURL: userFile,
    };

    await User.findByIdAndUpdate(_id, updateUserAvatar.avatarURL);

    res.json({
      status: "success",
      code: 200,
      result: updateUserAvatar,
    });
  } catch (error) {
    await fs.unlink(tempName);
  }
};

module.exports = updateAvatar;
