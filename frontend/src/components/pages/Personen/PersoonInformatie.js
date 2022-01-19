import './PersoonInformatie.css';
import React from "react";
import { useState } from "react";


function PersoonInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [personen, setPersonen] = useState([]);
    const [gezochtePersonen, setGezochtePersonen] = useState([]);
    const [naam, setNaam] = useState('')
    const [succesBericht, setSuccesBericht] = useState('');    
    const[opstarten, setOpstarten] = useState(false);

    const haalPersonenOp = () => {
        fetch("http://localhost:8080/personen/")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (Object.entries(result).length > 0) {
                        setPersonen(result);
                        setSuccesBericht("Gevonden!")
                        setGezochtePersonen(result);
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

    const haalPersonenOpNaam = (naam) => {
        setNaam(naam);
        let filterData = personen.filter(v => v.naam.toLowerCase().includes(naam.toLowerCase()));
        if (Object.entries(filterData).length > 0) {
            setGezochtePersonen(filterData);
            setSuccesBericht("Personen gevonden")
        } else {
            setGezochtePersonen(personen);
            setSuccesBericht("Geen overeenkomend persoon gevonden")
        }

    };

    if (!opstarten) {
        haalPersonenOp();
        setOpstarten(true);
    }

    return (
        <div>
            <input type="string" defaultValue={naam}
                onChange={e => {haalPersonenOpNaam(e.target.value)}} />
            <button onClick={() => haalPersonenOpNaam()}>Zoek Personen</button>
            <table>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {PersonenTabel(gezochtePersonen)}
                </tbody>
            </table>
            <p>{succesBericht}</p>

        </div>
    );


}
export default PersoonInformatie;

function PersonenTabel(personen) {
    return (
        <>
            {personen.map(persoon =>
                <tr>
                    <td>
                        {persoon.naam}
                    </td>
                    <td>
                        {persoon.email}
                    </td>
                </tr>
            )
            }
        </>
    );
}