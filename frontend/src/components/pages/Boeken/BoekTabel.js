import '../../Styling/ZoekveldStyling.css'; //voor zoekveld styling
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Reserveren from '../Reserveringen/Reserveren';
import ExemplarenToevoegen from './ExemplarenToevoegen';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import '../../Styling/Popup.css'
import { TableStyle } from '../../Styling/Table';
import '../../Styling/Table.css'
import { persoonContext } from '../../../App.js';
import ExemplaarInformatie from './ExemplaarInformatie';

function MaakBoekTabel(props) {
    const [boeken, setBoeken] = useState([]);
    const [boekenWeergeven, setBoekenWeergeven] = useState([]);
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false);
    const [exemplarenLijst, setExemplarenLijst] = useState(false);
    const [boekTitel, setBoekTitel] = useState('');
    const [boekTags, setBoekTags] = useState('');
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);
    const persoonInfo = useContext(persoonContext);
    const [filterWoord, setFilterWoord] = useState('');

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

    const zoekFunctie = (waarde) => {
        
        let filterData = [];

        setFilterWoord(waarde)

        filterData = boeken.filter(boek => {
            let termaanwezigheid = false;

            Object.entries(boek).map(([key, value]) => {
                if(!termaanwezigheid){
                    termaanwezigheid = (value !== null ? value.toString().toLowerCase().includes(waarde.toLowerCase()) : false);
                }
            });

            return(termaanwezigheid);
        })
        setBoekenWeergeven(filterData);
}

    //     if (watVeranderd === 'titel') {
    //         setBoekTitel(waarde);
    //         filterData = boeken.filter(v => v.titel.toLowerCase().includes(waarde.toLowerCase()));
    //     } else {
    //         setBoekTags(waarde);
    //         if (waarde !== '') {
    //             filterData = boeken.filter(v => v.tags && v.tags.toLowerCase().includes(waarde.toLowerCase()));
    //         } else {
    //             filterData = boeken;
    //         }
    //     }
        
    // }


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
            <h1 className = 'paragraph'>
            <input className = 'zoekveld' type="text" placeholder='Zoeken...' value={filterWoord}
                onChange={e => zoekFunctie(e.target.value)} />
            <button className = 'resetbtn' onClick={() => reset()}>Reset</button>
            </h1>
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
                            <th>Reserveer</th>
                            {(persoonInfo.adminRechten === 'true' || persoonInfo.adminRechten) &&
                                <th>Exemplaar Toevoegen</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {boekenWeergeven.map(boek => (
                            <tr key={boek.id}>
                                <td >{boek.id}</td>
                                {(persoonInfo.adminRechten === 'true' || persoonInfo.adminRechten) && 
                                    <td className='Boek' onClick={() => { setExemplarenLijst(true); setBoekId(boek.id) }}>{boek.titel}</td>
                                }
                                {(persoonInfo.adminRechten === 'false' || !persoonInfo.adminRechten) &&
                                    <td>{boek.titel}</td>
                                }
                                <td>{boek.auteur}</td>
                                <td>{boek.isbn}</td>
                                <td>{boek.tags}</td>
                                <td>{boek.beschikbaar}/{boek.exemplarenTotaal}</td>
                                <td><Reserveren boekId={boek.id} /></td>
                                {(persoonInfo.adminRechten === 'true' || persoonInfo.adminRechten) &&
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
                </div>
            </Popup>

        </div>

    );
}

export default MaakBoekTabel;