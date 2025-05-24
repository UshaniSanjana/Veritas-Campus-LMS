const express = require('express');
const mongoose = require('mongoose');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});