const client = require("../configs/db");

exports.getAllNotes = (req, res) => {
  res.send("hey");
};
exports.updateNote = (req, res) => {};
exports.addNote = (req, res) => {
  const { heading, content } = req.body;
  const { email } = req.email;
  client.query(
    `insert into notes (email,heading,content) values (${email},${heading},${content});`
  );
};
exports.deleteNote = (req, res) => {};
