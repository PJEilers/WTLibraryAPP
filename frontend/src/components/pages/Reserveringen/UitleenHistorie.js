import './UitleenHistorie.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';
import { persoonContext } from '../../../App';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);

    const persoon = useContext(persoonContext);

    const uitleenData = () => {
        fetch('http://localhost:8080/historie/' + persoon.persoonId, { mode: 'cors' })
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
        <div>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Exemplaar ID</th>
                            {persoon.adminRechten ? <td>Persoon</td> : null}
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningen.map(uitlening => (
                            <tr key={uitlening.id}>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                {persoon.adminRechten ? <td>{uitlening.persoon}</td> : null}                                
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