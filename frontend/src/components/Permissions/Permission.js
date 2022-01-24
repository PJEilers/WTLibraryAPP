import React from 'react';
import { useContext } from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {persoonContext} from '../../App.js';

function Permission() {
    const persoonInfo = useContext(persoonContext);
    let permission = false;

    if (persoonInfo.adminRechten === 'true' || persoonInfo.adminRechten) {
        permission = true;
    }

    return permission ? <Outlet/> : <Navigate to='/'/>;
}

export default Permission;