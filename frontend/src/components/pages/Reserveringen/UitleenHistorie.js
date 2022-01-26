import './UitleenHistorie.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';
import { persoonContext } from '../../../App';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);

    const persoonInfo = useContext(persoonContext);

    const uitleenData = () => {
        fetch('http://localhost:8080/historie/' + persoonInfo.persoonId, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setUitleningen(data);
                console.log(data)
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }

    useEffect(() => {
        uitleenData();
    }, [])


    return (
        <div onClick={() => {console.log(persoonInfo.adminRechten)}}>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Exemplaar Label</th>
                            {(persoonInfo.adminRechten === 'true' || (persoonInfo.adminRechten && persoonInfo.adminRechten !== 'false')) &&  <th>Persoon</th>}
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningen.map(uitlening => (
                            <tr key={uitlening.id}>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                {(persoonInfo.adminRechten === 'true' || (persoonInfo.adminRechten && persoonInfo.adminRechten !== 'false')) && <td>{uitlening.persoon}</td>}                                
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