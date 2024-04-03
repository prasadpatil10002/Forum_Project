const bcrypt = require('bcrypt');
const { z } = require('zod');
const { User } = require('../models'); // Import the User model from the models folder
const jwt = require('jsonwebtoken');

// Define validation schemas using zod
const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string(), // Add validation for username
  password: z.string().min(5),
  userType: z.string(), // You might want to add specific validation for userType
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(5),
  newPassword: z.string().min(5),
});

const changeEmailSchema = z.object({
  newEmail: z.string().email(),
});

// Sign up function with password hashing and zod validation
async function signUp(email, username, password, userType = 'default') {
  try {
    // Validate input using zod schema
    signUpSchema.parse({ email, username, password, userType });

    // Check if the email is already registered
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      // Email is already registered
      return { success: false, message: 'Email is already registered' };
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    await User.create({ email, username, password: hashedPassword, usertype: userType });

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation failed
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return { success: false, message: errorMessage };
    }

    console.error('Error during sign-up:', error);
    return { success: false, message: 'An error occurred during sign-up' };
  }
}

// Sign in function
async function signIn(email, password) {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Generate a JWT token with an expiry
    const token = jwt.sign(
      { username: user.username, userType: user.usertype, userid: user.userid },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { success: true, message: 'Login successful', token };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login' };
  }
}

// Function to change password
async function changePassword(userid, oldPassword, newPassword) {
  try {
    // Validate input using Zod schema
    changePasswordSchema.parse({ oldPassword, newPassword });

    // Find the user by ID
    const user = await User.findByPk(userid);

    // Check if the user exists
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Check if the old password matches
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return { success: false, message: 'Incorrect old password' };
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await user.update({ password: hashedNewPassword });

    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation failed
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return { success: false, message: errorMessage };
    }

    console.error('Error changing password:', error);
    return { success: false, message: 'An error occurred while changing password' };
  }
}

// Function to change email
async function changeEmail(userid, newEmail) {
  try {
    // Validate input using Zod schema
    changeEmailSchema.parse({ newEmail });

    // Find the user by ID
    const user = await User.findByPk(userid);

    // Check if the user exists
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Check if the new email is already registered
    const existingEmail = await User.findOne({ where: { email: newEmail } });
    if (existingEmail) {
      return { success: false, message: 'Email is already registered' };
    }

    // Update the user's email
    await user.update({ email: newEmail });

    return { success: true, message: 'Email changed successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation failed
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return { success: false, message: errorMessage };
    }
    console.error('Error changing email:', error);
    return { success: false, message: 'An error occurred while changing email' };
  }
}

module.exports = { signUp, signIn, changePassword, changeEmail };
