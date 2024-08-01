const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Admin = require('@/models/coreModels/Admin'); // Adjust the path as needed
const AdminPassword = require('@/models/coreModels/AdminPassword'); // Adjust the path as needed

const register = async (req, res) => {
  const { name, surname, email, password, country } = req.body;

  // Validate request body
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    country: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    // Check if admin with the same email exists
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'Admin already exists with this email' });
    }

    // Generate salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(salt + password);

    // Create new admin object
    const newAdmin = new Admin({
      name,
      surname,
      email,
      enabled: true,
      removed: false,
      created: new Date(),
      role: 'admin',
    });

    // Save admin to database
    await newAdmin.save();

    // Create new admin password object
    const newAdminPassword = new AdminPassword({
      user: newAdmin._id,
      password: hashedPassword,
      salt,
      emailVerified: false,
      authType: 'email',
      loggedSessions: [],
      removed: false,
    });

    // Save admin password to database
    await newAdminPassword.save();

    // Return success response
    res.status(201).json({ success: true, message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = register;
