// require npm and DBConfig

var inquirer = require('inquirer');
var connection = require('./DBConfig.js');

// connect sql server run functions and then end connection
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startS();
});

