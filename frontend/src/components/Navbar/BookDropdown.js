import React, {Component , useState} from 'react';
import { BookMenuItems } from './BookMenuItems';
import { Link } from 'react-router-dom';
import './Dropdown.css'

function Dropdown (props) {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
   
    return(
    <>
    <ul onClick={handleClick} className = {click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {props.map((item, index) => {
            return(
                <li key = {index}>
                    <Link className = {item.cName} to ={item.url} onClick = {() => setClick(false)}>
                        {item.title}
                    </Link>
                </li>
            )
        })}
    </ul>
    </>

);
}

export default Dropdown;