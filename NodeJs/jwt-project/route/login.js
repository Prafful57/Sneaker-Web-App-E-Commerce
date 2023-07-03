
//enable to read client request and map to route
const express = require("express");
const router = express.Router();
//importing jwt
const jwt = require("jsonwebtoken");
const database=require("../dbConnection/databaseConnection");


// var mysql = require("mysql2");
// //establishing the connecting with db
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "@Prafful77",
// });


//after connection with db we are calling login api
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
  let token;

  //router.post will registering route to express
  router.post("/login", async (req, res) => {
    //through query we are getting particular data 
    database.query("SELECT * FROM db_practice.users", function (err, result) {

      const { email, password } = req.body;

      //it email and password is not there this will execute
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }   
      //we are iterating the data using loop
      result.forEach((element) => {
        token='';
        // Our login logic starts here
        try {
          // Get user input
          console.log(element.email, element.password, element.name);
          // Validate user input
          if (element.email === email && element.password === password) {
            // Create token
              token = jwt.sign(
                //we are passing three values value key and expiry time
              { user_id: result.email },
              process.env.TOKEN,
              {
                expiresIn: "1m",
              }
            );
            refreshToken = jwt.sign(
              { user_id: result.email },
              process.env.REFRESH_TOKEN,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            const data = { token: token , refreshToken:refreshToken};
            // user
           return res.status(200).json(data);
          }
        } catch (err) {
          console.log(err);
        }
      });
     try{
      if(!(token)){
        res.status(400).send("Input field is wrong");
      }
     } catch (err) {
      console.log(err);
    }
    });
  });


//generating ne token by passing the refresh token in the body and decoding
router.post('/token',(req,res)=>{
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  try{
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const token = jwt.sign(
      {user_id: decoded.user_id},
      process.env.TOKEN,
      {
        expiresIn: "1m",
      });
      
      return res.status(200).send({
        token:token
      });
      
  }catch(err){
    console.log(err);
  }
});
module.exports = router;
