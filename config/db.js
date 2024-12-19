const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();

const DB_URI = process.env.DB_URI;
const port = process.env.PORT;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, clientOptions);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`app is listening on port ${port} locally`);
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}


module.exports = { app, express, connectDB };