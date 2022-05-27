const express = require("express");

const {
  getAllNotes,
  updateNote,
  deleteNote,
  addNote,
} = require("../controllers/notes");

const router = express.Router();

router.get("/getAllNotes", getAllNotes);
router.put("/updateNote/:noteId", updateNote);
router.post("/addNote", addNote);
router.delete("/deleteNote/:noteId", deleteNote);

module.exports = router;
