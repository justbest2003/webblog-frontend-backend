const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all requried fields",
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({ username, password: hashedPassword });
    res.send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};
