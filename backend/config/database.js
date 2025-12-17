// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in your .env file");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error(" Error while connecting to Database:", err.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};
