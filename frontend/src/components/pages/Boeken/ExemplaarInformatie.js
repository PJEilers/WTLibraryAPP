import './ExemplaarInformatie.css';
import '../../Styling/Table.css';
import React from "react";
import { useState, useEffect } from "react";
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

    const setUitleningInfo = (exemplaar) => {
        setNieuweUitlening(true);
        setHuidigExemplaar(exemplaar);
        setUitleningToegevoegd(false);
    }

    // Als je niet van BoekTabel.js afkomt
    const setPersoonUitlening = (exemplaar) => {
        huidigExemplaar && setHuidigExemplaar(exemplaar);
        nieuweUitleningToevoegen(props.persoon, exemplaar, props.reserveringId);
    }

    const selectDropdown = (exemplaar) => {
        if (uitleningToegevoegd && exemplaar === huidigExemplaar) {
            return <>Uitlening toegevoegd</>;//als een uitlening net is gemaakt wordt dit ipv dropdown weergegeven
        }
        return (
            //maakt de dropdown selectie
            <select className={exemplaar.status === "BESCHIKBAAR" ? "StatusBeschikbaar" : "StatusUitgeleend"} id={'select' + exemplaar.id} onChange={() => pasExemplaarStatusAan(exemplaar)}>
                <option value='none'>{exemplaar.status}</option>
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

    const nieuweUitleningToevoegen = (persoonId, exemplaar, reserveringId) => {
        if (uitleningToevoegen(persoonId, exemplaar, reserveringId)) {
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

    //zorgt ervoor dat de exemplaar informatie tabel wordt aangepast als er iets verandert wordt door een user
    useEffect(() => {
        setBoekId(props.boekId);
        haalExemplarenOp(props.boekId);
    }, [detectVerandering, props.boekId]);


    const pasExemplaarStatusAan = (exemplaar) => {
        var selectID = 'select' + exemplaar.id;
        //als voor uitlenen is gekozen wordt de functie die het uitlenen regelt aangeroepen
        //de if statement checkt ook nog of een boek niet is uitgeleend als voor uitlenen wordt gekozen
        if (document.getElementById(selectID).value === 'UITGELEEND' &&
            exemplaar.status !== 'UITGELEEND') {
            {
                props.persoon ?
                    setPersoonUitlening(exemplaar)
                    :
                    setUitleningInfo(exemplaar);
            }
            //als voor beschikbaar of onbruikbaar is gekozen wordt de status van het exemplaar geupdate
        } else if (document.getElementById(selectID).value !== 'UITGELEEND') {
            exemplaar.status = document.getElementById(selectID).value;
            postRequest(connectieString + '/updateexemplaarstatus', exemplaar)
                .then(() => {
                    //zorgt ervoor dat de dropdown weer juist wordt weergegeven als er iets is aangepast
                    document.getElementById(selectID).value = 'none';
                    setDetectVerandering(!detectVerandering);
                })
                .catch(error => console.log(error));
            //als er geprobeerd wordt een uitgeleend boek uit te lenen    
        } else {
            alert("Dit boek is al uitgeleend!");
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
                        {/* Wordt alleen aangeroepen vanuit BoekTabel.js als je een uitlening regelt */}
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