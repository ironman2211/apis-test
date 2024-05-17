const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/api-docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const dbUrl = process.env.DB_URL;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/suppliers", require("./routes/suppliers"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


// MongoDB connection
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connection SUCCESSFUL 🌤️");
    // Server Start 
    app.listen(PORT, () => console.log(`Server is running on port ${PORT} ⚡⚡⚡`));
  })
  .catch((err) => console.error("Could not connect to MongoDB ⛈️", err));
