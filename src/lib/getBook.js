'use strict';

// const getBookshelves = require('./getBookshelves.js');
// const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');

function getBook(request, response, next) {
  request.selectedModel.getBookshelves()
    .then(shelves => {

      let values = [request.params.id];
      request.selectedModel.get(values)
        .then(result => {
          console.log(shelves.rows);
          response.render('pages/books/show', { book: result.rows[0], bookshelves: shelves.rows });
        })
        .catch(err => handleError(err, response));
    });
}

module.exports = getBook;