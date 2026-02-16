require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const adminRoutes = require("./src/routes/admin.routes");
const userRoutes = require("./src/routes/user.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
      res.json({ message: "Conversation Engine API Running" });
});



app.use("/admin", adminRoutes);
app.use("/user", userRoutes);



// Connect DB
connectDB();

app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
});
