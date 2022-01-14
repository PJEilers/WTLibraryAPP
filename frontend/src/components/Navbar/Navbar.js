import React, {Component} from 'react';
//import { MenuItems } from './MenuItems';
import { Button } from '../Button'
import './Navbar.css';
import { NavLink} from 'react-router-dom';
//import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'


class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className = "NavbarItems">
               
           {/* } <NavLink to= "/">
                <img src={require('../../Images/LogoWTblack.png')} alt='WTlogo' />
        </NavLink> */}
            <h1 className = "navbar-logo">WT Library<i className = "fab fa-react"></i></h1>
                <div className = "menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <NavLink className = 'nav-links' to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink className = 'nav-links' to="/Boeken">Boeken</NavLink>
                </li>
                <li>
                    <NavLink className = 'nav-links' to="/BoekTabel">Boek Tabel</NavLink>
                </li>
                {/* <li>
                    <NavLink className = 'nav-links' to='/Reserveringen'>Reserveringen</NavLink>
                </li> */}
                <li>
                    <NavLink className = 'nav-links' to='/Uitleningen'>Uitleningen</NavLink>
                </li>
                <li>
                <NavLink  className = 'nav-links' to='/Persooninformatie'>Persoonsinformatie</NavLink>
                </li>
                <li>
                <NavLink  className = 'nav-links' to='/BoekToevoegen'>Boek Toevoegen</NavLink>
                </li>
                <li>
                <NavLink  className = 'nav-links' to='/Exemplaarinfo'>Exemplaarinformatie</NavLink>
                </li>
                <li>
                <NavLink  className = 'nav-links' to='/Persoontoevoegen'>Persoon Toevoegen</NavLink>
                </li>
                <li>
                <NavLink className = 'nav-links-mobile' to='/Login'>LogIn</NavLink>
                </li>
                </ul>
                <NavLink to = '/login'><Button>Log In</Button></NavLink>
            </nav>
         )
    }
}

export default Navbar