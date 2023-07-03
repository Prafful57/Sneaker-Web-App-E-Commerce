import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Api from "../Api";
import styles from "../Styles/addProduct.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct(){
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_image, setProductImage] = useState("");
  const [product_link, setProductLink] = useState("");
  const [product_url, setProductUrl] = useState("");
  const [userInfo, setUserInfo] = useState({ file: [] });
  const history = useHistory();
  const useParameterId = useParams();
  console.log([useParameterId.productId].toString().replace(":", ""));
  const getParameterId = [useParameterId.productId].toString().replace(":", "");


  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    setProductImage(e.target.files[0]);
    //we are attaching url formate to image
    setProductUrl(URL.createObjectURL(e.target.files[0]));
}
 const handleSubmit = (e) => {
  e.preventDefault();
  const obj = {
    product_name: product_name,
    product_price: product_price,
    product_image: product_image,
    product_link:product_link,
  };
  updateProductById(obj);
  history.push("/landing");
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
    setProductLink(response.data.data[0].product_link);
    setProductId(response.data.data[0].product_id);
  };
  //call infinite times until we give condition
  useEffect(() => {
    if(useParameterId && useParameterId.productId){
      fetchProductById();
    }
  }, [useParameterId]);

  const [file, setFile] = useState();
  const [isSuccess, setSuccess] = useState(null);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const updateProductById = async()=>{
    const obj = {
      product_id:product_id,
      product_name: product_name,
      product_price: product_price,
      product_link:product_link,
    };
    const formData = new FormData();
    formData.append("product_id", obj.product_id);
    formData.append("product_image", product_image);
    formData.append("product_price", obj.product_price);
    formData.append("product_name", obj.product_name);
    formData.append("product_link", obj.product_link);
    try {
      const res = await axios.put(
        `http://localhost:4001/update/product/${getParameterId}`,
        formData
      );
      console.log(res);
      if (res.data.success === 1) {
        setSuccess("Image uploaded successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }
    return(
      <>
      <body className={styles.addProduct_body}>
        <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.addProduct_container}>
      <label>Product Id is :</label>
      <input
        value={product_id}
        type="text"
      ></input>
      <label>Enter Product Name</label>
      <input
        value={product_name}
        onChange={(e) => setProductName(e.target.value)}
        type="text"
        placeholder="product name"
        id="pname"
        name="pname"
      ></input>
      <label>Enter Product Price</label>
      <input
        value={product_price}
        onChange={(e) => setProductPrice(e.target.value)}
        type="text"
        placeholder="product price"
        id="pprice"
        name="pprice"
      ></input>
      <label>Enter Product Information Link</label>
        <input
          value={product_link}
          onChange={(e) => setProductLink(e.target.value)}
          type="text"
          placeholder="product link"
          id="pLink"
          name="pLink"
        ></input>
     <div className={styles.image_container}>
     <img src={product_url} alt="" />
        <input type="file" onChange={handleChange} />
      </div>
      <button type="submit" className={styles.submit_btn}> Submit</button>
    </form>
    </div>
      </body>
  </>
    )
}