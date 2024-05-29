const mongoose = require("mongoose");
require("dotenv").config();

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
async function connectDatabase() {
  try {
    const conn = await mongoose.connect(DB_CONNECTION_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  }
}

module.exports = connectDatabase;
