import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ToevoegenStyling } from './ToevoegenStyling';

const Home = () =>{
  return (
    <ToevoegenStyling>
    <div>
    <h1> Kies hier welke informatie u toe wil voegen aan de database: </h1>
    <ul>
      <li>
            <NavLink to='/boek-toevoegen' className='toevoegingen'>
                Boek en/of Exemplaar Toevoegen
            </NavLink>
        </li>
        <p></p>
        <li>
            <NavLink to='/gebruiker-toevoegen' className='toevoegingen'>
                Gebruiker Toevoegen
            </NavLink>
        </li>
    </ul>
    </div>
    </ToevoegenStyling>
  );
}
export default Home;