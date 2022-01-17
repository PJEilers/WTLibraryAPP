import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import BoekToevoegen from './components/pages/Boeken/BoekToevoegen'
import MaakBoekTabel from './components/pages/Boeken/BoekTabel'
import ExemplaarInformatie from './components/pages/Boeken/ExemplaarInformatie'
import PersoonToevoegen from './components/pages/Personen/PersoonToevoegen';
import PersoonInformatie from './components/pages/Personen/PersoonInformatie';
import Reserveren from './components/pages/Reserveringen/Reserveren';
import ReserveringTabel from './components/pages/Reserveringen/ReserveringTabel';
import UitleningToevoegen from "./components/pages/Reserveringen/UitleningToevoegen";
import Login from "./components/pages/Login/Login";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/BoekToevoegen' element = {<BoekToevoegen />} />
        <Route path = '/BoekTabel' element = {<MaakBoekTabel />} />
        <Route path = '/Exemplaarinformatie' element = {<ExemplaarInformatie />} />
        <Route path = '/PersoonToevoegen' element = {<PersoonToevoegen />} />
        <Route path = '/Persooninformatie' element = {<PersoonInformatie />} />
        <Route path = '/Reserveringen' element = {<Reserveren />} />
        <Route path = '/ReserveringTabel' element = {<ReserveringTabel />} />
        <Route path = '/UitleningToevoegen' element = {<UitleningToevoegen/>} />
        <Route path = '/Login' element = {<Login/>} />
        <Route path = '/Contact' element = {<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;
