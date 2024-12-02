const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

// הגדרת בסיס הנתונים
db.serialize(() => {
    db.run("CREATE TABLE registrations (username TEXT, carNumber TEXT)");
});

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, carNumber } = req.body;
    db.run("INSERT INTO registrations (username, carNumber) VALUES (?, ?)", [username, carNumber], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send("נרשמת בהצלחה!");
    });
});

app.get('/registrations', (req, res) => {
    db.all("SELECT * FROM registrations", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
