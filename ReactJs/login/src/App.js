import './App.css';
import React  from 'react';
import Login from './Login-Page/Login';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import SignUp from './Login-Page/SignUp';
import Welcome from './Login-Page/Welcome';
import Landing from './landing-page/landing'
import AddProduct from './landing-page/addProduct';
import DeleteProduct from './landing-page/deleteProduct';
import UpdateProduct from './landing-page/updateProduct';
import Navbar from './navbar/navbar';
import Cart from './Cart/ProductCart';
import ViewCart from './Cart/ViewCart'
import RemoveProduct from './Cart/removeFromCart'


function App() { 
  const True = true;

 
  return (
  // currentFrom==="login"?<Login onFormSwitch={toggleForm}/>: <Signup onFormSwitch={toggleForm} />
  <Router baseName='/'>
    <Switch>
    <Route exact={True} strict={true} sensitive={true}
    path='/' component={Login}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path='/signup' component={SignUp}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path='/welcome' component={Welcome}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path='/landing' component={Landing}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path='/addProduct' component={AddProduct}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path='/deleteProduct/:productId' component={DeleteProduct}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path="/products/:productId" component={AddProduct}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path="/updateProduct/:productId" component={UpdateProduct}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path="/navbar" component={Navbar}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path="/cart/:productId" component={Cart}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path="/view-cart" component={ViewCart}>
    </Route>
    <Route exact={True} strict={true} sensitive={true} 
    path='/removeFromCart/:productId' component={RemoveProduct}>
    </Route>
    </Switch>
  </Router>
  );
}
// <BrowserRouter>

{/* <Routes>

<Route path='/' index element={<StartScreenComponent/>}></Route>

<Route path='/add-player' index element={<AddPlayerComponent/>}></Route>

<Route path='/play' index element={<PlayArea/>}></Route>

</Routes>

</BrowserRouter> */}

export default App;
