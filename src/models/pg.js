'use strict';

const client = require('../../index.js');

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

  getBookshelves() {
    let SQL = 'SELECT DISTINCT id, name FROM bookshelves ORDER BY name;';
    return this.client.query(SQL);
  }

  put(values){
    let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
    return this.client.query(SQL, values);
  }

}

class Books extends Pg{}

module.exports = new Books(client);