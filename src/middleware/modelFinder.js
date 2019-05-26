'use strict';

function modelFinder(req, res, next){
  const activeDB = process.env.ACTIVE_DB;
  req.selectedModel = require(`../models/${activeDB}.js`);
  next();
}

module.exports = modelFinder;