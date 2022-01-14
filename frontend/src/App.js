import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";
//import Boekenlijst from "./pages/Boekenlijst";
import BoekToevoegen from './components/pages/Boeken/BoekToevoegen'
import MaakBoekTabel from './components/pages/Boeken/BoekTabel'
import ExemplaarInformatie from './components/pages/Boeken/ExemplaarInformatie'

// import BoekToevoegen from './BoekToevoegen'
// import BoekToevoegen from './BoekToevoegen'

import PersoonToevoegen from './components/pages/Personen/PersoonToevoegen';
import PersoonInformatie from './components/pages/Personen/PersoonInformatie';
import Reserveringen from "./pages/Reserveringen";
import UitleningToevoegen from "./components/pages/Reserveringen/UitleningToevoegen"
import Login from "./components/pages/Login/Login";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/BoekToevoegen' element = {<BoekToevoegen />} />
        <Route path = '/Reserveringen' element = {<Reserveringen />} />
        <Route path = '/BoekTabel' element = {<MaakBoekTabel />} />
        <Route path = '/Exemplaarinformatie' element = {<ExemplaarInformatie />} />
        <Route path = '/PersoonToevoegen' element = {<PersoonToevoegen />} />
        <Route path = '/Persooninformatie' element = {<PersoonInformatie />} />
        <Route path = '/UitleningToevoegen' element = {<UitleningToevoegen/>} />
        <Route path = '/Login' element = {<Login/>} />
      </Routes>
    </Router>
        /*<Route path = '/' exact element={Home} />
        <Route path = '/about' element = {About} />*/
  );
}

export default App;
