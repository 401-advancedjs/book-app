'use strict';

const handleError = require('../middleware/errors/handleError.js');

function createBook(request, response, next) {
  console.log(request.body.bookshelf);
  request.selectedModel.createShelf(request.body.bookshelf)
    .then(id => {
      let { title, author, isbn, image_url, description } = request.body;
      let values = [title, author, isbn, image_url, description, id];

      request.selectedModel.post(values)
        .then(result => response.redirect(`/books/${result.rows[0].id}`))
        .catch(err => handleError(err, response));
    });
}

module.exports = createBook;