'use strict';

const createShelf = require('./createShelf.js');
const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');


function createBook(request, response) {
  console.log(request.body.bookshelf);
  createShelf(request.body.bookshelf)
    .then(id => {
      let { title, author, isbn, image_url, description } = request.body;
      let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
      let values = [title, author, isbn, image_url, description, id];

      client.query(SQL, values)
        .then(result => response.redirect(`/books/${result.rows[0].id}`))
        .catch(err => handleError(err, response));
    });

}

module.exports = createBook;