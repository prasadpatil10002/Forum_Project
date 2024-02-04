
const bcrypt = require('bcrypt');
const { z } = require('zod');
const {User}  = require('../models'); // Import the User model from the models folder
const jwt = require('jsonwebtoken');

// Define validation schemas using zod
const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string(), // Add validation for username
  password: z.string().min(5),
  userType: z.string(), // You might want to add specific validation for userType
});

// Sign up function with password hashing and zod validation
async function signUp(email, username, password, userType = 'default') {
  try {
    // Validate input using zod schema
    signUpSchema.parse({ email, username, password, userType });
    console.log(email, username, password, userType);
    // Check if the email is already registered
    const existingUsername = await User.findOne({where : {username}});
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Email is already registered
      return { success: false, message: 'Email is already registered' };
    }else if(existingUsername){
      return { success: false, message: 'Username is already taken' };
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    await User.create({ email, username, password: hashedPassword, usertype : userType});

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

async function signIn(email, password) {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    
    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Generate a JWT token with an expiry
    const token = jwt.sign({ username: user.username, userType: user.usertype }, process.env.JWT_SECRET,
       { expiresIn: '1d' });

    return { success: true, message: 'Login successful', token };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login' };
  }
}

module.exports = { signUp,signIn };
