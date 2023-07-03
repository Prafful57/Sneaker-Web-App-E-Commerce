import React, { useState, useEffect } from "react";
import Api from "../Api";
import styles from "./ViewCart.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const DisplayItems = () => {
  const [globalVar, setGlobalVar] = useState([]);
  const [itemCount, setItemCount] = React.useState(0);
  const history = useHistory();

  const fetchAllProducts = async () => {
    const response = await Api.get("/get/cart-items").catch((err) =>
      console.log(err)
    );
    console.log(response.data.data);
    setGlobalVar(response.data.data);
  };

  //call infinite times until we give condition
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleProceedToCheckout = () => {
    console.log("Proceed to Checkout clicked!");
  };
  const calculateTotalPrice = (product_price) => {
          return globalVar.reduce((total, item) => total + item.product_price, 0);  
  };

  const deleteProductPage = (id) => {
    history.push(`/removeFromCart/:${id}`);
  };


//   console.log(globalVar);
//   const responseProducts = globalVar.map((items) => {
//     const { product_name, product_image, product_price, product_id } = items;
//     
//     return (
// <div className={styles.productCart}>
//       <h2 className={styles.heading}>Product Cart</h2>
//       <table className={styles.productTable}>
//         <thead>
//           <tr>
//             <th>Product Image</th>
//             <th>Product Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {cartItems.map((item) => ( */}
//           <tr key={product_id}>
//             <td className={styles.productImage}>
//             <img src={product_image} alt="" />
//             </td>
//             <td>{product_name}</td>
//             <td>${product_price}</td>
//           </tr>
//           {/* ))} */}
//         </tbody>
//       </table>
//       <div className={styles.totalContainer}>
//         <div className={styles.totalPrice}>
//           <span>Total:</span> ${calculateTotalPrice()}
//         </div>
//         <div className={styles.proceedButtonContainer}>
//           <button className={styles.proceedButton} onClick={handleProceedToCheckout}>
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//     )})


  return (
    <body className={styles.viewCart_body}>
    <div className={styles.productCart}>
      <h2 className={styles.heading}>Your Cart</h2>
       <table className={styles.productTable}>
         <thead>
           <tr>
             <th>Product Image</th>
             <th>Product Name</th>
             <th>Price</th>
             <th>Product Size</th>
           </tr>
         </thead>
         <tbody>
           {globalVar.map((items) => (
           <tr key={items.product_id}>
            <td className={styles.productImage}>
              <div className={styles.image_container}>
             <img src={items.product_image} alt="" />
             <button
                  className={styles.delete_btn}
                  onClick={() => deleteProductPage(items.cart_id)}
                >
                  Delete Product
                </button>
             </div>
             </td>
             <td>{items.product_name}</td>
             <td>{items.product_price} Rs</td>
             <td>{items.product_size}</td>
           </tr>
           
           ))}
         </tbody>
       </table>
       <div className={styles.totalContainer}>
         <div className={styles.totalPrice}>
           <span>Total:</span> {calculateTotalPrice()} Rs
         </div>
         <div className={styles.proceedButtonContainer}>
           <button className={styles.proceedButton} onClick={handleProceedToCheckout}>
             Proceed to Checkout
           </button>
         </div>
       </div>
     </div>
  </body>
  );
};
export default DisplayItems;
