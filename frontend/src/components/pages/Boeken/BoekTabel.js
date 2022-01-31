import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Reserveren from '../Reserveringen/Reserveren';
import ExemplarenToevoegen from './ExemplarenToevoegen';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import '../../Styling/Popup.css'
import { TableStyle } from '../../Styling/Table';
import '../../Styling/Table.css'
import { permissionContext } from '../../../App.js';
import ExemplaarInformatie from './ExemplaarInformatie';
import { ZoekveldStyling } from '../../Styling/ZoekveldStyling';
import { connectieString, getRequest } from "../../../Constanten";

function MaakBoekTabel(props) {
    const [boeken, setBoeken] = useState([]);
    const [boekenWeergeven, setBoekenWeergeven] = useState([]);
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false);
    const [exemplarenLijst, setExemplarenLijst] = useState(false);
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);
    const permission = useContext(permissionContext);
    const [filterWoord, setFilterWoord] = useState('');

    const laadData = () => {
        getRequest('/boeken')
            .then(response =>
                response.json()
            )
            .then(data => {
                setBoeken(data);
                setBoekenWeergeven(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const zoekFunctie = (waarde) => {

        let filterData = [];

        setFilterWoord(waarde)

        filterData = boeken.filter(boek => {
            let termaanwezigheid = false;

            Object.entries(boek).map(([key, value]) => {
                if (!termaanwezigheid) {
                    termaanwezigheid = (value !== null ? value.toString().toLowerCase().includes(waarde.toLowerCase()) : false);
                }
            });

            return (termaanwezigheid);
        })
        setBoekenWeergeven(filterData);
    }

    // Dit wordt telkens uitgevoerd als nieuweExemplaren verandert, dus na sluiten popup ExemplaarToevoegen
    useEffect(() => {
        laadData();
        setBoekenWeergeven(boeken);
    }, [nieuweExemplaren, exemplarenLijst, opstarten])

    return (
        <div>
            <ZoekveldStyling>
                <h1>
                    <input type="text" placeholder='Zoeken...' value={filterWoord}
                        onChange={e => zoekFunctie(e.target.value)} />
                    <button onClick={() => setOpstarten(!opstarten)}>Reset</button>
                </h1>
            </ZoekveldStyling>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Boek ID</th>
                            <th>Titel</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Tags</th>
                            <th>Beschikbaar</th>
                            {permission && <th>Uitleningen</th>}
                            {!props.persoon && <th>Reserveer</th>}
                            {permission && <th>Exemplaar Toevoegen</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {boekenWeergeven.map(boek => (
                            <tr key={boek.id}>
                                <td >{boek.id}</td>
                                {permission ?
                                    <td className='Boek' onClick={() => { setExemplarenLijst(true); setBoekId(boek.id) }}>{boek.titel}</td>
                                    :
                                    <td>{boek.titel}</td>
                                }
                                <td>{boek.auteur}</td>
                                <td>{boek.isbn}</td>
                                <td>{boek.tags}</td>
                                {permission ?
                                    <td>{boek.beschikbaar}/{boek.exemplarenTotaal}</td>
                                    :
                                    <td>{boek.beschikbaar !== 0 ? 'Op Voorraad' : 'Niet op Voorraad'}</td>
                                }
                                {permission && <td>{boek.hoeveeluitleningen}</td>}
                                {/* Check of je van PersoonInformatie komt of niet. */}
                                {!props.persoon && <td><Reserveren boekId={boek.id} /></td>}
                                {permission &&
                                    <td>
                                        <Button onClick={() => { setNieuweExemplaren(true); setBoekId(boek.id); }}>Exemplaren Toevoegen</Button>
                                    </td>
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableStyle>
            <Popup open={nieuweExemplaren} onClose={() => { setNieuweExemplaren(false); }} modal>
                <div className="modal">
                    <button className="close" onClick={() => setNieuweExemplaren(false)}> &times; </button>
                    <ExemplarenToevoegen boekToegevoegd={true}
                        boekID={boekId} />
                </div>
            </Popup>
            <Popup open={exemplarenLijst} onClose={() => setExemplarenLijst(false)} modal closeOnDocumentClick={false}>
                <div className="modal">
                    <button className="close" onClick={() => setExemplarenLijst(false)}> &times; </button>
                    <ExemplaarInformatie boekId={boekId} persoon={props.persoon} />
                    <br />
                    <Button onClick={() => setExemplarenLijst(false)}>Klaar</Button>
                </div>
            </Popup>

        </div>

    );
}

export default MaakBoekTabel;