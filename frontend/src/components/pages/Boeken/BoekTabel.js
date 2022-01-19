import './BoekTabel.css';
import React from "react";
import { useState } from "react";
import Reserveren from '../Reserveringen/Reserveren';
import ExemplarenToevoegen from './ExemplarenToevoegen';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import '../../Styling/Popup.css'
import { TableStyle } from '../../Styling/Table';
import styled from 'styled-components';


function MaakBoekTabel() {
    const [boeken, setBoeken] = useState([]);
    const [boekenWeergeven, setBoekenWeergeven] = useState([]);
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false)
    const [boekTitel, setBoekTitel] = useState('');
    const [boekTags, setBoekTags] = useState('');
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);

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

    function NieuweExemplarenToevoegen(props) {
        return (
            <ExemplarenToevoegen boekToegevoegd={true} boektitel={boekTitel}
                boekID={props} />
        )

    }

    const closePopup = () => setNieuweExemplaren(false)

    if (!opstarten) {
        laadData();
        setBoekenWeergeven(boeken);
        setOpstarten(true);
    }

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
                            <th>Exemplaren Totaal</th>
                            <th>Exemplaren Beschikbaar</th>
                            <th>Reserveer</th>
                            <th>Exemplaar Toevoegen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boekenWeergeven.map(boek => (
                            <tr key={boek.id}>
                                <td>{boek.id}</td>
                                <td>{boek.titel}</td>
                                <td>{boek.auteur}</td>
                                <td>{boek.isbn}</td>
                                <td>{boek.tags}</td>
                                <td>{boek.exemplarenTotaal}</td>
                                <td>{boek.beschikbaar}</td>
                                <td><Reserveren boekId={boek.id} persoonId={1} /></td>
                                <td>
                                    <Button onClick={() => { setNieuweExemplaren(true); setBoekId(boek.id); }}>Exemplaren Toevoegen</Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableStyle>
            <Popup open={nieuweExemplaren} onClose= {() => setNieuweExemplaren(false)} modal>
                <div className="modal">
                    <button className="close" onClick={closePopup}> &times; </button>
                    {NieuweExemplarenToevoegen(boekId)}
                </div>
            </Popup>

        </div>

    );
}

export default MaakBoekTabel;