// Use the dotenv package, to create environment variables
require('dotenv').config()
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = process.env.PORT || 3000;
// Import express, and create a server
const express = require('express');
const app = express();
// Require morgan and body-parser middleware
const morgan = require('morgan');
// Have the server use morgan with setting 'dev'
app.use(morgan('dev'))
app.use(express.json())
// Import cors 
// Have the server use cors()
const cors = require('cors');
app.use(cors());

// Have the server use your api router with prefix '/api'
const apiRouter = require('./api');
app.use('/api', apiRouter);

// Import the client from your db/index.js
const { client } = require('./db');
// Create custom 404 handler that sets the status code to 404.
app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
})
// Create custom error handling that sets the status code to 500
// and returns the error as an object
app.use((err, req, res, next) => {
    res.status(500).send('Broken!')
})

// Start the server listening on port PORT
// On success, connect to the database
app.listen(PORT, () => {
    client.connect();
    console.log(`Server successfully started at https://localhost:${PORT}`)
})