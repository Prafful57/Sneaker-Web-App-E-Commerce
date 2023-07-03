import React, { useState } from "react";
import Api from "../Api";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import styles from "../Styles/login.module.css";

export default function Login() {
  //useState is React Hook that allows you to add state to a functional component
  const [data, setData] = React.useState(null);

  const [email, setEmail] = useState("");
  //use state gives 2 properties 1 values 2 update the state (rerender the UI we use state)
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLoginDetails = async (obj) => {
    // => arrow function will go outside and fetch the method
    //Variable declaration function /anonymous function
    const response = await Api.post("/user/login", obj).catch((err) =>
      console.log(err)
    );
    //If we have to .then it will indicate as success and .catch indicates error
    if (response && response.status === 200 && response.data.token) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      history.push("/landing");
    } else {
      console.log(errorMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //preventdefault prevents the behavior of switching of one page to another
    //preventdefault prevents to undergoes on default behavior we will provide our own behavior
    //forms is the method is used to auto-submit
    const obj = {
      email: email,
      password: pass,
    };
    console.log(obj);
    fetchLoginDetails(obj);
  };

  const history = useHistory();
  const redirectToSignIn = () => {
    history.push("/signup");
  };

  return (
    <>
      <body className={styles.login_body}>
        <div className={styles.main_container}>
        <div className={styles.container}>
          <h2>Login</h2>
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@gmail.com"
              id="email"
              name="email"
            ></input>
            <label htmlFor="password">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="email"
            ></input>
            <button type="submit">Login</button>
          </form>
          <button className={styles.link_btn} onClick={redirectToSignIn}>
            Don't have an account ? Register here.
          </button>
        </div>
        </div>
      </body>
    </>
  );
}
