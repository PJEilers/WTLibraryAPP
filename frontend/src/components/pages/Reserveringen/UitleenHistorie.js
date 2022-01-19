import './UitleenHistorie.css';
import React from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const [firstBoot, setFirstBoot] = useState(true);

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

    if (firstBoot) {
        uitleenData();
        setFirstBoot(false);
    }

    /*
    in de backend de juiste info verzamelen in uitleningen controller, en dan als 1 object naar de frontend
    ipv id uit de exemplaar tabel moet boekid.exemplaarid getoond worden
        -in exemplaar functie die
            -id, exemplaarid, boekid geeft
    ipv persoon id de naam van de persoon tonen
        -in persoon functie die
            -id, naam geeft
    */
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