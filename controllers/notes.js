const cli = require("nodemon/lib/cli");
const client = require("../configs/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;
  const email = req.email;
  // console.log(req);
  // res.send(email);
  client
    .query(
      `insert into notes (email,heading,content) values ('${email}','${heading}','${content}');`
    )
    .then(() => {
      res.status(200).json({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

exports.getAllNotes = (req, res) => {
  const email = req.email;
  client
    .query(`select * from notes where email = '${email}';`)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

exports.updateNote = (req, res) => {
  const noteId = req.params.noteId;
  const { heading, content } = req.body;
  //console.log(noteId);
  client
    .query(
      `update notes set heading='${heading}',content='${content}' where noteId='${noteId}';`
    )
    .then(() => {
      res.status(200).json({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

exports.deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  client
    .query(`delete from notes where noteId='${noteId}';`)
    .then(() => {
      res.status(200).json({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
