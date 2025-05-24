const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const cors = require('cors');
const path = require('path');
const announcementRoutes = require('./routes/announcementRoute');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', announcementRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("MongoDB Not Connected:", err.message));

=======
require('dotenv').config();
const quizRoutes = require('./routes/quizRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/quizzes', quizRoutes);

// Start Server
>>>>>>> 24f76d267dfbb8ff8e5749aa2d60bf311f7b5f93
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
