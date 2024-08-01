const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const checkAndCorrectURL = require('./checkAndCorrectURL');
const sendMail = require('./sendMail');
const authUser = require('./authUser');

const login = async (req, res, { userModel }) => {
  const UserPasswordModel = mongoose.model(userModel + 'Password');
  const UserModel = mongoose.model(userModel);
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase(); // Normalize email

  // Validate input
  const objectSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: true } }).required(),
    password: Joi.string().required(),
  });

  const { error } = objectSchema.validate({ email: normalizedEmail, password });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Invalid/Missing credentials.',
      errorMessage: error.message,
    });
  }

  console.log(`Looking for user with email: ${normalizedEmail}`);

  // Find user by email
  const user = await UserModel.findOne({ email: normalizedEmail, removed: false });

  if (!user) {
    console.log(`No user found with email: ${normalizedEmail}`);
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No account with this email has been registered.',
    });
  }

  const databasePassword = await UserPasswordModel.findOne({ user: user._id, removed: false });

  if (!user.enabled) {
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Your account is disabled, contact your account administrator',
    });
  }

  // Authenticate user if the password is correct
  authUser(req, res, { user, databasePassword, password, UserPasswordModel });
};

module.exports = login;
