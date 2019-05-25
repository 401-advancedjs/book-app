'use strict';

const express = require('express');
const router = express.Router();

const getBooks = require('./lib/getBooks.js');
const createSearch = require('./lib/createSearch.js');
const newSearch = require('./lib/newSearch.js');
const getBook = require('./lib/getBook.js');
const createBook = require('./lib/createBook.js');
const updateBook = require('./lib/updateBook.js');
const deleteBook = require('./lib/deleteBook.js');

 
router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);


module.exports = router;