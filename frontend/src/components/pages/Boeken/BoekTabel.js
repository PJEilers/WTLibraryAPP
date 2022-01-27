import './BoekTabel.css';
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
import Permission from '../../Permissions/Permission';

function MaakBoekTabel(props) {
    const [boeken, setBoeken] = useState([]);
    const [boekenWeergeven, setBoekenWeergeven] = useState([]);
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false);
    const [exemplarenLijst, setExemplarenLijst] = useState(false);
    const [boekTitel, setBoekTitel] = useState('');
    const [boekTags, setBoekTags] = useState('');
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);
    const permission = useContext(permissionContext);
    console.log(permission)

    const laadData = () => {
        fetch('http://localhost:8080/boeken', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setBoeken(data);
                setBoekenWeergeven(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const zoekBoek = (watVeranderd, waarde) => {
        //const [filterData, setFilterData] = useState([]);
        let filterData = [];
        if (watVeranderd === 'titel') {
            setBoekTitel(waarde);
            filterData = boeken.filter(v => v.titel.toLowerCase().includes(waarde.toLowerCase()));
        } else {
            setBoekTags(waarde);
            if (waarde !== '') {
                filterData = boeken.filter(v => v.tags && v.tags.toLowerCase().includes(waarde.toLowerCase()));
            } else {
                filterData = boeken;
            }
        }
        setBoekenWeergeven(filterData);
    }


    const reset = () => {
        setBoekenWeergeven(boeken);
        setBoekTitel('');
        setBoekTags('');
        setOpstarten(false);
    }

    // Dit wordt telkens uitgevoerd als nieuweExemplaren verandert, dus na sluiten popup ExemplaarToevoegen
    useEffect(() => {
        laadData();
        setBoekenWeergeven(boeken);
    }, [nieuweExemplaren])

    return (
        <div>
            <input type="text" placeholder='Zoek op titel' value={boekTitel}
                onChange={e => zoekBoek('titel', e.target.value)} />
            <input type="text" placeholder='Zoek op tags' value={boekTags}
                onChange={e => zoekBoek('tags', e.target.value)} />
            <button onClick={() => reset()}>
                Reset
            </button>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Boek ID</th>
                            <th>Titel</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Tags</th>
                            <th>Exemplaren Beschikbaar</th>
                            {!props.persoon ? <th>Reserveer</th> : null}
                            {permission &&
                                <th>Exemplaar Toevoegen</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {boekenWeergeven.map(boek => (
                            <tr key={boek.id}>
                                <td >{boek.id}</td>
                                {permission && 
                                    <td className='Boek' onClick={() => { setExemplarenLijst(true); setBoekId(boek.id) }}>{boek.titel}</td>
                                }
                                <td>{boek.auteur}</td>
                                <td>{boek.isbn}</td>
                                <td>{boek.tags}</td>
                                <td>{boek.beschikbaar}/{boek.exemplarenTotaal}</td>
                                {/* Check of je van PersoonInformatie komt of niet. */}
                                {!props.persoon ? <td><Reserveren boekId={boek.id} /></td> : null}
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
                    <ExemplarenToevoegen boekToegevoegd={true} boektitel={boekTitel}
                        boekID={boekId} />
                </div>
            </Popup>
            <Popup open={exemplarenLijst} onClose={() => setExemplarenLijst(false)} modal closeOnDocumentClick={false}>
                <div className="modal">
                    <button className="close" onClick={() => setExemplarenLijst(false)}> &times; </button>
                    <ExemplaarInformatie boekId={boekId} persoon={props.persoon} />
                    <br/>
                    <Button onClick={() => setExemplarenLijst(false)}>Klaar</Button>
                </div>
            </Popup>

        </div>

    );
}

export default MaakBoekTabel;