'use strict';

// const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');

function updateBook(request, response, next) {
  let { title, author, isbn, image_url, description, bookshelf_id } = request.body;
  let values = [title, author, isbn, image_url, description, bookshelf_id, request.params.id];

  request.selectedModel.put(values)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(err => handleError(err, response));
}

module.exports = updateBook;