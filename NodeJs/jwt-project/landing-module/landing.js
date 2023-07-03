const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
router.use(express.json());
const database=require("../dbConnection/databaseConnection");

// var mysql = require("mysql2");
// var database = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "@Prafful77",
// });

// database.connect(function (err) {
//   if (err) throw err;
//   console.log("DB CONNECTION SUCCESSFUL");
// });

// router.post("/products", async (req, res) => {
//   const { product_name, product_price } = req.body;
//   database.query(
//     "INSERT INTO db_practice.products SET?",
//     { product_name: product_name, product_price: product_price },
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         return res.send({
//           message: "Product added Successfully!",
//         });
//       }
//       console.log(result);
//     }
//   );
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({ storage: storage });
router.post("/upload", upload.single("product_image"), async (req, res) => {
  const AddProduct = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_image: req.file.path,
    product_link: req.body.product_link,
  };
  database.query(
    "INSERT INTO db_practice.products (product_name,product_price,product_image,product_link) Values(?,?,?,?)",
    [
      AddProduct.product_name,
      AddProduct.product_price,
      AddProduct.product_image,
      AddProduct.product_link,
    ],
    function (err, result) {
      try {
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(404).send("unable to add the products data");
      }
    }
  );
});

router.post("/item/:id", upload.single("product_image"), async (req, res) => {
  let NewImage = '';
  if(req.file){
   NewImage = req.file.path
  }else{
    NewImage= req.body.product_image
  }
  const AddProduct = {
    product_id:req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_size: req.body.product_size,
    product_image: NewImage,
  };
  database.query(
    "INSERT INTO db_practice.cart_items (product_id,product_name,product_price,product_image,product_size) Values(?,?,?,?,?)",
    [
      AddProduct.product_id,
      AddProduct.product_name,
      AddProduct.product_price,
      AddProduct.product_image,
      AddProduct.product_size,
    
    ],
    function (err, result) {
      try {
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(404).send("unable to add the products data");
      }
    }
  );
});


router.put("/product/:id", upload.single("product_image"), function (req, res) {
  let NewImage = '';
  if(req.file){
   NewImage = req.file.path
  }else{
    NewImage= req.body.product_image
  }
  const UpdateProduct = {
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_image: NewImage,
    product_link: req.body.product_link,
  };
  database.query(
    "UPDATE db_practice.products SET product_name =? ,product_price=?,product_image=?, product_link=? where product_id=?",
    [
      UpdateProduct.product_name,
      UpdateProduct.product_price,
      UpdateProduct.product_image,
      UpdateProduct.product_link,
      UpdateProduct.product_id,
    ],
    function (err, result) {
      try {
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(404).send("unable to add the products data");
      }
    }
  );
});

router.get("/cart-items", (req, res) => {
  database.query(
    "SELECT * FROM db_practice.cart_items",
    (error, results, fields) => {
      results.forEach((element) => {
        console.log(element.product_image);
        if (!element.product_image.includes("https://")) {
          element.product_image =
            "http://localhost:4001/" +
            element.product_image.toString().slice(8);
        }
        return element;
      });
      if (error) {
        return console.error(error.message);
      }
      return res.status(200).send({
        data: results,
      });
    }
  );
});

router.get("/products", (req, res) => {
  database.query(
    "SELECT * FROM db_practice.products",
    (error, results, fields) => {
      results.forEach((element) => {
        console.log(element.product_image);
        if (!element.product_image.includes("https://")) {
          element.product_image =
            "http://localhost:4001/" +
            element.product_image.toString().slice(8);
        }
        return element;
      });
      if (error) {
        return console.error(error.message);
      }
      return res.status(200).send({
        data: results,
      });
    }
  );
});


router.get("/productId/:id", (req, res) => {
  database.query(
    "SELECT * FROM db_practice.products where product_id=?",
    [req.params.id],
    (error, results, fields) => {
      results.forEach((element) => {
        if (!element.product_image.includes("https://")) {
          element.product_url =
            "http://localhost:4001/" +
            element.product_image.toString().slice(8);
        }
        return element;
      });
      if (error) {
        return console.error(error.message);
      }
      console.log(results);
      return res.status(200).send({
        data: results,
      });
    }
  );
});

router.get("/cartId/:id", (req, res) => {
  database.query(
    "SELECT * FROM db_practice.cart_items where cart_id=?",
    [req.params.id],
    (error, results, fields) => {
      results.forEach((element) => {
        if (!element.product_image.includes("https://")) {
          element.product_url =
            "http://localhost:4001/" +
            element.product_image.toString().slice(8);
        }
        return element;
      });
      if (error) {
        return console.error(error.message);
      }
      console.log(results);
      return res.status(200).send({
        data: results,
      });
    }
  );
});

router.delete("/product/:id", function (req, res) {
  database.query(
    "DELETE FROM db_practice.products where product_id = ? ",
    [req.body.product_id],
    function (error, result, fields) {
      if (error) throw error;
      res.status(200).send("Record has been deleted");
    }
  );
});

router.delete("/cart-item/:id", function (req, res) {
  database.query(
    "DELETE FROM db_practice.cart_items where cart_id= ? ",
    [req.body.cart_id],
    function (error, result, fields) {
      if (error) throw error;
      res.status(200).send("Record has been deleted");
    }
  );
});

module.exports = router;
