import React, { useState } from 'react';
import { BookMenuItems } from './BookMenuItems';
import { Button } from '../Styling/Button';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from './BookDropdown'
import GebruikerDropdown from './GebruikerDropdown'
import { GebruikerMenuItems } from './GebruikerMenuItems';
//import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'


function Navbar() {
    const [click2, setClick2] = useState(false);
    const handleClick2 = () => setClick2(!click2);

    const closeMobileMenu = () => setClick2(false);
    const [dropdown, setDropdown] = useState(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    }

    const onMouseLeave = () => {
        if (window.innerwidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <nav className="NavbarItems">
            <NavLink to="/">
                <img src={require('../../images/LogoWT.PNG')} alt='WTlogo' className='navbar-logo' />
            </NavLink>
            <div className="menu-icon" onClick={handleClick2}>
                <i className={click2 ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click2 ? 'nav-menu active' : 'nav-menu'}>

                <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to='/boeken' className='nav-links' onClick={closeMobileMenu}>
                        Boeken <i className='fas fa-caret-down' />
                    </Link>
                    {dropdown && <Dropdown props={BookMenuItems} />}
                </li>

                <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to='/reserveringen' className='nav-links' onClick={closeMobileMenu}>
                        Reserveringen <i className='fas fa-caret-down' />
                    </Link>
                    {dropdown && <Dropdown props={GebruikerMenuItems} />}
                </li>
                
                <DropDownMenu url1={'/reserveringen'} menuItems1={GebruikerMenuItems} />
                <DropDownMenu url1={'/boeken'} menuItems1={GebruikerMenuItems} />

                <li className='nav-item'>
                    <Link to='/gebruikers' className='nav-links' onClick={closeMobileMenu}>
                        Gebruikers
                    </Link>
                </li>

                <li className='nav-item'>
                    <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                        Contact
                    </Link>
                </li>

            </ul>
            <NavLink to='/login'><Button buttonSize='btn--medium'>Log In</Button></NavLink>
        </nav>
    );
}

export default Navbar;

const DropDownMenu = ({ url1 , menuItems1 }) => {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const closeMobileMenu = () => setClick(false);
    const [url, setUrl] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    }

    const onMouseLeave = () => {
        if (window.innerwidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <div>
            <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Link to={url1} className='nav-links' onClick={closeMobileMenu}>
                    Placeholder <i className='fas fa-caret-down' />
                </Link>
                {dropdown && <Dropdown props={menuItems1} />}
            </li>
        </div>

    )

}