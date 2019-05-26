'use strict';

const mongoose = require('mongoose');

const books = mongoose.Schema({
  id: {type: String, required: true},
  title: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  isbn: {type: String, required: true},
  image_url: {type: String, required: true},
  // bookshelf: {type: String, required: true},
});

module.exports = mongoose.model('books', books);