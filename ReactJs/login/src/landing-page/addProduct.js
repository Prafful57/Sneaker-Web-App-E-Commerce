import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Api from "../Api";
import styles from "../Styles/addProduct.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddProduct() {
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_image, setProductImage] = useState("");
  const [product_link, setProductLink] = useState("");
  const [image_url, setImageUrl] = useState();
  const [userInfo, setUserInfo] = useState({ file: [] });
  const history = useHistory();
  const useParameterId = useParams();
  console.log([useParameterId.productId].toString().replace(":", " "));
  const getParameterId = [useParameterId.productId].toString().replace(":", " ");

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      product_name: product_name,
      product_price: product_price,
      product_image: product_image,
      product_link:product_link,
    };
    uploadFile(obj);
    history.push("/landing");
  };
  

    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

  // const history = useHistory();
  // const fetchProducts = async (obj) => {
  //   const response = await Api.post("/add/products", obj).catch((err) =>
  //     console.log(err)
  //   );
  //   console.log(response);
  //   if (response && (response.status === 200) & response.data) {
  //     history.push("/landing");
  //   }
  // };

  const [file, setFile] = useState();
  const [isSuccess, setSuccess] = useState(null);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const obj = {
      product_name: product_name,
      product_price: product_price,
      product_link:product_link
    };
    const formData = new FormData();
    formData.append("product_image", file);
    formData.append("product_price", obj.product_price);
    formData.append("product_name", obj.product_name);
    formData.append("product_link", obj.product_link);
    try {
      const res = await axios.post(
        "http://localhost:4001/upload/upload",
        formData
      );
      console.log(res);
      if (res.data.success === 1) {
        setSuccess("Image uploaded successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const fetchProductById = async () => {
  //   const response = await Api.get(`/get/productId/${getParameterId}`).catch(
  //     (err) => console.log(err)
  //   );
  //   console.log(response);

  //   setProductName(response.data.data[0].product_name);
  //   setProductPrice(response.data.data[0].product_price);
  //   setProductImage(response.data.data[0].product_image);
  // };

  //useEffect is a react hook it is used to call based on handel the condition 
  // useEffect(() => {
  //   if(useParameterId && useParameterId.productId){
  //     fetchProductById();
  //   }
  // }, [useParameterId]);

// const updateProductById = async()=>{
//   const obj = {
//     product_name: product_name,
//     product_price: product_price,
//   };
//   const formData = new FormData();
//   formData.append("product_image", file);
//   formData.append("product_price", obj.product_price);
//   formData.append("product_name", obj.product_name);
//   try {
//     const res = await axios.post(
//       "http://localhost:4001/upload/upload",
//       formData
//     );
//     console.log(res);
//     if (res.data.success === 1) {
//       setSuccess("Image uploaded successfully");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
  return (
    <>
    <body className={styles.addProduct_body}>
      <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.addProduct_container}>
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
          {/* <img type="file" src={product_image} />
          <input type="file" onChange={handleChange} /> */}
          {/* <input type="file" onChange={handleChange} />
            <img src={file} /> */}
            <img src={image_url} />
        <input type="file" onChange={handleChange} />
        </div>
        <button type="submit" className={styles.submit_btn}>Submit</button>
      </form>
      </div>
      </body>
    </>
  );
}
