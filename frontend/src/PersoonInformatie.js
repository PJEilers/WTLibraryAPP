import './PersoonInformatie.css';
import React from "react";
import { useState } from "react";


function PersoonInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [personen, setPersonen] = useState([]);
    const [naam, setNaam] = useState('')
    const [succesBericht, setSuccesBericht] = useState('');

    const haalPersonenOpNaam = () => {
        fetch("http://localhost:8080/zoekpersoonvianaam/" + naam)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (Object.entries(result).length > 0) {
                        setPersonen(result);
                        setSuccesBericht("Gevonden!")
                    } else {
                        setSuccesBericht("Geen overeenkomend persoon gevonden")
                    }

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    };


    return (
        <div>
            <input type="string" defaultValue={naam}
                onChange={e => setNaam(e.target.value)} />
            <button onClick={() => haalPersonenOpNaam()}>Haal Personen Op</button>
            <table>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {personen.map(persoon =>
                        <tr>
                            <td>
                                {persoon.naam}
                            </td>
                            <td>
                                {persoon.email}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p>{succesBericht}</p>

        </div>
    );


}
export default PersoonInformatie;