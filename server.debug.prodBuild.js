// Install express server - https://medium.com/@shubhsharma10/how-to-deploy-angular-6-app-to-heroku-52b73ac7a3aa
// This file is to serve a prod build locally for testing purposes

const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
// just changing the path to point to the dist folder
var currentDirectory = path.resolve(process.cwd(), '.');
var fullPathToFolder = currentDirectory + '\\dist\\FileHub'; // todo: now it only works in linux. wrap urls for to make it work for POSIX systems also later
var fullPathToIndexFile = currentDirectory + '\\dist\\FileHub\\index.html';
console.log(`INFO - current fullpath: ${currentDirectory}`);

app.use(express.static(fullPathToFolder));

app.get('/*', function(req, res){
    console.log(`INFO - fullpath to index.html: ${fullPathToIndexFile}`);
    res.sendFile(path.join(fullPathToIndexFile));
});

// Start the app by listening on the default Heroku port
const port = 3001
var server = app.listen(process.env.PORT || port, function (){
    console.log("Listening on port %s...", server.address().port);
})
        