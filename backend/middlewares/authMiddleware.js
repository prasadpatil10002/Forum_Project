const jwt = require('jsonwebtoken');
const {User} = require('../models');

function getToken(req){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    return token;
}

const authenticateToken = async (req, res, next) => {
    const token = getToken(req);

    if(token == null){
        return res.status(401).json({success : false, messagen : 'Token not found'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findOne({where : {username : decoded.username}});
        next();
    }catch(error){
        console.log("Error Authenticating Token : ",error);
        return res.status(403).json({success : false,message : 'Invalid Token'});
    }
};

const authenticateFaculty = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Missing authentication token' });
    }
  
    // Check if the user has the faculty userType
    if (req.user.userType !== 'faculty') {
      return res.status(403).json({ message: 'Forbidden: Only faculty members are allowed' });
    }
  
    // If the user is authenticated and has faculty userType, proceed to the next middleware
    next();
};


module.exports = {authenticateToken,authenticateFaculty};