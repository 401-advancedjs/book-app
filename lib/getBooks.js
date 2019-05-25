'use strict';

const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');


function getBooks(request, response) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
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