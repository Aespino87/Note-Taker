const fs = require("fs");
const uuid = require("uuid");

const dbFileName = "db/db.json";

// Unique ID generated with uuid https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13

const notesDb = {

    // Read all the records from the file.
    readAll: function() {

        return new Promise((resolve, reject) => {

            fs.readFile(dbFileName, (err, data) => {
                if (err) {
                    reject(err);
                }
                
                // Try catch block if there is an error parsing the JSON.
                try {

                    let notesList = JSON.parse(data);

                    // Verify the object is array. If not, return an empty array
                    if(Array.isArray(notesList)) {
                        resolve(notesList);
                    } else {
                        resolve([]);
                    }

                } catch(err) {
                    console.log(err);
                    resolve([]);
                }
            });
        });
    },

    // Add a note to the database.
    addNote: function(title, text) {

        return new Promise((resolve, reject) => {

            if (title == "") {
                reject("A note title is required.");
            } else if (text == "") {
                reject("Note text is required."); 
            }

            this.readAll().then(
                noteList => {

                    // Append new note to list.
                    let newNote = {
                        id: uuid.v4(),
                        title: title,
                        text: text
                    };
                    noteList.push(newNote);

                    // Save back to json file.
                    fs.writeFile(dbFileName, JSON.stringify(noteList), err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newNote);
                        }
                    });

                },
                err => {
                    reject(err);
                }
            );

        });

    },

    // Deletes a note from the database.
    deleteNote: function(noteId) {

        return new Promise((resolve, reject) => {

            this.readAll().then(
                noteList => {

                    // Filter out deleted note ID.
                    let newNoteList = noteList.filter(aNote => {
                        return aNote.id != noteId;
                    });
                
                    // Save back to json file.
                    fs.writeFile(dbFileName, JSON.stringify(newNoteList), err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });

                },
                err => {
                    reject(err);
                }
            );
        });

    }

};

module.exports = notesDb;