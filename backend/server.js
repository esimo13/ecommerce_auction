const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests only from this origin
    methods: "GET,POST", // Allow only specified HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow only specified headers
    optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
  })
);

// Config
// Use an absolute path so it works on Render regardless of the working directory.
// In production (Render), prefer Environment Variables; this file is mainly for local dev.
dotenv.config({ path: path.resolve(__dirname, "config", "config.env") });

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
