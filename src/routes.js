'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('./middleware/modelFinder.js');
const createSearch = require('./lib/createSearch.js');
const newSearch = require('./lib/newSearch.js');
const getBooks = require('./lib/getBooks.js');
const getBook = require('./lib/getBook.js');
const createBook = require('./lib/createBook.js');
const updateBook = require('./lib/updateBook.js');
const deleteBook = require('./lib/deleteBook.js');

router.use(modelFinder);

router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

router.get('/', );

module.exports = router;
