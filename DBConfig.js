// require npm
var mysql = require('mysql');

// connect database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

module.exports = connection;

