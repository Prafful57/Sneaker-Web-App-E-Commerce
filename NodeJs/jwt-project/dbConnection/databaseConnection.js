var mysql = require("mysql2");
var database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Prafful77",
});

database.connect(function (err) {
  if (err) throw err;
  console.log("DB CONNECTION SUCCESSFUL");
});

module.exports = database;