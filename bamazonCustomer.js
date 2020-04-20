var mysql = require("mysql");
// var inquirer = require("inquirer");

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
  console.log("connected as id " + connection.threadId);
  queryAllProducts();  
  // queryLearningProducts();
});

function queryAllProducts(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++) {
      console.log("\nProduct ID: " +res[i].item_id + " | Title: " +res[i].product_name + " | Category: " +res[i].department_name + " | Price: $"+res[i].price+ " | Quantity: " +res[i].stock_quantity + "\n");
    }
    console.log("\n");
  });
  // console.log(query.sql);
  connection.end();
}

  