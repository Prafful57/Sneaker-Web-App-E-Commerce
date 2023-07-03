//importing the jsonwebtoken
const jwt = require("jsonwebtoken");

// process. env is a global variable injected at runtime by Node.js application to depict the 
//state of the environment your app is in at the time of initiation and utilize the same at runtime
//env mentioned varible should be initialized at compile or applicaiton start and it will be used 
//when ever it requires (where ever we want to use)
const config = process.env;

//we are verifying token here 
const verifyToken = (req, res, next) => {

  //here we are assigning the key value we are passing the token from query or from body
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"]; 

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    //we are decoding the token here we are passing the token and key
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;