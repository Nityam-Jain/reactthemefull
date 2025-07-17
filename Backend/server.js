console.log("Server.js loaded");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());  


app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
 
// Routes
const authorRoutes = require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/authors", authorRoutes);
app.use("/api/users", userRoutes);

// MongoDB Conn.
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => { 
    console.log("Connected to MongoD  B");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(" MongoDB connection error:", err));
