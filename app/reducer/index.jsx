var combineReducers = require('redux').combineReducers;
var getGonglueData = require('./gonglue.jsx');

const todoApp = combineReducers({
  getGonglueData
})

module.exports = todoApp;