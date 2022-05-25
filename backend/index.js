const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
