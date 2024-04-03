const express = require('express');
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
}));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(bodyParser.json());

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/notices',noticeRoutes);
app.use('/api/comments',commentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});