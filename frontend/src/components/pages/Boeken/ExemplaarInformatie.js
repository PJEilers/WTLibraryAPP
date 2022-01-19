import './ExemplaarInformatie.css';
import React from "react";
import { useState } from "react";
import { Button } from "../../Styling/Button"
import Popup from 'reactjs-popup';
import PersoonInformatie from '../Personen/PersoonInformatie';
import { uitleningToevoegen } from '../../../Constanten.js'


function ExemplaarInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exemplaren, setExemplaren] = useState([]);
    const [hoeveelexemplaren, setHoeveelExemplaren] = useState(0);
    const [nieuweUitlening, setNieuweUitlening] = useState(false);
    const [succesBericht, setSuccesBericht] = useState('');
    const [boekId, setBoekId] = useState(1);
    const [uitleningToegevoegd, setUitleningToegevoegd] = useState(false);
    const [huidigExemplaar, setHuidigExemplaar] = useState(null);

    const nieuwBoekId = (e) => {
        setExemplaren([]);
        setHoeveelExemplaren(0);
        setSuccesBericht('');
        setBoekId(e.target.value)
    }

    const setUitleningInfo = (exemplaar) => {
        setNieuweUitlening(true);
        setHuidigExemplaar(exemplaar);
        setUitleningToegevoegd(false);
    }

    const setPersoonUitlening = (exemplaar) => {
        setHuidigExemplaar(exemplaar);
        nieuweUitleningToevoegen(props.persoon.id, exemplaar);
    }

    const isUitgeleend = (status) => {
        return status.charAt(0) + status.slice(1).toLowerCase();
    }

    const uitleningBericht = (exemplaar) => {
        if (uitleningToegevoegd && exemplaar === huidigExemplaar) {
            return <td>Uitlening toegevoegd</td>;
        }
        return <td></td>;
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

    const nieuweUitleningToevoegen = (persoonId, exemplaar) => {
        //console.log(uitleningToevoegen(persoonId, exemplaar))
        if (uitleningToevoegen(persoonId, exemplaar)) {
            setUitleningToegevoegd(true);
            setNieuweUitlening(false);
            exemplaar.status = "UITGELEEND";
        }
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
                        console.log(result)
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
                        <th></th>
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
                            {exemplaar.status === 'BESCHIKBAAR' ?
                                <td >
                                    {props.persoon ?
                                        <Button onClick={() => setPersoonUitlening(exemplaar)}>Leen Uit</Button>
                                        :
                                        <Button onClick={() => setUitleningInfo(exemplaar)}>Uitlenen</Button>
                                    }

                                </td> : uitleningBericht(exemplaar)}
                        </tr>
                    ))}
                    <Popup open={nieuweUitlening} modal onClose={() => setNieuweUitlening(false)}>
                        <div className="modal">
                            <button className="close" onClick={() => setNieuweUitlening(false)}> &times; </button>
                            <PersoonInformatie nieuweUitleningToevoegen={nieuweUitleningToevoegen}
                                exemplaar={huidigExemplaar} />
                        </div>
                    </Popup>
                </tbody>

            </table>
            <p>{succesBericht}</p>

        </div>
    );


}
export default ExemplaarInformatie;