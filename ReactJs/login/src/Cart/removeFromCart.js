import React, { useState, useEffect } from "react";
import Api from "../Api";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "../Styles/addProduct.module.css"



export default function DeleteProduct() {

    const history = useHistory();
    const [cart_id, setCartId] = useState("");
    const useParameterId = useParams();
    console.log([useParameterId.productId].toString().replace(":", ""));
    const getParameterId = [useParameterId.productId].toString().replace(":", "");
    console.log(getParameterId);
    
    const fetchProductId = async () => {
      const response = await Api.get(`/get/cartId/${getParameterId}`).catch(
        (err) => console.log(err)
      );
      setCartId(response.data.data[0].cart_id);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {
        cart_id: cart_id,
      };
      deleteProduct(obj);
    };
    
    const deleteProduct = async(obj)=>{
      const response = await Api.delete(`/delete/cart-item/${getParameterId}`,{data:obj}).catch((err)=>{
        console.log(err);
      });
      history.push("/landing");
      window.alert("Product Successfully Removed");
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
        <label >Press Confirm to Remove
          Item From Cart</label>
        {/* <input type="text"value={cart_id}></input> */}
        </div>
        
        <button type="submit" className={styles.submit_btn} >Confirm</button>
        </form>
        </div>
    </body>
    </>
    );
}