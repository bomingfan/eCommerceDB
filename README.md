# eCommerceDB

Before running the app: 
1. install npm packages by running `npm install` in the command line.
1. add your mysql database password in the file `DBConfig.js`.
1. run DB.sql in mysql to create the Datebase.

If `package.json` is not fetched, run the following command:

```
npm install mysql inquirer
```

This e-business management system features two node applications. `bamazonCustomer.js` and `bamazonManager.js`

## bamazonCustomer.js
### Command: 
```
node bamazonCustomer.js
``` 
The products' list will show and customer will be prompt to purchase an item by ID and quantity. Customer can choose to continue buying or to leave.

![alt text](https://github.com/bomingfan/eCommerceDB/blob/master/images/customer.gif)

### Validation:

When putting an invalid character or a number out of the range of ID, the program will return invalid. When the buying volume is more than the stock quantity, it will return insufficient stock and prompt user to buy again.

![alt text](https://github.com/bomingfan/eCommerceDB/blob/master/images/customer-validation.gif)

## bamazonManager.js
#### Command:
```
node bamazonManager.js
``` 
Gives manager four choices. 

* `View Products for Sale`
* `View Low Inventory`
* `Add to Inventory`
* `Add New Product`

`View Products for Sale` will show the current stock.
`View Low Inventory` will show the stock item with a quantity of less than 5.

![alt text](https://github.com/bomingfan/eCommerceDB/blob/master/images/manager-12.gif)

`Add to Inventory` will direct manager to add inventory to an existing product.
`Add New Product` will direct manager to add a new product to the database. 

![alt text](https://github.com/bomingfan/eCommerceDB/blob/master/images/manager-34.gif)




