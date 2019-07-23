'use strict';

const bookSchema = require('./books-schema.js');
const bookshelvesSchema = require('./bookshelves-schema.js');

class Mongo{
  constructor(bookSchema, bookshelvesSchema){
    this.bookSchema = bookSchema;
    this.bookshelvesSchema = bookshelvesSchema;
  }

  get(id){
    if(id){
      let getBook = this.bookSchema.find(id).then(result => {
        result = {rows: [result], rowCount: [result].length};
        return new Promise(resolve => resolve(result));
      });
      let getShelf = this.bookshelvesSchema.find().then(result => {
        result = {rows: [result], rowCount: [result].length};
      });
      return Promise.all([getBook, getShelf]);
    }else{
      return this.bookSchema.find().then(result => {
        result = {rows: result, rowCount: result.length};
        return new Promise(resolve => resolve(result));
      });
    }
  }

  post(values){
    return this.bookSchema(values).save().then(result => {
      result = {rows: result, rowCount: result.length};
      return new Promise(resolve => resolve(result));
    });
  }
  
  //TODO: Finish refactoring this method
  createShelf(shelf) {
    // let normalizedShelf = shelf.toLowerCase();
    // let SQL1 = `SELECT id from bookshelves where name=$1;`;
    // let values1 = [normalizedShelf];
    return this.bookSchema.find(shelf.toLowerCase()).then(result => {
      if(result.length){
        result = {rows: result, rowCount: result.length};      
        return new Promise(resolve => resolve(result));
      }else{
        return this.bookSchema(shelf);
      }
    });
    // return client.query(SQL1, values1)
    //   .then(results => {
    //     if (results.rowCount) {
    //       return results.rows[0].id;
    //     } else {
    //       let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
    //       let insertValues = [shelf];
  
    //       return client.query(INSERT, insertValues)
    //         .then(results => {
    //           return results.rows[0].id;
    //         });
    //     }
    //   });
  }

  put(values){
    return this.bookSchema.findByIdAndUpdate(values[5], values, {new: true}).then(result => {
      result = {rows: [result], rowCount: [result].length};
      return new Promise(resolve => resolve(result));
    });
  }
  delete(id){
    return this.bookSchema.findByIdAndDelete(id).then(result => {
      result = {rows: result, rowCount: result.length};
      return new Promise(resolve => resolve(result));
    });
  }

  //TODO: Finish refactoring this method
  getBookshelves(){
  // // let SQL = 'SELECT DISTINCT bookshelf FROM books ORDER BY bookshelf;';
  // let SQL = 'SELECT DISTINCT id, name FROM bookshelves ORDER BY name;';
    return this.bookSchema.find();
  // return client.query(SQL);
  }
}

module.exports = new Mongo(bookSchema, bookshelvesSchema);