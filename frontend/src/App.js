import logo from './logo.svg';
import './App.css';

import BoekToevoegen from './BoekToevoegen.js';
import Reserveren from './Reserveren';

function App() {
  return (
    <div className="App">  
      <BoekToevoegen/>
      <Reserveren boekId = {2} persoonId = {1}/>
    </div>
  );
}

export default App;
