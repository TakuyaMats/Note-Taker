const dataBase = require('../db/db.json');
const fs = require('fs');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(dataBase));

    app.post('/api/notes', (req, res) => {
        fs.readFile(`${__dirname}/notes.html`, (err, data) => {
            if (err) throw err;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

        return res.json(false)
    });

    app.delete('/api/notes/:id', (req, res) => {
        const noteId = JSON.parse(req.params.id)
        console.log(noteId)
        fs.unlink(`${__dirname}/notes.html`, (err, notes) => {
            if (err) throw err;

            notes = JSON.parse(notes);
            notes = notes.filter(value => value.id !== noteId)
        
            fs.writeFile(`${__dirname}/notes.html`, JSON.stringify(notes), (err, data) => {
                if (err) throw err;
                res.json(notes)
            })
        })
    })
};


