# eCommerceDB

Before running the app please install npm packages by running `npm install` in the command line.

If 'package.json' is not fetched, run the following command:

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

When putting in ID, an invalid character or a number out of the range of ID will return invalid. When the buying volume is more than the stock quantity, it will return insufficient stock and prompt user to buy again.

![alt text](https://github.com/bomingfan/eCommerceDB/blob/master/images/customer-validation.gif)

## bamazonManager.js
#### Command:
```
node bamazonManager.js
``` 
Gives manager four choices.



