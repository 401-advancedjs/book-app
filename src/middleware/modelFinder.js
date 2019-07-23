'use strict';

function modelFinder(request, response, next){
  const activeDB = process.env.ACTIVE_DB;
  request.selectedModel = require(`../models/${activeDB}.js`);
  next();
}

module.exports = modelFinder;