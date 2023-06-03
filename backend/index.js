const path = require('path');
const express = require('express');
const app = express();

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
app.get('/:filename', (req, res) => {
    handleFile(req, res, '../frontend/hackpnw-2023/src');
});

app.get("/", (req, res) => {
    const options = {
        root: path.join('../frontend/hackpnw-2023/public/')
    };
    res.sendFile('index.html', options, (err) => {
        if (err) {
            console.log("FILE SENDING ERROR: " + err);
        }
    });
});


app.listen(3000, () => {
    console.log("Deploying HACKPNW application server on port 3000...");
});