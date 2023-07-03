import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import "./navbar.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function NavBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [itemCount, setItemCount] = React.useState(0);

  const history = useHistory();
  const addProductPage = () => {
    history.push("/addProduct");
  };

  const ViewCart = () => {
    history.push("/view-cart");
  };
  // const deleteProductPage = (id) => {
  //   history.push("/deleteProduct");
  // };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Welcome to Sneaker Head
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <button
                className="add_btn"
                onClick={addProductPage}
              >
               Add Product
              </button>
             
            </li>
            <div className="cart-icon" onClick={ViewCart}>
            <Badge color="secondary" badgeContent={itemCount}>
                    <ShoppingCartIcon />{" "}
                </Badge>
            </div>
            <li className="nav-item">
              {/* <button
                className="add_btn"
                onClick={deleteProductPage}
              >
                Delete Product
              </button> */}
            </li>
            <li className="nav-item">
              {/* <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavLink> */}
            </li>
            <li className="nav-item">
              {/* <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink> */}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;