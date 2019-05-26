'use strict';

const client = require('../../index.js');
// const handleError = require('../middleware/errors/handleError.js');

class Pg{
  constructor(client){
    this.client = client;
  }

  get(id){
    if(id){
      let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      return this.client.query(SQL, id);
    }else{
      let SQL = 'SELECT * FROM books;';
      return this.client.query(SQL);
    }
  }

  post(values){
    let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
    return this.client.query(SQL, values);
  }
  // createBook(request, response) {
  //   console.log(request.body.bookshelf);
  //   createShelf(request.body.bookshelf)
  //     .then(id => {
  //       let { title, author, isbn, image_url, description } = request.body;
  //       let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
  //       let values = [title, author, isbn, image_url, description, id];

  //       client.query(SQL, values)
  //         .then(result => response.redirect(`/books/${result.rows[0].id}`))
  //         .catch(err => handleError(err, response));
  //     });

  // }

  createShelf(shelf) {
    let normalizedShelf = shelf.toLowerCase();
    let SQL1 = `SELECT id from bookshelves where name=$1;`;
    let values1 = [normalizedShelf];

    return this.client.query(SQL1, values1)
      .then(results => {
        if (results.rowCount) {
          return results.rows[0].id;
        } else {
          let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
          let insertValues = [shelf];

          return this.client.query(INSERT, insertValues)
            .then(results => {
              return results.rows[0].id;
            });
        }
      });
  }

  delete(id) {
    let SQL = 'DELETE FROM books WHERE id=$1;';
    return this.client.query(SQL, id);
  }

  // getBook(request, response) {
  //   getBookshelves()
  //     .then(shelves => {

  //       let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
  //       let values = [request.params.id];
  //       client.query(SQL, values)
  //         .then(result => {
  //           console.log(shelves.rows);
  //           response.render('pages/books/show', { book: result.rows[0], bookshelves: shelves.rows });
  //         })
  //         .catch(err => handleError(err, response));
  //     });
  // }

  // getBooks(request, response) {
  //   let SQL = 'SELECT * FROM books;';

  //   return client.query(SQL)
  //     .then(results => {
  //       if (results.rows.rowCount === 0) {
  //         response.render('pages/searches/new');
  //       } else {
  //         response.render('pages/index', { books: results.rows });
  //       }
  //     })
  //     .catch(err => handleError(err, response));
  // }

  getBookshelves() {
  // let SQL = 'SELECT DISTINCT bookshelf FROM books ORDER BY bookshelf;';
    let SQL = 'SELECT DISTINCT id, name FROM bookshelves ORDER BY name;';
    return this.client.query(SQL);
  }

  put(values){
    let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
    return this.client.query(SQL, values);
  }
  // updateBook(request, response) {
  //   let { title, author, isbn, image_url, description, bookshelf_id } = request.body;
  //   // let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7;`;
  //   let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
  //   let values = [title, author, isbn, image_url, description, bookshelf_id, request.params.id];

  //   client.query(SQL, values)
  //     .then(response.redirect(`/books/${request.params.id}`))
  //     .catch(err => handleError(err, response));
  // }

}

class Books extends Pg{}

module.exports = new Books(client);