import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

// Imports for routing
import Home from "./pages/Home";
import BoekToevoegen from './BoekToevoegen'
import MaakBoekTabel from './BoekTabel'
import ExemplaarInformatie from './ExemplaarInformatie'
import PersoonToevoegen from './PersoonToevoegen';
import PersoonInformatie from './PersoonInformatie';
import Reserveringen from "./pages/Reserveringen";
import Uitleningen from "./pages/Uitleningen";
import Contact from './pages/Contact'
import Login from './Login'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'BoekToevoegen' element = {<BoekToevoegen />} />
        <Route path = '/BoekTabel' element = {<MaakBoekTabel />} />
        <Route path = '/ExemplaarInformatie' element = {<ExemplaarInformatie />} />
        <Route path = '/PersoonToevoegen' element = {<PersoonToevoegen />} />
        <Route path = '/Persooninformatie' element = {<PersoonInformatie />} />
        <Route path = '/Reserveringen' element = {<Reserveringen />} />
        <Route path = '/Uitleningen' element = {<Uitleningen />} />
        <Route path = '/Contact' element = {<Contact />} />
        <Route path = '/Login' element = {<Login/>} />
      </Routes>
    </Router>
        /*<Route path = '/' exact element={Home} />
        <Route path = '/about' element = {About} />*/
  );
}

export default App;
