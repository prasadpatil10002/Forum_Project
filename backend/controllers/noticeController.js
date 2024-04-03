// controllers/noticeController.js
const { Notice ,User} = require('../models');
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads'); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming
  },
});

// Init upload
const upload = multer({
  storage: storage,
}).single('file'); // Field name for file upload

async function createNotice(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: 'Error uploading file' });
      } else {
        try {
          const { title, content} = req.body;
          const userid = req.user.userid; 
          console.log('User ID:', userid);
          const filename = req.file ? req.file.filename : null; // Filename of the uploaded file
          // Save notice with filename or file path
          const notice = await Notice.create({ title, content, userid, filename });
          res.status(201).json(notice);
        } catch (error) {
          console.error('Error creating notice:', error);
          res.status(500).json({ message: 'Error creating notice' });
        }
      }
    });
  }

async function getAllNotices(req, res) {
  try {
    const notices = await Notice.findAll();
    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices' });
  }
}
async function getUserNotices(req, res) {
  try {
    const userid = req.query.userid;
    if (!userid) {
      return res.status(400).json({ message: 'User ID is required in query parameters' });
    }
    const userNotices = await Notice.findAll({ where: { userid } ,include: {model: User, attributes: ['username']}});
    res.json(userNotices);
  } catch (error) {
    console.error('Error fetching user notices:', error);
    res.status(500).json({ message: 'Error fetching user notices' });
  }
}




async function updateNotice(req, res) {
  try {
    const noticeid = req.params.noticeid;
    const { title, content } = req.body;
    const [updated] = await Notice.update({ title, content }, { where: { noticeid } });
    if (updated) {
      res.json({ message: 'Notice updated successfully' });
    } else {
      res.status(404).json({ message: 'Notice not found' });
    }
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ message: 'Error updating notice' });
  }
}

async function deleteNotice(req, res) {
  try {
    const {noticeid} = req.params;
    const deleted = await Notice.destroy({ where: { noticeid } });
    if (deleted) {
      res.json({ message: 'Notice deleted successfully' });
    } else {
      res.status(404).json({ message: 'Notice not found' });
    }
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ message: 'Error deleting notice' });
  }
}

module.exports = { createNotice, getAllNotices, updateNotice, deleteNotice ,getUserNotices};
