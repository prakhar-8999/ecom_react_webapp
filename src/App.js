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
function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Page404/>}/>
            <Route path="/LoginRegister" element={<LoginRegister/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router>
  );
}

export default App;
