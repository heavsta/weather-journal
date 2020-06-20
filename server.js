// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening () {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}


// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get ('/allData', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

const data = [];

// Post Route
app.post('/addData', (req, res) => {
    console.log(req.body);
    const newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});