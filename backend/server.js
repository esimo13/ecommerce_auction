const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
// Use an absolute path so it works on Render regardless of the working directory.
// In production (Render), prefer Environment Variables. If you use Render "Secret Files",
// they are mounted under /etc/secrets/<filename> and must be loaded explicitly.
const localEnvPath = path.resolve(__dirname, "config", "config.env");
const renderSecretEnvPath = "/etc/secrets/config.env";

dotenv.config({
  path: fs.existsSync(renderSecretEnvPath) ? renderSecretEnvPath : localEnvPath,
});

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
