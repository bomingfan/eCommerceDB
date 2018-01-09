// require npm
var mysql = require('mysql');
var inquirer = require('inquirer');

// connect database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "19831030",
    database: "bamazon"
});

// connect sql server run functions and then end connection
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startS();
});

