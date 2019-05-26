'use strict';

const booksSchema = require('./books-schema.js.js');

class Books{
  constructor(data){
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.image_url = data.image_url;
    this.bookshelf = data.bookshelf;
  }
}


/*

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

 */
module.exports = Books;