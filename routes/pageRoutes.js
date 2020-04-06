const router = require("express").Router();
const path = require("path");

// This is to connect to exercise.html
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
// This is to connect to stats.html
router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;