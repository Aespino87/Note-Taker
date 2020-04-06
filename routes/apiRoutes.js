const router = require("express").Router();
const notesDb = require("../db/db.js");

// Fetch the notes in the database
router.get("/api/notes", (req, res) => {
    notesDb.readAll().then(result => {
        res.json(result);
    },
    err => {
        res.json([]);
        console.log(err);
    });
});

// Write a note to the database
router.post("/api/notes", (req, res) => {
    notesDb.addNote(req.body.title, req.body.text).then(
        newNote => {
            res.json(newNote);
        },
        err => {
            console.log(err);
            res.json({
                errorMessage: err
            });
        }
    );
});

// Delete a record from the database.
router.delete("/api/notes/:noteId", (req, res) => {

    // Get the user ID
    var noteId = req.params.noteId;

    notesDb.deleteNote(noteId).then(
        () => {
            res.json({message: "Note deleted!"});
        },
        err => {
            console.log(err);
            res.json({
                errorMessage: err
            });
        }
    );

});

module.exports = router;