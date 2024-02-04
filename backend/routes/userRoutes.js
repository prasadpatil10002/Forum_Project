const express = require('express');
const router = express.Router();
const {signUp,signIn} = require('../controllers/userController');

router.post('/signup', async (req, res) => {
   const {username,email,password,userType}  = req.body;
   try{
    const signUpResult = await signUp(email, username,password, userType);
    res.json(signUpResult);

   }catch(err)
   {
    console.log(err);
    res.status.json({success:false,message:err.message});
   }
});

router.post('/login', async (req, res) => {
   const {email,password}  = req.body;
   try{
    const loginResult = await signIn(email,password);
    res.json(loginResult);

   }catch(err)
   {
    console.log(err);
    res.status.json({success:false,message:err.message});
   }
});

module.exports = router;