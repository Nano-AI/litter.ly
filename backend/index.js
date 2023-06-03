const path = require('path');
const express = require('express');
const app = express();

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
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash1.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "BUNCH OF GARBAGE IN SEATTLE.",
        "severity"  : "5",
        "date-reported" : new Date(),
        "location" : "Seattle",
        "demand" : "HIGH",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash2.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "CLEANUP ON AISLE 5 IN SANFRANCISCO.",
        "severity"  : "5",
        "date-reported" : new Date(),
        "location" : "SanFrancisco",
        "demand" : "HIGH",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash3.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "TERRIBLE WASTE IN ISSAQUAH.",
        "severity"  : "3",
        "date-reported" : new Date(),
        "location" : "Issaquah",
        "demand" : "HIGH",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash4.jpg",
        "tags" : "Pollution"
    },
    { 
        "description"  : "EVEN MORE TRASH IN SAN FRANCISCO.",
        "severity"  : "4",
        "date-reported" : new Date(),
        "location" : "SanFrancisco",
        "demand" : "HIGH",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash5.jpg",
        "tags" : "Pollution"
    },
]);

// Join provided path directory with the path variable, send the file to client
function handleFile (req, res, pathDir) {
    let name = req.params.filename;
    const options = {
        root: path.join(pathDir)
    };

    // If it's a verifiable file name, try sending the file
    if (name.includes(".")) {
        res.sendFile(name, options, (err) => {
            if (err) {
                console.log("FILE SENDING ERROR: " + err);
            }
        });
    }

    // Otherwise send a 404
    else {
        res.end("404 NOT FOUND");
    }
} 

// Only handle files from designated folders 
app.get('/pingdb/:query', (req, res) => {
    let rawQuery = req.params.query;
    let splitQueries = rawQuery.split(';');
    let queryObject = {};
    let stringifiedQuery = "{";
    let querySize = splitQueries.length;

    for (let n = 0; n < querySize; n++) {
        // Get current item
        let item = splitQueries[n];
        
        console.log("Item: "+item);
        let qSplit = item.split('=');
        // Split into key and fields
        let key = qSplit[0].toString();
        let field = qSplit[1].toString();

        console.log("Key: " + key + " Field: " + field);
        
        stringifiedQuery += `"${key}" : "${field}"`;    
        // Last variable
        if (n == querySize-1) {
            stringifiedQuery += '}';
        }  
        else stringifiedQuery += ',';
    }
    // Debug
    console.log(stringifiedQuery);
    queryObject = JSON.parse(stringifiedQuery);

    // Compile all pollution data into a large array, serve as a large object
    let pollution = pollutionDatabase(queryObject);
    let bulkArray = [];
    pollution.each(item => {
        bulkArray.push(item);
    });
    res.write(JSON.stringify(bulkArray));

    res.end();
});

app.get('/img/:filename', (req, res) => {
    handleFile(req, res, "./img/");
});


app.listen(3000, () => {
    console.log("Deploying HACKPNW application server on port 3000...");
});