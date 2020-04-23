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
VALUES ("Carcassonne", "Board Games", 29 , 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clue", "Board Games", 35 , 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly Batman Edition", "Board Games", 250 , 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pandemic", "Board Games", 40 , 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Villainous", "Board Games", 35 , 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fun Employed", "Board Games", 32.50 , 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Settlers of Catan", "Board Games", 40 , 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Parcheesi", "Board Games", 30 , 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Secret Hitler", "Board Games", 25 , 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scrabble", "Board Games", 20 , 20);

SELECT*FROM products;