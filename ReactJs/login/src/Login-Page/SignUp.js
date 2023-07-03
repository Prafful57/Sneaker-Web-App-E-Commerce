import { useState } from "react";
import  Api from "../Api";
import { useHistory } from "react-router-dom";
import styles from "../Styles/login.module.css"
 
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const redirectToLogin=()=>{
    history.push("/");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const signForm = {
      name: name,
      email: email,
      password: password,
      password_confirm: confirmPassword,
    };
    onSubmitSignUp(signForm);
  };

  const onSubmitSignUp = async (form) => {
    const response = await Api.post("/register", form).catch((err) => {
      console.log(err);
    });

    if (response && response.status === 200 && response.data) {
      history.push("/");
    }
  };

  return (
    <>
    <body className={styles.signup_body}>
    <div className={styles.main_container}>
      <div className={styles.container}>
      <h2>Sign-Up</h2>
        <form onSubmit={submitHandler} className={styles.signup_form}>
        <label htmlFor="email">Name</label>
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

         <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            placeholder="your@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

         <label htmlFor="email">Password</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

         <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="********"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button type="submit">Signup</button>
        </form>
        <button  className={styles.link_btn} onClick={redirectToLogin}>Don't have an account ? Register here.</button>
      </div>
      </div>
      </body>
    </>
  );
};
export default SignUp;
