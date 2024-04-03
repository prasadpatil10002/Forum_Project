const express = require('express');
const router = express.Router();
const{getAllNotices,createNotice,updateNotice,deleteNotice,getUserNotices} = require('../controllers/noticeController');
const {authenticateToken,authenticateFaculty} = require('../middlewares/authMiddleware');


router.post('/', authenticateToken,authenticateFaculty, createNotice);

router.get('/',authenticateToken, getAllNotices);

router.get('/usernotices',authenticateToken,getUserNotices);

router.put('/:noticeid', authenticateToken,authenticateFaculty,updateNotice);

router.delete('/:noticeid', authenticateToken,authenticateFaculty,deleteNotice);

module.exports = router;
