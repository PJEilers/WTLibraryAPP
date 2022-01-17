import React, {Component} from 'react';
import { MenuItems } from './MenuItems';
import  Logout  from '../pages/Login/Logout'
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
               
         <NavLink to= "/">
                <img src={require('../../images/LogoWT.PNG')} alt='WTlogo' className = 'navbar-logo' />
        </NavLink>
            {/* <h1 className = "navbar-logo">WT Library<i className = "fab fa-react"></i></h1> */}
                <div className = "menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                        return (
                            <li key ={index}>
                                <a className = {item.cName} href = {item.url}> 
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Logout setPersoonInfo = {this.props.setPersoonInfo}/>
            </nav>
         )
    }
}

export default Navbar;