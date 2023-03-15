var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pinki@123",
  database:"pinki"
});

con.connect(function(err) {
  console.log("Connected!");
  con.query("create database pinki", function (err) {
    if (err) {
    console.log("Database already exist");
  }else{
    console.log("Database created");
  }
  });
});


var sql = "create table users(id int (10)NOT NULL AUTO_INCREMENT,name varchar(50)COLLATE utf8mb4_unicode_ci NOT NULL,email VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,PRIMARY KEY (id),UNIQUE KEY email (email))ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
con.query(sql, function (err, result) {
  if (err) {
  console.log("table Already exist");
}
else{
  console.log("Table created");
}
})
