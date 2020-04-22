DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silence of Adam", "Learning", 15 , 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intro to Node", "Learning", 35 , 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("My SQL for Dummies", "Learning", 8 , 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone case", "Electronics", 8 , 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 70 , 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba", "Electronics", 200 , 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catan", "Board Games", 40 , 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Parcheesi", "Board Games", 30 , 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Secret Hitler", "Board Games", 25 , 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scrabble", "Board Games", 20 , 20);

SELECT*FROM products;