import React, { useState, useEffect } from "react";
import Api from "../Api";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "../Styles/addProduct.module.css"



export default function DeleteProduct() {

    const history = useHistory();
    const [product_id, setProductId] = useState("");
    const useParameterId = useParams();
    console.log([useParameterId.productId].toString().replace(":", ""));
    const getParameterId = [useParameterId.productId].toString().replace(":", "");
    
    const fetchProductId = async () => {
      const response = await Api.get(`/get/productId/${getParameterId}`).catch(
        (err) => console.log(err)
      );
      setProductId(response.data.data[0].product_id);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {
        product_id: product_id,
      };
      deleteProduct(obj);
    };
    
    const deleteProduct = async(obj)=>{
      const response = await Api.delete(`/delete/product/${getParameterId}`,{data:obj}).catch((err)=>{
        console.log(err);
      });
      history.push("/landing");
    };
    useEffect(() => {
      if(useParameterId && useParameterId.productId){
        fetchProductId();
      }
    }, [useParameterId]);

    return(
    <>
    <body className={styles.addProduct_body}>
      <div className={styles.container}>
       <form onSubmit={handleSubmit} className={styles.addProduct_container}>
        <div>
        <label >Press Confirm to Delete the 
          Item</label>
        {/* <input type="text"value={product_id}></input> */}
        </div>
        
        <button type="submit" className={styles.submit_btn} >Confirm</button>
        </form>
        </div>
    </body>
    </>
    );
}