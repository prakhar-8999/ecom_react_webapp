import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Page404 from './pages/Page404'
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import Dashhome from './pages/Dashhome'
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import MyCart from './pages/MyCart';
import Wallet from './pages/Wallet';
import Transactions from './pages/Transactions';
import Addproducts from './pages/Addproducts';
import AddedProducts from './pages/AddedProducts';
import Shop from './pages/Shop';
import Iteam from './pages/Iteam'
function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Page404/>}/>
            <Route path="/LoginRegister" element={<LoginRegister/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}>
              <Route path="" element={<Dashhome/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="cart" element={<MyCart/>} />
              <Route path="cart/Item/:pdid" element={<Iteam />} />
              <Route path="wallet" element={<Wallet/>}/>
              <Route path="transactions" element={<Transactions/>}/>
              <Route path="addproducts" element={<Addproducts/>}/>
              <Route path="AddedProducts" element={<AddedProducts/>}/>
              <Route path="shop" element={<Shop/>}/>
            </Route>
          </Routes>
        </Router>
  );
}

export default App;
