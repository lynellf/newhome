const express = require('express'),
    api = express(),
    dbRouter = require('./dbConfig/index'),
    apiPort = 3001;


api.listen( apiPort, () => console.log(`The API is listening on port ${apiPort}`));