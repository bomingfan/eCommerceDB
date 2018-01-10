// require npm and DBConfig

var inquirer = require('inquirer');
var connection = require('./DBConfig.js');


// connect sql server run functions and then end connection
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    queryAll();
    start();
});


// function prompt user to buy w/ two questions
function start() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    inquirer.prompt([
        {
            type: "input",
            name: "buy",
            message: "What would you like to buy? Please type an ID number.",
            validate: function(value) {
                if (isNaN(value) === false && value >= 1 && value <= res.length){
                  return true;
                }
                console.log("\nInvalid Entry! Please enter an ID number between " + res[0].id + " and " + res[res.length-1].id + ".");
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
                console.log("\nInvalid Entry! Please enter a number.");
                return false;
              }
        }
    ]).then(function(ans){
        if (ans.quantity < res[ans.buy-1].stock_quantity) {
           buy(ans.buy, ans.quantity);
           setTimeout(buyAgain, 1000);
        } else {
            console.log("Insufficient quantity! We only have " + res[ans.buy-1].stock_quantity + " left.");
            buyAgain();
        }        
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

// function update the stock_quantity
function buy(id, quantity) {
    var query = "UPDATE products SET stock_quantity = stock_quantity - " + quantity + " where id = " + id;
    connection.query(query, function (err) {
      if (err) throw err;
    });
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("Thank you for your order of " + quantity + " $" + res[id-1].denomination + " " + res[id-1].product_name);
        console.log("Your total is $" + (res[id-1].price*quantity).toFixed(2) + ".");
        console.log("We have " + res[id-1].stock_quantity + " left in stock.");
    })
}

// function to ask user if they want to try again
function buyAgain() {
    inquirer.prompt([
        {
            name: "again",
            type: "confirm",
            message: "Would you like to try to buy again?"
        }
    ]).then(function(ans){
        if (ans.again) {
            start();
        } else {
            console.log("Sorry to see you go. Comeback whenever you want!")
            connection.end();
        }

    });
}