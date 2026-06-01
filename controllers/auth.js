const bcrypt = require("bcryptjs");

const User = require("../models/user");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }
    const boolean = await bcrypt.compare(password, user.password);
    if (!boolean) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        userID: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(200).json({ msg: "login Successful", token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { register, login };
