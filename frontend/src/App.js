import { createContext, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoekToevoegen from './components/pages/Boeken/BoekToevoegen'
import MaakBoekTabel from './components/pages/Boeken/BoekTabel'
import ExemplaarInformatie from './components/pages/Boeken/ExemplaarInformatie'
import PersoonToevoegen from './components/pages/Personen/PersoonToevoegen';
import PersoonInformatie from './components/pages/Personen/PersoonInformatie';
import UitleningToevoegen from "./components/pages/Reserveringen/UitleningToevoegen";
import Login from "./components/pages/Login/Login";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Cookies from 'universal-cookie';


export const persoonContext = createContext({});


function App() {

  const cookies = new Cookies();


  const [persoonInfo, setPersoonInfo] = useState(() => {
    if(cookies.get('persoonId')) {
      return {persoonId: cookies.get('persoonId'), adminRechten: cookies.get('adminRechten')};
    }
    return null;
    
  });
  
  if (persoonInfo) {
    return (
      <Router>
        <Navbar setPersoonInfo={setPersoonInfo}/>
        <persoonContext.Provider value={persoonInfo}>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/BoekToevoegen' element={<BoekToevoegen />} />
            <Route path='/BoekTabel' element={<MaakBoekTabel />} />
            <Route path='/Exemplaarinformatie' element={<ExemplaarInformatie />} />
            <Route path='/PersoonToevoegen' element={<PersoonToevoegen />} />
            <Route path='/Persooninformatie' element={<PersoonInformatie />} />
            <Route path='/UitleningToevoegen' element={<UitleningToevoegen />} />
            <Route path='/Logout' element={<Login setPersoonInfo={setPersoonInfo} />} />
            <Route path='/Contact' element={<Contact />} />
          </Routes>
        </persoonContext.Provider>
      </Router>

    );
  } else {
    return (
      <Login setPersoonInfo={setPersoonInfo} />
    )
  }

}

export default App;
