'use strict';

require('dotenv').config();

const currentDB = process.env.ACTIVE_DB;

switch (currentDB){
case 'mongo': {
  console.log('using mongoDB');
  const mongoose = require('mongoose');
      
  const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
  };
      
  mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
}
  break;
default: {
  console.log('using postgres');
  const pg = require('pg');
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.on('error', err => console.error(err));
  module.exports = client;
  break;
}     
}

require('./src/server.js').start(process.env.PORT);