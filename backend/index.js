const path = require('path');
const express = require('express');
const fs = require('fs')
const app = express();
const queryHandler = require('./queryHandling');
const { raw } = require('body-parser');
const cors = require('cors');

TAFFY = require('taffy');

/*
    VARIABLES:
    Description: description
    severity: How (dangerously) impactful the pollution or situation is
    date-reported: the date at which the pollution was reported
    location: duh
    demand: how many people are interested
    photo-url:
    tags: 
*/

// Severity is on a scale of 1-5
var pollutionDatabase = TAFFY(JSON.parse(fs.readFileSync('db.json')));


// ___id
// Save all TAFFY DB data to local db file
function saveDatabaseToServer () {
    let queryObject = queryHandler.constructQueryObject("partOfDB=true");

    // Compile all pollution data into a large array, serve as a large object
    let pollution = pollutionDatabase(queryObject);
    let bulkArray = [];
    pollution.each(item => {
        bulkArray.push(item);
    });

    fs.writeFile('./db.json', JSON.stringify(bulkArray), function (err) {
        if (err) throw err;
        console.log('Saved!');
    }); 
}

// Handle database querying from here
app.get('/getentries/:query', (req, res) => {
    let rawQuery = req.params.query;
    let queryObject = queryHandler.constructQueryObject(rawQuery);

    // Compile all pollution data into a large array, serve as a large object
    let pollution = pollutionDatabase(queryObject);
    let bulkArray = [];
    pollution.each(item => {
        bulkArray.push(item);
    });

    // Send out in bulk
    res.write(JSON.stringify(bulkArray));
    saveDatabaseToServer();
    res.end();
});

// Handle insertion / data setting requests from the server
app.get('/insertdb/:query', (req, res) => {
    let rawQuery = req.params.query;
    let queryObject = queryHandler.constructQueryObject(rawQuery);

    queryObject = queryHandler.populateAllKeyFields(queryObject);
    pollutionDatabase.insert(queryObject);
    saveDatabaseToServer();
    res.end();
});

// SELECTION is the filtering, GETTING is the actual data you want and shit
app.get('/selectdb/:key/:selectionquery', (req, res) => {
    let rawSelectionQuery = req.params.selectionquery;

    //let getObject = queryHandler.constructQueryObject(rawGetQuery);
    let getKey = req.params.key;
    let selectObject = queryHandler.constructQueryObject(rawSelectionQuery);

    // Compile all pollution data into a large array, serve as a large object
    let pollution = pollutionDatabase(selectObject);
    let bulkArray = pollution.select(getKey);

    // Send out in bulk
    res.write(JSON.stringify(bulkArray));
    saveDatabaseToServer();
    res.end();

});

// SELECTION is the filtering, SETTING is the variables you want to set!
app.get('/updatedb/:setquery/:selectionquery', (req, res) => {
    let rawSetQuery = req.params.setquery;
    let rawSelectionQuery = req.params.selectionquery;

    let setObject = queryHandler.constructQueryObject(rawSetQuery);
    let selectObject = queryHandler.constructQueryObject(rawSelectionQuery);

    // Compile all pollution data into a large array, serve as a large object
    let pollution = pollutionDatabase(selectObject);
    pollution.update(setObject);
    saveDatabaseToServer();
    res.end();
});

// Route server app to images
app.get('/img/:filename', (req, res) => {
    queryHandler.handleFile(req, res, "./img/");
});

app.use(cors());

app.listen(3000, () => {
    console.log("Deploying HACKPNW application server on port 3000...");
});