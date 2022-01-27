import './UitleenHistorie.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';
import { permissionContext, persoonContext } from '../../../App';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const permission = useContext(permissionContext);
    const persoonInfo = useContext(persoonContext);

    const uitleenData = () => {
        fetch('http://localhost:8080/historie/' + persoonInfo.persoonId, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setUitleningen(data);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }

    useEffect(() => {
        uitleenData();
    }, [])


    return (
        <div>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Exemplaar Label</th>
                            {permission && <th>Persoon</th>}
                            <th>Boek</th>
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningen.map((uitlening, index) => (
                            <tr key={index}>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                {permission && <td>{uitlening.persoon}</td>} 
                                <td>{uitlening.boek}</td>                                 
                                <td>{uitlening.beginDatum}</td>
                                <td>{uitlening.eindDatum}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableStyle>
        </div>
    );
}

export default UitleenHistorieTabel;