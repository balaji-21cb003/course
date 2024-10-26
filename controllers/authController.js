const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js');

const registerUser = async (req, res) => {
  console.log("Inside registerUser function");
  const { username, email, password } = req.body;
  console.log("Request body received:", req.body);

  try {
    const userExists = await User.findOne({ email });
    console.log("User exists check:", userExists);

    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    console.log("New user created:", user);

    res.status(201).json({ _id: user._id, email: user.email, token: generateToken(user._id) });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
