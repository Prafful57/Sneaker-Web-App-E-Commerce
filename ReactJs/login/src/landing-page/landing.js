//useState is React Hook that allows you to add state to a functional component.
//It returns an array with two values: the current state and a function to update it
import React, { useState, useEffect } from "react";
import Api from "../Api";
import { useHistory } from "react-router-dom";
import styles from "../Styles/landing.module.css";
import NavBar from "../navbar/navbar";

export default function Landing() {
  const [globalVar, setGlobalVar] = useState([]);
  const [itemCount, setItemCount] = React.useState(0);
  const history = useHistory();

  // const addProductPage = () => {
  //   history.push("/addProduct");
  // };
  // const deleteProductPage = (id) => {
  //   history.push("/deleteProduct");
  // };

  // const updateProduct = (id) => {
  //   history.push(`/products/:${id}`);
  // };
  // const Navbar = (id) => {
  //   history.push("/navbar");
  // };

  const Cart = (id) => {
    history.push(`/cart/:${id}`);
  };

  const updateProductPage = (id) => {
    history.push(`/updateProduct/:${id}`);
  };

  const deleteProductPage = (id) => {
    history.push(`/deleteProduct/:${id}`);
  };

  const fetchAllProducts = async () => {
    const response = await Api.get("/get/products").catch((err) =>
      console.log(err)
    );
    console.log(response.data.data);
    setGlobalVar(response.data.data);
  };

  //call infinite times until we give condition
  useEffect(() => {
    fetchAllProducts();
  }, []);

  console.log(globalVar);
  const responseProducts = globalVar.map((items) => {
    const {
      product_name,
      product_image,
      product_price,
      product_id,
      product_link,
    } = items;
    return (
      <>
        <body className={styles.landing_body}>
          <div className={styles.item_container}>
            <div className={styles.item_container}>
              {/* <button onClick={updateProduct(product_id)}>Update Product</button> */}
              <div className={styles.card} key={product_id}>
                <div className={styles.main_btn}>
                  <button
                    className={styles.update_btn}
                    onClick={() => updateProductPage(product_id)}
                  >
                    Update Product 
                  </button>
                  <button
                    className={styles.update_btn}
                    onClick={() => deleteProductPage(product_id)}
                  >
                    Delete Product
                  </button>
                </div>
                <div className={styles.image_box}>
                  <a  href ={product_link}>
                  <img
                   
                    src={product_image}
                    alt=""
                  />
                  </a>
                </div>
                <h3>{product_name}</h3>
                <p>
                  <h5>Price :{product_price} Rs</h5>
                </p>
                {/* <div>
                <ButtonGroup> 
                    <Button
                        onClick={() => {
                            setItemCount(Math.max(itemCount - 1, 0));
                        }}
                    >
                        {" "}
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                        onClick={() => {
                            setItemCount(itemCount + 1);
                        }}
                    >
                        {" "}
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup>
                </div> */}

                <div className={styles.buy_btn_container}>
                  <button
                    className={styles.buy_btn}
                    onClick={() => Cart(product_id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </body>
      </>
    );
  });

  return (
    <>
      <NavBar />
      {/* <button className={styles.add_btn} onClick={addProductPage}>
          Add Product
        </button>
        <button className={styles.add_btn} onClick={deleteProductPage}>Delete Product</button> */}
      <body>
        <div className={styles.background}>{responseProducts}</div>
      </body>
    </>
  );
}
