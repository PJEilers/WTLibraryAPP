import './UitleenHistorie.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);

    const uitleenData = () => {
        fetch('http://localhost:8080/historie', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setUitleningen(data);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }

    // if (firstBoot) {
    //     uitleenData();
    //     setFirstBoot(false);
    // }
    useEffect(() => {
        uitleenData();
    }, [])

    return (
        <div>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Exemplaar ID</th>
                            <th>Persoon</th>
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningen.map(uitlening => (
                            <tr key={uitlening.id}>
                                <td>{uitlening.id}</td>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                <td>{uitlening.persoon}</td>
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