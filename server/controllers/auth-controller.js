const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');


/**
 * Register a new user.
 * Expects: { username, email, password } in req.body.
 * Returns a JWT token on successful registration.
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user document
    const newUser = await User.create({
      username,
      email,
      passwordHash,
    });

    // Create a JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECURE_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token: token, user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

/**
 * Login an existing user.
 * Expects: { email, password } in req.body.
 * Returns a JWT token if credentials are valid.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare the submitted password with the stored hashed password
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      console.log("password not Valid");
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECURE_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token: token, userData: user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

exports.user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    //console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

