'use strict';

require('dotenv').config();

// Application Dependencies
const express = require('express');
const methodOverride = require('./middleware/methodOverride.js');
const router = require('./routes.js');
const handleError = require('./middleware/errors/handleError.js');

// Application Setup
const app = express();

// Application Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride);


// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.use(router);
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.use(handleError);


module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Listening on port: ${port}`)),
};
