const mongoose = require("mongoose");

const connectDatabase = () => {
  if (!process.env.DB_URI) {
    throw new Error(
      "DB_URI is not set. On Render, add DB_URI in the service Environment Variables."
    );
  }

  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
