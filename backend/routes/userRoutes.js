const express = require('express');
const router = express.Router();
const { signUp, signIn, changePassword, changeEmail } = require('../controllers/userController');
const {authenticateToken} = require('../middlewares/authMiddleware');

// Sign up route
router.post('/signup', async (req, res) => {
  const { username, email, password, userType } = req.body;
  try {
    const signUpResult = await signUp(email, username, password, userType);
    res.json(signUpResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred during sign-up' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResult = await signIn(email, password);
    res.json(loginResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

// Change password route
router.post('/changepassword', authenticateToken,async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const {userid} = req.user;
  try {
    const changePasswordResult = await changePassword(userid, oldPassword, newPassword);
    res.json(changePasswordResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred while changing password' });
  }
});

// Change email route
router.post('/changeemail',authenticateToken, async (req, res) => {
  const { newEmail } = req.body;
  const {userid} = req.user;
  try {
    const changeEmailResult = await changeEmail(userid, newEmail);
    res.json(changeEmailResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred while changing email' });
  }
});

module.exports = router;
