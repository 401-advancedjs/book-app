'use strict';

const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');

function deleteBook(request, response) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

module.exports = deleteBook;