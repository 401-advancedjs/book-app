'use strict';

// const client = require('./pg');
const handleError = require('../middleware/errors/handleError.js');

function deleteBook(request, response, next) {
  let values = [request.params.id];

  return request.selectedModel.delete(values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

module.exports = deleteBook;