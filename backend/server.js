// Import Dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary").v2; // ✅ Explicitly use v2

// Handle Uncaught Exceptions (e.g., console.log(unknownVar))
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to an uncaught exception");
  process.exit(1);
});

// ✅ Load Environment Variables First
dotenv.config({ path: "./backend/config/config.env" });

// ✅ Configure Cloudinary BEFORE anything else
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary ENV Vars:", process.env.CLOUDINARY_API_KEY);


console.log("✅ Cloudinary Config Loaded");

// ✅ Connect to Database
connectDatabase();

// ✅ Import App
const app = require("./app");

// ✅ Start Server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ✅ Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to an unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
