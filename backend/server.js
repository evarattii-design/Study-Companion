// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }));

// Mount routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);

// Default route
app.get('/', (req, res) => {
  res.send(`<div>
    <p>Server is running!</p>
  </div>`);
});

// Connect DB & Cloudinary, then start server
async function startServer() {
  try {
    await connectDB();
    await cloudinaryConnect();
    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => {
      console.log(`Server Started on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to DB/Cloudinary:", err);
    process.exit(1);
  }
}

startServer();
