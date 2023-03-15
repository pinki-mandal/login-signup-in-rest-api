const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "pinki",
    password: "Pinki@123",
  })
  .on("error", (err) => {
    console.log("Failed to connect ", err);
  });

module.exports = db_connection;