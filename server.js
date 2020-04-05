const express = require('express');
const fs = require ('fs');
const app = express();

app.use(express.static('public'))

//if unable to access desired port defaults to port 8080
var PORT = process.env.PORT || 8080

app.get('/', (req, res, next) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res, next) => {
    res.status(200).sendFile(__dirname + '/public/notes.html');
});
//pulls in previously save notes
app.get('/api/notes', (req, res, next) => {
    try {
        fs.readFile(__dirname + '/db/db.json', 'utf-8', (err, data) => {
            if (err) {
                throw Error(err);
            }

            const jsonData = JSON.parse(data);
            res.status(200).send(jsonData);
        })
    } catch (err) {
        console.error(err);
        res.status(404).send();
    }
});
//Post user inputed into api
app.post('/api/notes', (re,res,next) =>{
    // Parses through incomiing body 
    let body ='';
    req.on('data', data => {
        body += data.toString();
    }).on('end', () => {
        const newNotes = parse(body);

        if (Object.keys(newNotes).length !== 0) {
            fs.readFile(__dirname + '/db/db.json', 'utf-8', (err,data) => {
                if(err) {
                    throw err;
                }
                data = JSON.parse(data);
                //Sets up new notes id
                newNotes.id = data.length;
                data.push(newNotes);

                fs.writeFile(__dirname + '/db/db.json', JSON.stringify(data), err => {
                    if (err) throw err;
                    console.log('Success')
                    
                });
            });

        //Lets user know if new note wasnt saved
            res.send(newNote);
        } else {
            throw new Error('Something went wrong')
        }
    });
})

app.delete ('/api/notes/:id', (req, res, next) => {
    //Gets the id of the note being deleted
    const id = req.params.id;
    fs.resdFile(__dirname + '/db/db.json', 'utf-8', (err,notes) => {
        if (err) {
            throw err;
        }

        notes = JSON.parse(notes);
        //Loops through the notes in array to match the note that is being deleted
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === parseInt(id)) {
                //.splice method removes and items from the array
                notes.splice(i,1);
            }
        } 
        //Rewrites the updated notes array
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), err => {
            if (err) throw err;
            console.log('Success')
        });
    });
    res.send('Delted');
})

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))
