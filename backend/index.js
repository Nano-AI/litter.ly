const path = require('path');
const express = require('express');
const app = express();
const queryHandler = require('./queryHandling');
const { raw } = require('body-parser');
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
var pollutionDatabase = TAFFY([
    { 
        "description"  : "VERY SEVERE TRASH IN SEATTLE.",
        "severity"  : "5",
        "date-reported" : new Date(),
        "location" : "Seattle",
        "demand" : "HIGH",
        "author" : "Berk",
        "background-color" : "#00ffff",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash1.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "BUNCH OF GARBAGE IN SEATTLE.",
        "severity"  : "5",
        "date-reported" : new Date(),
        "location" : "Seattle",
        "demand" : "HIGH",
        "author" : "Berk",
        "background-color" : "#00ffff",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash2.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "CLEANUP ON AISLE 5 IN SANFRANCISCO.",
        "severity"  : "5",
        "date-reported" : new Date(),
        "location" : "SanFrancisco",
        "demand" : "HIGH",
        "author" : "Berk",
        "background-color" : "#00ffff",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash3.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "TERRIBLE WASTE IN ISSAQUAH.",
        "severity"  : "3",
        "date-reported" : new Date(),
        "location" : "Issaquah",
        "demand" : "HIGH",
        "author" : "Berk",
        "background-color" : "#00ffff",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash4.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "EVEN MORE TRASH IN SAN FRANCISCO.",
        "severity"  : "4",
        "date-reported" : new Date(),
        "location" : "SanFrancisco",
        "demand" : "HIGH",
        "author" : "Berk",
        "background-color" : "#00ffff",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash5.jpg",
        "tags" : "Pollution"
    },
]);

// ___id

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

    res.end();
});

// Handle insertion / data setting requests from the server
app.get('/insertdb/:query', (req, res) => {
    let rawQuery = req.params.query;
    let queryObject = queryHandler.constructQueryObject(rawQuery);

    queryObject = queryHandler.populateAllKeyFields(queryObject);
    pollutionDatabase.insert(queryObject);

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
    res.end();
});

// Route server app to images
app.get('/img/:filename', (req, res) => {
    queryHandler.handleFile(req, res, "./img/");
});


app.listen(3000, () => {
    console.log("Deploying HACKPNW application server on port 3000...");
});