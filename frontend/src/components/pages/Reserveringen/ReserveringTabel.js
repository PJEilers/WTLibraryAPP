import './ReserveringTabel.css';
import React from "react";
import { useState } from "react";

function MaakReserveringTabel() {
    const[reserveringen, setReserveringen] = useState([]);
    const[opstarten, setOpstarten] = useState(false);
    const[personen, setPersonen] = useState([]);

    const laadData = () => {

        fetch('http://localhost:8080/reserveringMetPersoonEnBoek', {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            setReserveringen(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })

    }

    if (!opstarten) {
        laadData();
        setOpstarten(true);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Reservering ID</th>
                        <th>Boek ID</th>
                        <th>Persoon ID</th>
                        <th>Naam</th>
                        <th>Email</th>
                        <th>Datum</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reserveringen.map(reservering => (
                        <tr key={reservering.id}>
                            <td>{reservering.id}</td>
                            <td>{reservering.boekId}</td>
                            <td>{reservering.persoonId}</td>
                            <td>{reservering.naam}</td>
                            <td>{reservering.email}</td>
                            <td>{reservering.datum}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MaakReserveringTabel;