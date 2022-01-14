import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";
//import Boekenlijst from "./pages/Boekenlijst";
import BoekToevoegen from './BoekToevoegen'
import MaakBoekTabel from './BoekTabel'
import ExemplaarInformatie from './ExemplaarInformatie'

// import BoekToevoegen from './BoekToevoegen'
// import BoekToevoegen from './BoekToevoegen'

import PersoonToevoegen from './PersoonToevoegen';
import PersoonInformatie from './PersoonInformatie';
import Reserveringen from "./pages/Reserveringen";
import Trainees from "./pages/Trainees";
import Uitleningen from "./pages/Uitleningen";
import Login from "./Login";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'Boeken' element = {<BoekToevoegen />} />
        <Route path = '/Reserveringen' element = {<Reserveringen />} />
        <Route path = '/Trainees' element = {<Trainees />} />
        <Route path = '/Uitleningen' element = {<Uitleningen />} />
        <Route path = '/BoekTabel' element = {<MaakBoekTabel />} />
        <Route path = '/Exemplaarinfo' element = {<ExemplaarInformatie />} />
        <Route path = '/PersoonToevoegen' element = {<PersoonToevoegen />} />
        <Route path = '/Persooninformatie' element = {<PersoonInformatie />} />
        <Route path = '/Login' element = {<Login/>} />
      </Routes>
    </Router>
        /*<Route path = '/' exact element={Home} />
        <Route path = '/about' element = {About} />*/
  );
}

export default App;
