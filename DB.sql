DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  denomination DECIMAL(10,2),
  price DECIMAL(10,2),
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, denomination, price, stock_quantity)
VALUES  ("iTunes Gift Card", "Apple", 10, 10.99, 10), 
        ("iTunes Gift Card", "Apple", 15, 15.99, 20),
        ("iTunes Gift Card", "Apple", 25, 25.99, 30), 
        ("iTunes Gift Card", "Apple", 50, 50.99, 40),
        ("iTunes Gift Card", "Apple", 100, 100.99, 50), 
        ("Google Play Gift Card", "Google", 10, 11.99, 60),
        ("Google Play Gift Card", "Google", 25, 27.99, 70), 
        ("Google Play Gift Card", "Google", 50, 53.99, 80),
        ("LOL Game Card", "Riot", 10, 11.99, 90), 
        ("LOL Game Card", "Riot", 25, 26.99, 100),
        ("XBOX Gift Card", "Microsoft", 15, 14.99, 110), 
        ("XBOX Gift Card", "Microsoft", 50, 49.99, 120);


CREATE TABLE departments (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30),
  over_head_costs DECIMAL(10,2),
  PRIMARY KEY (dept_id)
);

