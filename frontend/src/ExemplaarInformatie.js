import './ExemplaarInformatie.css';
import React from "react";
import { useState } from "react";


function ExemplaarInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exemplaren, setExemplaren] = useState([]);
    const [hoeveelexemplaren, setHoeveelExemplaren] = useState(0);
    const [statusexemplaren, setStatusExemplaren] = useState([]);
    const [succesBericht, setSuccesBericht] = useState('');
    const [boekId, setBoekId] = useState(1);

    const nieuwBoekId = (e) => {
        setExemplaren([]);
        setHoeveelExemplaren(0);
        setStatusExemplaren([]);
        setBoekId(e.target.value)
    }


    const haalExemplarenOp = () => {
        fetch("http://localhost:8080/boekexemplaren/" + boekId)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.Hoeveelheid > 0) {
                    setIsLoaded(true);        
                    //Sorteer op individueel id          
                    setExemplaren(result.Exemplaren.sort((e1, e2) => e1.individueelId > e2.individueelId)); 
                    setHoeveelExemplaren(result.Hoeveelheid);
                    setStatusExemplaren(result.Status); //Wordt nog veranderd in de backend
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
                        <th>Label</th>
                        <th>Status Lening</th>
                        <th>Hoeveelheid</th>
                    </tr>
                </thead>

                {exemplaren.map(exemplaar => (
                    <>
                        <tbody>
                            <td key={exemplaar.id}>
                                {"WT-" + boekId + "." + exemplaar.individueelId}
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