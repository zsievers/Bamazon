var mysql = require("mysql");
var inquirer = require("inquirer");

// CREATE CONNECTION TO SQL DATABASE

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "dupree7637",
  database: "bamazon_db",
});

//
connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  inventory();
});

// inquirer prompts user input
function productInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "productItemId",
        message: "Enter the Item ID of the product you would like to purchase: "
      },
      {
        type: "input",
        name: "itemQuantity",
        message: "How many units would you like to purchase?"
      },
    ])
    .then(function (user) {
      connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // checking if product is in stock
        if (user.itemQuantity <= res[user.productItemId - 1].stock_quantity) {
          console.log("-------------------------------------------");
          console.log("Your order for " +res[user.productItemId - 1].product_name +" has been placed");
          console.log("-------------------------------------------");
          console.log("Total Cost: $" +user.itemQuantity * res[user.productItemId - 1].price);

          // updating database with new stock quantity
          connection.query("UPDATE products SET ? WHERE ?", 
            [
              {
                stock_quantity: res[user.productItemId -1].stock_quantity - user.itemQuantity
              },
              {
                item_id: user.productItemId
              }
            ],
            function(err) {
              if (err) throw err;
              console.log("-------------------------------------------");
              keepShopping();
            }
          )
        }
        else {
          console.log("Sorry.. the desired amount of that item is not in stock: Please enter new amount or search another prodcut");
          productInfo();
        }
      });
    });
}


function inventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id);
      console.log("Product Name: " + res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: $" + res[i].price);
      console.log("Number in stock: " + res[i].stock_quantity);
      console.log("----------------------------------------");
    }
    productInfo();
  });
}



// // inquirer prompt asking if user wants to keep shopping. yes = inventory ; no = end connection
function keepShopping(){
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to keep shopping?",
      name: "confirm",
      choices: ["Yes", "No"]
    }
  ]).then(function(res) {
    if (res.confirm) {
      console.log("------------------------------");
      inventory();
    }
    else {
      console.log("Thanks for shopping Bamazon!");
      connection.end();
    }
  });
}
