import React, { useState, useEffect } from "react";
import Api from "../Api";
import styles from "./ProductCart.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


const ProductCart = () => {
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_image, setProductImage] = useState("");
  const [product_url, setProductUrl] = useState("");
  const [product_size, setProductSize] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setProductSize(selectedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addToCart();
  };

  const history = useHistory();

  const useParameterId = useParams();
  console.log([useParameterId.productId].toString().replace(":", ""));
  const getParameterId = [useParameterId.productId].toString().replace(":", "");

  const [file, setFile] = useState();
  const [isSuccess, setSuccess] = useState(null);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchProductById = async () => {
    const response = await Api.get(`/get/productId/${getParameterId}`).catch(
      (err) => console.log(err)
    );
    console.log(response);
    setProductName(response.data.data[0].product_name);
    setProductPrice(response.data.data[0].product_price);
    setProductImage(response.data.data[0].product_image);
    setProductUrl(response.data.data[0].product_url);
    setProductId(response.data.data[0].product_id);
  };

  //call infinite times until we give condition
  useEffect(() => {
    if (useParameterId && useParameterId.productId) {
      fetchProductById();
    }
  }, [useParameterId]);

  const addToCart = async () => {
    const obj = {
      product_id: product_id,
      product_name: product_name,
      product_price: product_price,
      product_size: product_size,
    };
    const formData = new FormData();
    formData.append("product_id", obj.product_id);
    formData.append("product_image", product_image);
    formData.append("product_price", obj.product_price);
    formData.append("product_name", obj.product_name);
    formData.append("product_size", obj.product_size);
    try {
      const res = await axios.post(
        `http://localhost:4001/addToCart/item/${getParameterId}`,
        formData
      );
      console.log(res);
      if (res.data.success === 1) {
        setSuccess("Image uploaded successfully");
      }
    } catch (err) {
      console.log(err);
    }
    history.push("/landing");
    window.alert("Product Successfully Added to Cart");
  };
 

  return (
    <body className={styles.addProduct_body}>
      <div>
        <div className={styles.productCard}>
          <div className={styles.labelContainer}>
            <label className={styles.labelWeight}>Product Image</label>
            <div className={styles.productImage}>
              <img src={product_url} alt="" />
            </div>
          </div>
          <div className={styles.productDetails}>
            <div className={styles.labelContainer}>
              <label className={styles.labelWeight}>Product Name</label>
              <h3 className={styles.productName}>{product_name}</h3>
            </div>
            <div className={styles.sizeLabelContainer}>
              <label className={styles.labelWeight}>Select Size</label>
              <div className={styles.select_size}>
                {/* <Select options={product_size} onChange={setProductSize}/> */}
                <select
                  value={product_size}
                  onChange={handleOptionChange}
                  name="product_size"
                >
                  <option value="">Select an option</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>
            <div className={styles.labelContainer}>
              <label className={styles.labelWeight}>Product Price</label>
              <p className={styles.productPrice}>{product_price} Rs</p>
            </div>
          </div>
        </div>
        <div className={styles.proceedButtonContainer}>
          <button className={styles.proceedButton} onClick={handleSubmit}>
            Click to Confirm
          </button>
        </div>
      </div>
    </body>
  );
};

export default ProductCart;

// import React from 'react';
// import styles from './ProductCart.module.css';

// const ProductCard = () => {
//   return (
//     <div className={styles.productCard}>
//       <div className={styles.productImage} />
//       <div className={styles.productDetails}>
//         <h3 className={styles.productName}>Product Name</h3>
//         <p className={styles.productPrice}>$9.99</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
