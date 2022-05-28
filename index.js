require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const { verifyToken } = require("./middleware/authMiddleware");
const app = express();
const client = require("./configs/db");
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  client.connect((err) => {
    if (err) {
      res.status(200).send("error");
      console.error("connection error", err.stack);
    } else {
      console.log("connected to db");
      res.status(200).send("Server is up and running");
    }
  });
});

app.use("/auth", authRoutes);
app.use("/notes", verifyToken, noteRoutes);
// client.connect((err) => {
//   if (err) {
//     console.error("connection error", err.stack);
//   } else {
//     console.log("connected to db");
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
