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
    // console.log("connected as id " + connection.threadId);
    queryAll();
    userBuy();
    connection.end();
});


// function prompt user to buy w/ two questions
function userBuy() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    inquirer.prompt([
        {
            type: "input",
            name: "buy",
            message: "What would you like to buy? Please type an ID number.",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("\nInvalid Entry!");
                return false;
              }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many do you want?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("\nInvalid Entry!");
                return false;
              }
        }
    ]).then(function(ans){
        
        console.log(res[ans.buy].stock_quantity);
    });
});
}

// Console log the whole table
function queryAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id +
                " | Name: " + res[i].product_name +
                " | Denomination: " + res[i].denomination +
                " | Price: " + res[i].price +
                " | Quantity: " + res[i].stock_quantity);
        }
        console.log("----------------------------------------------------------------------");
    });
}

// 