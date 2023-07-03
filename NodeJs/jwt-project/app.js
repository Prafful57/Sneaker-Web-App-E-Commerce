require("dotenv").config();
//importing the express with other modules
const express = require("express");
const login = require("./route/login");
const register = require("./route/register");
const auth = require("./middleware/auth");
const add_product=require("./landing-module/landing");
const get_product=require("./landing-module/landing");
const get_productId=require("./landing-module/landing");
const upload_image=require("./landing-module/landing");
const delete_product=require("./landing-module/landing");
const update_product=require("./landing-module/landing");
const addToCart=require("./landing-module/landing");

const app = express();

// app. use() method mounts or puts the specified middleware functions at the specified path
app.use(express.json());

// calling the apis 
app.use(express.static('uploads'))
app.use("/user",login);
app.use("/register",register);
app.use("/add",add_product);
app.use("/get",get_product);
app.use("/get",get_productId);
app.use("/upload",upload_image);
app.use("/delete",delete_product);
app.use("/update",update_product);
app.use("/addToCart",addToCart);

//in welcome we are passing authorization 
app.post("/welcome", auth, (req, res) => {
  console.log(auth);
  res.status(200).send("Welcome 🙌");
});

module.exports=app;
