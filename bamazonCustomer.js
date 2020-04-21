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
    database: "bamazon_db"
  });

//  
connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  inventory();  
});

function inventory(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++) {
      console.log("\Item ID: " +res[i].item_id + " | Product Name: " +res[i].product_name + " | Department: " +res[i].department_name + " | Price: $"+res[i].price + " | Quantity: " +res[i].stock_quantity + "\n");
    }
    console.log("\n");
  });
  // connection.end();
  productInfo();
}

function productInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "product",
      message: "What is the item ID of the product you are wanting to buy?",
      filter: Number
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to buy?",
      filter: Number
    }
  ]).then(function(answers) {
    connection.query("SELECT * FROM products WHERE ?", {item_id: item2}, function(err, response){
      if (err) throw err;

      if(response.length === 0) {
        console.log("Error: Please select a valid ID from the Products list above.");
        inventory();
      }
      else {

      }
    })
    var 
  })
}


// // inquirer prompt asking if user wants to keep shopping. yes = inventory ; no = end connection
// function keepShopping(){
//   inquirer.prompt([
//     {
//       type: "confirm",
//       message: "Would you like to keep shopping?",
//       name: "confirm"
//     }
//   ]).then(function(res) {
//     if (res.confirm) {
//       console.log("------------------------------");
//       inventory();
//     }
//     else {
//       console.log("Thanks for shopping Bamazon!");
//       connection.end();
//     }
//   });
// }

  