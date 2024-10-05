const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        // Check if the URI is defined
        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in the environment variables.');
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  // Exit the application with failure
    }
};

module.exports = connectDB;
