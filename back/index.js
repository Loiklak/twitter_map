const express = require('express');
const { poll } = require("./shortPolling/poll")

const app = express();

//Shortpolling vers l'API Twitter toutes les deux secondes
setInterval(poll, 2002);

server = app.listen(5000, () => {
    console.log('Server is on !')
});