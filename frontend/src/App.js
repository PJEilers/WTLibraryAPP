import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Boekenlijst from "./pages/Boekenlijst";
import Reserveringen from "./pages/Reserveringen";
import Trainees from "./pages/Trainees";
import Uitleningen from "./pages/Uitleningen";
import LogIn from "./pages/Login";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path = '/' component = {Home} />
        <Route path = '/Boekenlijst' element = {Boekenlijst} />
        <Route path = '/Reserveringen' element = {Reserveringen} />
        <Route path = '/Trainees' element = {Trainees} />
        <Route path = '/Uitleningen' element = {Uitleningen} />
        <Route path = '/Login' element = {LogIn} />
      </Routes>
    </Router>
        /*<Route path = '/' exact element={Home} />
        <Route path = '/about' element = {About} />*/
  );
}

export default App;
