import './ExemplaarInformatie.css';
import React from "react";
import { useState } from "react";


function ExemplaarInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exemplaren, setExemplaren] = useState([]);
    const [hoeveelexemplaren, setHoeveelExemplaren] = useState();
    const [statusexemplaren, setStatusExemplaren] = useState([]);
    const [succesBericht, setSuccesBericht] = useState('');
    const [boekId, setBoekId] = useState(1);


    const haalExemplarenOp = () => {
        fetch("http://localhost:8080/boekexemplaren/" + boekId)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.Exemplaren != null) {
                    setIsLoaded(true);
                    setExemplaren(result.Exemplaren);
                    setHoeveelExemplaren(result.Hoeveelheid);
                    setStatusExemplaren(result.Status);
                    setSuccesBericht('Gelukt!')
                    } else {
                        setSuccesBericht('Geen exemplaren van boek_id')
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
            <input type="number" defaultValue={1}
                                       onChange={e => setBoekId(e.target.value)}/>
            <button onClick={() => haalExemplarenOp()}>Haal Exemplaren Op</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status Lening</th>
                        <th>Hoeveelheid</th>
                    </tr>
                </thead>

                {exemplaren.map(exemplaar => (
                    <>
                        <tbody>
                            <td key={exemplaar.id}>
                                {exemplaar.id}
                            </td>
                            <td>
                                {statusexemplaren.toString()}
                            </td>
                            <td>
                                {hoeveelexemplaren}
                            </td>
                        </tbody>
                    </>

                ))}

            </table>
            <p>{succesBericht}</p> 




        </div>
    );


}
export default ExemplaarInformatie;