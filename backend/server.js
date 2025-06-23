const express = require('express');
const cors = require('cors');
const instructorRoutes = require('./routes/InstructorRoutes');

//dotenv
require('dotenv').config();

const app = express();
app.use(cors());

const {mongoose} = require('mongoose');

//database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("MongoDB Not Connected"))

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/instructors', instructorRoutes);

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});