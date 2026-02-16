require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
      res.json({ message: "Conversation Engine API Running" });
});

const adminRoutes = require("./src/routes/admin.routes");

app.use("/admin", adminRoutes);


// Connect DB
connectDB();

app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
});
