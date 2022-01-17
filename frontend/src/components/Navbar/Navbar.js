import React, {useState} from 'react';
import { BookMenuItems } from './BookMenuItems';
import { Button } from '../Styling/Button';
import './Navbar.css';
import { Link, NavLink} from 'react-router-dom';
import Dropdown from './BookDropdown'
import GebruikerDropdown from './GebruikerDropdown'
//import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'


function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);
    const [dropdown, setDropdown] = useState(false); 

    const onMouseEnter = () => {
        if(window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    }

    const onMouseLeave = () => {
        if(window.innerwidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

        return(
        <nav className = "NavbarItems">
          <NavLink to= "/">
            <img src={require('../../images/LogoWT.PNG')} alt='WTlogo' className = 'navbar-logo' />
          </NavLink>
          <div className = "menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <li className = 'nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Link to = '/boeken' className = 'nav-links' onClick = {closeMobileMenu}>
                    Boeken <i className = 'fas fa-caret-down' />
                </Link>
                {dropdown && Dropdown (BookMenuItems) }
            </li>
            
            <li className = 'nav-item' onMouseEnter = {onMouseEnter} onMouseLeave={onMouseLeave}>
                <Link to = '/reserveringen' className = 'nav-links' onClick = {closeMobileMenu}>
                    Reserveringen <i className = 'fas fa-caret-down' />
                </Link>
                
            </li>

            <li className = 'nav-item'>
                <Link to = '/gebruikers' className = 'nav-links' onClick = {closeMobileMenu}>
                    Gebruikers 
                </Link>
            </li>
                          
            <li className = 'nav-item'>
                <Link to = '/contact' className = 'nav-links' onClick = {closeMobileMenu}>
                    Contact
                </Link>
            </li>
          
          </ul>
          <NavLink to = '/login'><Button buttonSize='btn--medium'>Log In</Button></NavLink>
        </nav>
       );
}

export default Navbar;