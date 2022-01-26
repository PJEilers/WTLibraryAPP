import './ExemplaarInformatie.css';
import '../../Styling/Table.css';
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../Styling/Button"
import Popup from 'reactjs-popup';
import PersoonInformatie from '../Personen/PersoonInformatie';
import { uitleningToevoegen, postRequest, connectieString } from '../../../Constanten.js'
import { TableStyle } from '../../Styling/Table';


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
    const [detectVerandering, setDetectVerandering] = useState(false);

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
        nieuweUitleningToevoegen(props.persoon, exemplaar);
    }

    const isUitgeleend = (status) => {
        return status.charAt(0) + status.slice(1).toLowerCase();
    }

    const selectDropdown = (exemplaar) => {
        if (uitleningToegevoegd && exemplaar === huidigExemplaar) {
            return <>Uitlening toegevoegd</>;//als een uitlening net is gemaakt wordt dit ipv dropdown weergegeven
        }
        return (
            //maakt de dropdown selectie
            <select className={exemplaar.status === "BESCHIKBAAR" ? "StatusBeschikbaar" : "StatusUitgeleend"} id={'select'+exemplaar.id} onChange={() => pasExemplaarStatusAan(exemplaar)}>
                <option value=''>{exemplaar.status}</option>
                {exemplaar.status === 'BESCHIKBAAR' ? //zorgt ervoor dat alleen de andere mogelijke statussen een keuze zijn
                    <>
                        <option value='ONBRUIKBAAR'>Onbruikbaar</option>
                        <option value='UITGELEEND'>Uitlenen</option>
                    </>
                    :
                    exemplaar.status === 'ONBRUIKBAAR' ?
                        <option value='BESCHIKBAAR'>Beschikbaar</option>
                        :
                        <>
                            <option value='BESCHIKBAAR'>Beschikbaar</option>
                            <option value='ONBRUIKBAAR'>Onbruikbaar</option>
                        </>
                }
            </select>
        );
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

    const haalExemplarenOp = (boekId) => {
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

    useEffect(() => {
        setBoekId(props.boekId);
        haalExemplarenOp(props.boekId);
    }, []);

    useEffect(() => {
        setBoekId(props.boekId);
        haalExemplarenOp(props.boekId);
    }, [detectVerandering]);

    const pasExemplaarStatusAan = (exemplaar) => {
        var selectID = 'select'+exemplaar.id;

        //als voor uitlenen is gekozen wordt de functie die het uitlenen regelt aangeroepen
        if (document.getElementById(selectID).value === 'UITGELEEND' && 
            exemplaar.status !== 'UITGELEEND') {
                {props.persoon ?
                    <Button onClick={() => setPersoonUitlening(exemplaar)}>Leen Uit</Button>
                    :
                    setUitleningInfo(exemplaar);
                }
        } else {//als voor beschikbaar of onbruikbaar is gekozen wordt de status van het exemplaar geupdate
            exemplaar.status = document.getElementById(selectID).value;
            postRequest(connectieString+'/updateexemplaarstatus', exemplaar)
            .then(() => {
                setDetectVerandering(!detectVerandering);
            })
            .catch(error => console.log(error));
        }
    }


    return (
        <div>
            <p>Van de {hoeveelexemplaren} boeken zijn er {hoeveelheidUitgeleend(exemplaren)} uitgeleend</p>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exemplaren.map(exemplaar => (
                            <tr key={exemplaar.id}>
                                <td>
                                    {"WT-" + boekId + "." + exemplaar.individueelId}
                                </td>
                                <td className={exemplaar.status === "BESCHIKBAAR" ? "StatusBeschikbaar" : "StatusUitgeleend"}>
                                    {selectDropdown(exemplaar)}
                                </td>
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
            </TableStyle>

        </div>
    );


}
export default ExemplaarInformatie;