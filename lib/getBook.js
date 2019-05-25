'use strict';

const getBookshelves = require('./getBookshelves.js');
const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');

function getBook(request, response) {
  getBookshelves()
    .then(shelves => {

      let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      let values = [request.params.id];
      client.query(SQL, values)
        .then(result => {
          console.log(shelves.rows);
          response.render('pages/books/show', { book: result.rows[0], bookshelves: shelves.rows });
        })
        .catch(err => handleError(err, response));
    });
}

module.exports = getBook;