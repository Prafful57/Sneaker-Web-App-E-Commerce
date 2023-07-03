//importing express
var express = require("express");

//importing bcrypt
const bcrypt = require("bcrypt");
var router = express.Router();
const database=require("../dbConnection/databaseConnection");

// var mysql = require("mysql2");
// //setting the connection with db
// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "@Prafful77",
// });
// //to check weather the db is connected or not
// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


//post api
router.post("/", (req, res) => {
    //Object value direct assign to variable
  const { name, email, password, password_confirm } = req.body;
  //query to get particular data, we are writing query with value and getting out put in error and result
  database.query(
    "SELECT email FROM db_practice.users WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        return res.send({
          message: "This email is already in use",
        });
      } else if (password !== password_confirm) {
        return res.send({
          message: "Passwords do not match!",
        });
      }



      
      //bcrypt the password & hash is the inbuilt function
      //Bcrypt is a password hashing algorithm designed by Niels Provos and David Mazières based on the Blowfish cipher
      //Hash turns your password (or any other piece of data) into a short string of letters and/or numbers using an encryption algorithm
      let hashedPassword = await bcrypt.hash(password, 8);
     //query to insert the data
     database.query(
        "INSERT INTO db_practice.users SET?",
        { name: name, email: email, password: hashedPassword },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            return res.send({
              message: "User registered!",
            });
          }
        }
      );
    }
  );
});

module.exports = router;
