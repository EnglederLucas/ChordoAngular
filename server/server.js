const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const session = require('express-session');

    /*"ultimate-guitar-scraper": "1.1.1"*/


const app = express();

app.use(bodyParser.json());
app.use(cors());
//app.use(session({secret: "Shh, its a secret!"}));

const chords = require('./routes/api/chordRequests.js');

app.use('/api/', chords);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

