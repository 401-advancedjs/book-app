'use strict';

// const client = require('../models/pg');
const handleError = require('../middleware/errors/handleError.js');


function getBooks(request, response, next) {
  return request.selectedModel.get()
    .then(results => {
      if (results.rows.rowCount === 0) {
        response.render('pages/searches/new');
      } else {
        response.render('pages/index', { books: results.rows });
      }
    })
    .catch(err => handleError(err, response));
}

module.exports = getBooks;