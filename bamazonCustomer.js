var mysql = require("mysql");
var inquirer = require("inquirer");
// var console_table = require ("console.table");

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
  inquirer.prompt([
      {
        type: "input",
        name: "product",
        message: "Enter the Item ID of the product you would like to purchase: "
      },
      {
        type: "input",
        name: "quantity",
        message: "How many units would you like to purchase?"
      },
    ])
    .then(function (res) {
      // re-defining for ease of typing
      var item2 = res.product;
      var quantity2 = res.quantity;

      connection.query("SELECT * FROM products WHERE ?", {item_id: item2 }, function (err, response) {
        if (err) throw err;
        // invalid id num
        if (response.length === 0 ){
          console.log("\n\nI'm sorry, that was an invalid id. Please select an Item id from the product list above");
          console.log("----------------------------------------");
          inventory();
        }
        // valid id num
        else {

          // if the quantity of requested is in stock
          var productRes = response[0];

          if (quantity2 <= productRes.stock_quantity) {
            console.log("\nItem is in stock and order is being processed now");

            // updating inventory
            var updateInventory = "UPDATE products SET stock_quantity = " +(productRes.stock_quantity - quantity2)+ " WHERE item_id = " +item2;
            connection.query(updateInventory, function (err, data) {
              if (err) throw err;
              
              console.log('\nYour order has been placed! Your total is $' + productRes.price * quantity2);
              console.log("----------------------------------------");
              console.log('Thank you for shopping with us!');
              console.log("----------------------------------------");
              keepShopping();
          })
        }
          // if quantity is NOT in stock
          else {
            console.log("\nI apologize, the item you're wanting to purchase doesn't have sufficient quantity for your order.");
            console.log("----------------------------------------");
            console.log("Please adjust your order.");
            console.log("----------------------------------------");
            console.log("Your item was " +productRes.product_name+ " and it has " +productRes.stock_quantity+ " in stock.");
            inventory();
          }
      };
    });
  });
}


function inventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\nItem ID: " + res[i].item_id);
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
    if (res.confirm === "Yes") {
      console.log("----------------------------------------");
      inventory();
    }
    else {
      console.log("\nThanks for shopping Bamazon!");
      connection.end();
    }
  });
}
