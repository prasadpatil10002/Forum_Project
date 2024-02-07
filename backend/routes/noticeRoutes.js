const express = require('express');
const router = express.Router();
const{getAllNotices,createNotice,getNoticeById,updateNotice,deleteNotice} = require('../controllers/noticeController');
const {authenticateToken,authenticateFaculty} = require('../middlewares/authMiddleware');


router.post('/', authenticateToken,authenticateFaculty, createNotice);

router.get('/',authenticateToken, getAllNotices);

router.get('/:noticeId',authenticateToken,getNoticeById);

router.put('/:noticeId', authenticateToken,authenticateFaculty,updateNotice);

router.delete('/:noticeId', authenticateToken,authenticateFaculty,deleteNotice);

module.exports = router;
