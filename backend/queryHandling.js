const path = require('path');

var defaultEntry = { 
    "description"  : "Sample description.",
    "title" : "Puget Sound Litter",
    "severity" : "0",
    "date-reported" : new Date(),
    "location" : "Location.",
    "lat-long": "47.6062$-122.3321",
    "demand" : "0",
    "author" : "Berk",
    "background-color" : "#00ffff",
    "photo-url" : "https://st4.depositphotos.com/3936111/22462/i/600/depositphotos_224622178-stock-photo-piles-garbage-streets-due-fulls.jpg",
    "tags" : "pollution,pugetsound,help",
    "partOfDB" : "true"
};

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

// Using a raw query from the client, splice up the request, parse it, and return as a query object.
function constructQueryObject (rawQuery) {
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
    console.log("Stringified query: " + stringifiedQuery);
    queryObject = JSON.parse(stringifiedQuery);

    return queryObject;
}

// Fill all fields that are not in the queryObject (to be INSERTED) to make sure nothing is incomplete.
function populateAllKeyFields (queryObject) {
    let allKeys = Object.keys(defaultEntry);
    allKeys.forEach(item => {
        if (!queryObject.hasOwnProperty(item)) {
            queryObject[item] = defaultEntry[item];
        }
    });

    return queryObject;
}

module.exports = { populateAllKeyFields, constructQueryObject, handleFile, defaultEntry };

/*var pollutionDatabase = TAFFY([
    { 
        "description"  : "VERY SEVERE TRASH IN SEATTLE.",
        "severity"  : "5",
        "date-reported" : new Date(),
        "location" : "Seattle",
        "demand" : "HIGH",
        "author" : "Berk",
        "background-color" : "#00ffff",
        "photo-url" : "https://37e7-63-208-141-34.ngrok-free.app/img/trash1.jpg",
        "tags" : "Pollution",
        "partOfDB" : "true"
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
        "tags" : "Pollution",
        "partOfDB" : "true"
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
        "tags" : "Pollution",
        "partOfDB" : "true"
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
        "tags" : "Pollution",
        "partOfDB" : "true"
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
        "tags" : "Pollution",
        "partOfDB" : "true"
    },
]);*/