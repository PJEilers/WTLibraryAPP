import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

function Permission() {
    const cookies = new Cookies();
    let permission = false;
    
    if (cookies.get('adminRechten') === 'true') {
        permission = true;
    }

    return permission ? <Outlet/> : <Navigate to='/'/>;
}

export default Permission;