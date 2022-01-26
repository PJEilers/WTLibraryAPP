import { createContext, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { FooterContainer } from './components/Footer/FooterContent'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoekToevoegen from './components/pages/Boeken/BoekToevoegen'
import MaakBoekTabel from './components/pages/Boeken/BoekTabel'
import ExemplaarInformatie from './components/pages/Boeken/ExemplaarInformatie'
import PersoonToevoegen from './components/pages/Personen/PersoonToevoegen';
import PersoonInformatie from './components/pages/Personen/PersoonInformatie';
import Reserveren from './components/pages/Reserveringen/Reserveren';
import ReserveringTabel from './components/pages/Reserveringen/ReserveringTabel';
import UitleningToevoegen from "./components/pages/Reserveringen/UitleningToevoegen";
import UitleenHistorieTabel from './components/pages/Reserveringen/UitleenHistorie';
import Login from "./components/pages/Login/Login";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Cookies from 'universal-cookie';
import Permission from './components/Permissions/Permission';


export const persoonContext = createContext({});


function App() {

  const cookies = new Cookies();


  const [persoonInfo, setPersoonInfo] = useState(() => {
    if (cookies.get('persoonId')) {
      return { persoonId: cookies.get('persoonId'), adminRechten: cookies.get('adminRechten') };
    }
    return null;

  });

  if (persoonInfo) {
    return (
      <persoonContext.Provider value={persoonInfo}>
        <Router>
          <Navbar setPersoonInfo={setPersoonInfo} />
          <FooterContainer />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/boek-toevoegen' element={<Permission />}>
              <Route path='' element={<BoekToevoegen />} />
            </Route>
            <Route path='/boekenlijst' element={<MaakBoekTabel />} />
            <Route path='/gebruiker-toevoegen' element={<Permission />}>
              <Route path='' element={<PersoonToevoegen />} />
            </Route>
            <Route path='/persoonsinformatie' element={<Permission />}>
              <Route path='' element={<PersoonInformatie />} />
            </Route>
            <Route path='/ReserveringTabel' element={<Permission />}>
              <Route path='' element={<ReserveringTabel />} />
            </Route>
            <Route path='/uitleen-historie' element={<UitleenHistorieTabel />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Router>
      </persoonContext.Provider>
    );
  } else {
    return (
      <Login setPersoonInfo={setPersoonInfo} />
    )
  }
}

export default App;
