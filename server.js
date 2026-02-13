require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.json({ message: "Welcome to the Modular Conversation Engine API" });
})


// mongo DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
      console.log("Connected to mongoDB")
      app.listen(process.env.PORT,() => {
            console.log(`Server is running on port ${process.env.PORT}`)
      })
})
.catch((error) => {
      console.error("Error connecting to mongoDB:", error);
})

