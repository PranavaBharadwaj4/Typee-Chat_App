const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { findByIdAndUpdate } = require("../models/userModel");
module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res.json({ msg: "Username Already Used", status: false });
    }
    const userEmailCheck = await User.findOne({ email });
    if (userEmailCheck) {
      return res.json({ msg: "Email Already Used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ msg: "Registered Successfully", status: true, user });
  } catch (err) {
    next(err);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json({ msg: "Username Invalid", status: false });
    }

    console.log(user.password);
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    delete user.password;
    return res.json({ msg: "Login Successful", status: true, user });
  } catch (err) {
    next(err);
  }
};
module.exports.setIcon = async (req, res, next) => {
  try {
    console.log(req.body);
    const userId = req.params.id;
    const iconImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isIconSet: true,
      iconImage: iconImage,
    });
    return res.json({ isSet: userData.isIconSet, image: userData.iconImage });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "iconImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
