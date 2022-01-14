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
        setSuccesBericht('');
        setBoekId(e.target.value)
    }

    const isUitgeleend = (b) => {
        return (b ? "ja " : "nee");
    }

    const hoeveelheidUitgeleend = (exemplaren) => {
        let total = 0;
        exemplaren.map(exemplaar => {
            total += exemplaar.status;
        });
        return total;
    }


    const haalExemplarenOp = () => {
        fetch("http://localhost:8080/boekexemplaren/" + boekId)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.Hoeveelheid > 0) {
                        setIsLoaded(true);
                        //Sorteer op individueel id          
                        setExemplaren(result.ExemplarenStatus.sort((e1, e2) => e1.exemplaar.individueelId > e2.exemplaar.individueelId));
                        setHoeveelExemplaren(result.Hoeveelheid);
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
            <input type="number" defaultValue={1} min={1}
                onChange={nieuwBoekId} />
            <button onClick={() => haalExemplarenOp()}>Haal Exemplaren Op</button>
            <p>Van de {hoeveelexemplaren} boeken zijn er {hoeveelheidUitgeleend(exemplaren)} uitgeleend</p>
            <table>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Uitgeleend</th>
                    </tr>
                </thead>
                <tbody>
                    {exemplaren.map(exemplaar => (
                        <tr>
                            <td key={exemplaar.exemplaar.id}>
                                {"WT-" + boekId + "." + exemplaar.exemplaar.individueelId}
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