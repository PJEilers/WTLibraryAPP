
import { useState, Component, useContext } from 'react';
import { Button } from '../Styling/Button';
import  Logout  from '../pages/Login/Logout'
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from './Dropdown'
import { GebruikerMenuItems } from './GebruikerMenuItems';
import { BookMenuItems } from './BookMenuItems';
import { ReserveringMenuItems } from './ReserveringMenuItems'
import { persoonContext } from '../../App';

const DropDownMenu = ({navItem, url1 , menuItems1 }) => {
    
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const closeMobileMenu = () => setClick(false);
    
    const [url, setUrl] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

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
                  {navItem}  <i className='fas fa-caret-down' />
                </Link>
                {dropdown && <Dropdown props={menuItems1} />}
            </li>
        </div>

    )

}

function Navbar(props) {
    const [click2, setClick2] = useState(false);
    const handleClick2 = () => setClick2(!click2);

    const closeMobileMenu = () => setClick2(false);
    const [dropdown, setDropdown] = useState(false);

    const persoonInfo = useContext(persoonContext);

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
                {(persoonInfo.adminRechten === 'true' || persoonInfo.adminRechten) &&
                    <>
                        <DropDownMenu navItem='Boeken' url1={'/boeken'} menuItems1={BookMenuItems} />
                        <DropDownMenu navItem='Reserveringen' url1={'/reserveringen'} menuItems1={ReserveringMenuItems} />
                        <DropDownMenu navItem='Gebruikers' url1={'/gebruikers'} menuItems1={GebruikerMenuItems} />
                    </>
                }
                {(persoonInfo.adminRechten === 'false' || ! persoonInfo.adminRechten) && 
                    <>
                        <li className='nav-item'>
                            <Link to='/boekenlijst' className='nav-links' onClick={closeMobileMenu}>
                                Boekenlijst
                            </Link>
                        </li>
                    </>
                }

                <li className='nav-item'>
                    <NavLink to='/contact' className='nav-links' onClick={closeMobileMenu}>
                        Contact
                    </NavLink>
                </li>

            </ul>
            <Logout setPersoonInfo = {props.setPersoonInfo}/>
        </nav>
    );
}

export default Navbar;