import { createContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { FooterContainer } from './components/Footer/FooterContent'
import './App.css';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
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


export const persoonContext = createContext({});
export const permissionContext = createContext(false);


function App() {

  // Hier word de global variable persoon (gebruiker of admin) gemaakt
  const [persoonInfo, setPersoonInfo] = useState(() => {

    if (localStorage.getItem('persoonId')) {
      return { persoonId: localStorage.getItem('persoonId')};
    }
    return null;

  });

  const [permission, setPermission] = useState(false);
  const [permissionLoaded, setPermissionLoaded] = useState(false);

  useEffect(() => {
    setPermissionLoaded(false)
  }, [persoonInfo])

  if (persoonInfo) {
    // Check of de persoon een admin is en maak dan een global boolean permission 
    if (!permissionLoaded) {
      //if ((persoonInfo.adminRechten === 'true' || (persoonInfo.adminRechten && persoonInfo.adminRechten !== 'false'))) {
      if (true) {
        setPermission(true);
      } else {
        setPermission(false);
      }
      setPermissionLoaded(true);
    };

    return (
      <permissionContext.Provider value={permission}>
        <persoonContext.Provider value={persoonInfo}>
          <Router>
            <Navbar setPersoonInfo={setPersoonInfo} />
            <FooterContainer />
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/boek-toevoegen' element={permission ? <Outlet /> : <Navigate to='/' />}>
                <Route path='' element={<BoekToevoegen />} />
              </Route>
              <Route path='/boekenlijst' element={<MaakBoekTabel />} />
              <Route path='/gebruiker-toevoegen' element={permission ? <Outlet /> : <Navigate to='/' />}>
                <Route path='' element={<PersoonToevoegen />} />
              </Route>
              <Route path='/persoonsinformatie' element={permission ? <Outlet /> : <Navigate to='/' />}>
                <Route path='' element={<PersoonInformatie />} />
              </Route>
              <Route path='/ReserveringTabel' element={permission ? <Outlet /> : <Navigate to='/' />}>
                <Route path='' element={<ReserveringTabel />} />
              </Route>
              <Route path='/uitleen-historie' element={<UitleenHistorieTabel />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </Router>
        </persoonContext.Provider>
      </permissionContext.Provider>
    );
  } else {
    return (
      <Login setPersoonInfo={setPersoonInfo} />
    )
  }
}

export default App;
