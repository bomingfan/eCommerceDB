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
    password: "",
    database: "bamazon"
});

// connect sql server run functions and then end connection
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // console.log("connected as id " + connection.threadId);
    startM();
});


function startM() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    queryAll();
                    break;

                case "View Low Inventory":
                    viewLow();
                    break;

                case "Add to Inventory":
                    addInv();
                    break;

                case "Add New Product":
                    addNew();
                    break;
            }
        });
}

// ask user if they want to do something else
function startAgain() {
    inquirer.prompt([
        {
            name: "again",
            type: "confirm",
            message: "Would you like to do something else?"
        }
    ]).then(function(ans){
        if (ans.again) {
            startM();
        } else {
            console.log("Good job! See you soon.")
            connection.end();
        }

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
    setTimeout(startAgain, 1000);
}

// list all items with an inventory count lower than five.
function viewLow() {
    connection.query("SELECT * FROM products where stock_quantity < 5", function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id +
                " | Name: " + res[i].product_name +
                " | Denomination: " + res[i].denomination +
                " | Price: " + res[i].price +
                " | Quantity: " + res[i].stock_quantity);
        }
        console.log("----------------------------------------------------------------------");
    });
    setTimeout(startAgain, 1000);
}


// display a prompt that will let the manager "add more" of any item currently in the store.
function addInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Which products' inventory would you like to add? Please type an ID number.",
                validate: function (value) {
                    if (isNaN(value) === false && value >= 1 && value <= res.length) {
                        return true;
                    }
                    console.log("\nInvalid Entry! Please enter an ID number between " + res[0].id + " and " + res[res.length - 1].id + ".");
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many do you want add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nInvalid Entry! Please enter a number.");
                    return false;
                }
            }
        ]).then(function (ans) {
            var query = "UPDATE products SET stock_quantity = stock_quantity + " + ans.quantity + " where id = " + ans.id;
            connection.query(query, function (err) {
                if (err) throw err;
                console.log("Inventory Updated");
            });
            connection.query("SELECT * FROM products", function (err, res) {
                console.log("We have " + res[ans.id - 1].stock_quantity + " of $" + res[ans.id - 1].denomination + " " + res[ans.id - 1].product_name + " in stock right now.");
            });
            setTimeout(startAgain, 1000);
        });
    });
    
}

// add a completely new product to the store.
function addNew() {
    inquirer.prompt([
        {
            name: "pName",
            type: "input",
            message: "What is the name of the product?"
        },
        {
            name: "dept",
            type: "input",
            message: "In which department?"
        },
        {
            name: "denom",
            type: "input",
            message: "In what denomination?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price?"
        },
        {
            name: "quantity",
            type: "input",
            message: "What is the quantity?"
        }
    ]).then(function (ans) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: ans.pName,
                department_name: ans.dept,
                denomination: ans.denom,
                price: ans.price,
                stock_quantity: ans.quantity
            },
            function (err) {
                if (err) throw err;
                console.log("Inventory Updated! Newly Inserted Record:");
                connection.query("SELECT * FROM products", function (err, res) {
                        console.log("id: " + res[res.length-1].id +
                            " | Name: " + res[res.length-1].product_name +
                            " | Denomination: " + res[res.length-1].denomination +
                            " | Price: " + res[res.length-1].price +
                            " | Quantity: " + res[res.length-1].stock_quantity);
                    console.log("----------------------------------------------------------------------");
                });
            });
            setTimeout(startAgain, 1000);
    });
    
}
