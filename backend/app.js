const dotenv = require('dotenv');
dotenv.config(); // this loads environment variables from a .env file into process.env
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db'); // Import the database connection function
connectToDb(); // Connect to the MongoDB database


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes


app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
}); 


module.exports = app;
// This is the main entry point for the backend server.
// It sets up an Express server that listens on port 4000.
// The server responds to GET requests at the root URL with a welcome message