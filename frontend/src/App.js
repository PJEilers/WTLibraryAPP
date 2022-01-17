import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import BoekToevoegen from './components/pages/Boeken/BoekToevoegen'
import MaakBoekTabel from './components/pages/Boeken/BoekTabel'
import ExemplaarInformatie from './components/pages/Boeken/ExemplaarInformatie'
import PersoonToevoegen from './components/pages/Personen/PersoonToevoegen';
import PersoonInformatie from './components/pages/Personen/PersoonInformatie';
import UitleningToevoegen from "./components/pages/Reserveringen/UitleningToevoegen";
import Login from "./components/pages/Login/Login";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';



function App() {
  return (
    <Router>
      <Navbar />
    
          <Routes>
        <Route path = '/' exact element = {<Home />} />
        <Route path = '/boek-toevoegen' element = {<BoekToevoegen />} />
        <Route path = '/boekenlijst' element = {<MaakBoekTabel />} />
        <Route path = '/exemplaar-informatie' element = {<ExemplaarInformatie />} />
        <Route path = '/gebruiker-toevoegen' element = {<PersoonToevoegen />} />
        <Route path = '/persoonsinformatie' element = {<PersoonInformatie />} />
        <Route path = '/uitlening-toevoegen' element = {<UitleningToevoegen/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/contact' element = {<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;
