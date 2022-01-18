import './UitleenHistorie.css';
import React from 'react';
import { useState } from 'react';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const [firstBoot, setFirstBoot] = useState(true);

    const laadData = () => {
        fetch('http://localhost:8080/uitleningen', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setUitleningen(data);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }

    if (firstBoot) {
        laadData();
        setFirstBoot(false);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Exemplaar ID</th>
                        <th>Persoon ID</th>
                        <th>Begin Datum</th>
                        <th>Eind Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {uitleningen.map(uitlening => (
                        <tr key={uitlening.id}>
                            <td>{uitlening.id}</td>
                            <td>{uitlening.exemplaarId}</td>
                            <td>{uitlening.persoonId}</td>
                            <td>{uitlening.beginDatum}</td>
                            <td>n.n.b.</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UitleenHistorieTabel;