import './ExemplaarInformatie.css';
import React from "react";
import { useState } from "react";
import { Button } from "../../Styling/Button"
import Popup from 'reactjs-popup';
import PersoonInformatie from '../Personen/PersoonInformatie';
import { connectieString, postRequest } from '../../../Constanten.js'


function ExemplaarInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exemplaren, setExemplaren] = useState([]);
    const [hoeveelexemplaren, setHoeveelExemplaren] = useState(0);
    const [nieuweUitlening, setNieuweUitlening] = useState(false);
    const [succesBericht, setSuccesBericht] = useState('');
    const [boekId, setBoekId] = useState(1);
    const [uitleningToegevoegd, setUitleningToegevoegd] = useState(false);
    const [huidigExemplaar, setHuidigExemplaar] =useState(null);

    const nieuwBoekId = (e) => {
        setExemplaren([]);
        setHoeveelExemplaren(0);
        setSuccesBericht('');
        setBoekId(e.target.value)
    }

    const setUitleningInfo =  (exemplaar) => {
        setNieuweUitlening(true);
        setHuidigExemplaar(exemplaar);
        setUitleningToegevoegd(false);
    }

    const isUitgeleend = (b) => {
        return (b ? "ja " : "nee");
    }

    const uitleningBericht = (exemplaar) => {
        if (uitleningToegevoegd && exemplaar === huidigExemplaar) {
            return <><br/>Uitlening toegevoegd</>;
        } 
        return null;
    }

    const hoeveelheidUitgeleend = (exemplaren) => {
        let total = 0;
        exemplaren.map(exemplaar => {
            total += exemplaar.status;
        });
        return total;
    }

    const nieuweUitleningToevoegen = (persoonId, exemplaar) => {
        const nieuweUitlening = {
            exemplaarId: exemplaar.exemplaar.id,
            persoonId: persoonId,
            beginDatum: new Date().toISOString().split('T')[0]
        }
        postRequest(connectieString + '/maakuitleningaan', nieuweUitlening).then(response => {
            if (response.ok) {
                response.json().then(uitlening => {
                    console.log(uitlening);
                    setUitleningToegevoegd(true);
                    setNieuweUitlening(false);
                })
            } else {
                console.log("mislukt");
            }
        }).catch(error => console.log(error));


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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exemplaren.map(exemplaar => (
                        <tr key={exemplaar.exemplaar.id}>
                            <td >
                                {"WT-" + boekId + "." + exemplaar.exemplaar.individueelId}
                            </td>
                            <td>
                                {isUitgeleend(exemplaar.status)}
                            </td>
                            {!exemplaar.status ?
                            <td >
                                <Button onClick={() => setUitleningInfo(exemplaar)}>Uitlenen</Button>
                                <Popup open={nieuweUitlening} modal>
                                    <div className="modal">
                                        <button className="close" onClick={() => setNieuweUitlening(false)}> &times; </button>
                                        <PersoonInformatie nieuweUitleningToevoegen={nieuweUitleningToevoegen}
                                            exemplaar={huidigExemplaar} />
                                    </div>
                                </Popup>
                                {uitleningBericht(exemplaar)}
                            </td> : null}
                        </tr>
                    ))}
                </tbody>

            </table>
            <p>{succesBericht}</p>




        </div>
    );


}
export default ExemplaarInformatie;