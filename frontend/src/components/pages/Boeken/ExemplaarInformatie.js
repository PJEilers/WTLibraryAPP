import './ExemplaarInformatie.css';
import React from "react";
import { useState } from "react";


function ExemplaarInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exemplaren, setExemplaren] = useState([]);
    const [hoeveelexemplaren, setHoeveelExemplaren] = useState(0);
    const [succesBericht, setSuccesBericht] = useState('');
    const [boekId, setBoekId] = useState(1);

    const nieuwBoekId = (e) => {
        setExemplaren([]);
        setHoeveelExemplaren(0);
        setSuccesBericht('');
        setBoekId(e.target.value)
    }

    const isUitgeleend = (b) => {
        if (b === "BESCHIKBAAR"){
            return "Beschikbaar";
        } else if (b === "ONBRUIKBAAR") {
            return "Onbruikbaar";
        } else {
            return "Uitgeleend";
        }
    }

    const hoeveelheidUitgeleend = (exemplaren) => {
        let total = 0;
        exemplaren.map(exemplaar => {
            if (exemplaar.status === "UITGELEEND") {
                total += 1;
            }
            
        });
        return total;
    }


    const haalExemplarenOp = () => {
        fetch("http://localhost:8080/boekexemplaren/" + boekId)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.length > 0) {
                        setIsLoaded(true);

                        //Sorteer op individueel id          
                        setExemplaren(result);
                        setSuccesBericht('Gelukt!');
                        setHoeveelExemplaren(result.length);
                    } else {
                        setSuccesBericht('Geen exemplaren van boekId: ' + boekId)
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
            <input type="number" defaultValue={1} min={1}
                onChange={nieuwBoekId} />
            <button onClick={() => haalExemplarenOp()}>Haal Exemplaren Op</button>
            <p>Van de {hoeveelexemplaren} boeken zijn er {hoeveelheidUitgeleend(exemplaren)} uitgeleend</p>
            <table>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {exemplaren.map(exemplaar => (
                        <tr>
                            <td key={exemplaar.id}>
                                {"WT-" + boekId + "." + exemplaar.individueelId}
                            </td>
                            <td>
                                {isUitgeleend(exemplaar.status)}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <p>{succesBericht}</p>




        </div>
    );


}
export default ExemplaarInformatie;