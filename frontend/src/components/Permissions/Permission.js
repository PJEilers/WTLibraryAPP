import React from 'react';
import { useContext } from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {cookieContext, persoonContext} from '../../App.js';

function Permission() {
    const persoonInfo = useContext(persoonContext);
    let permission = false;    

    // if(persoonInfo.adminRechten) {
    //     console.log('aanwezig')
    //     console.log(persoonInfo.adminRechten)
    // } else {
    //     console.log('niet aanwezig')
    //     console.log(persoonInfo.adminRechten)
    // }

    if (persoonInfo.adminRechten === 'true' || (persoonInfo.adminRechten && persoonInfo.adminRechten !== 'false')) {
        permission = true;
    }

    //if (Cookies.get('persoonId')) {
        
    //}

    //console.log(persoonInfo.adminRechten);

    return permission;
    //return permission ? <Outlet/> : <Navigate to='/'/>;
}

export default Permission;