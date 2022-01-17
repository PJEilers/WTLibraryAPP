import './BoekTabel.css';
import React from "react";
import { useState } from "react";
import Reserveren from '../Reserveringen/Reserveren';
import ExemplarenToevoegen from './ExemplarenToevoegen';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import '../../Styling/Popup.css'

function MaakBoekTabel() {
    const [boeken, setBoeken] = useState([]);
    const [boekTitel, setBoekTitel] = useState('');
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false)
    const [succesBericht, setSuccesBericht] = useState('');
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);

    const laadData = () => {
        if (boekTitel === '') {
            fetch('http://localhost:8080/boeken', { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    setBoeken(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            let checkBoek = {
                titel: boekTitel,
                auteur: '',
                isbn: '',
                tags: '',
            }
            fetch('http://localhost:8080/zoektitel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkBoek)
            })
                .then(response => response.json())
                .then(data => {
                    if (data !== null) {
                        setBoeken(data);
                    } else {
                        setSuccesBericht('Dit boek staat niet in de database');
                        setBoekTitel('');
                    }
                })
                .catch(error => console.log("Error: " + error));
        }
    }

    const reset = () => {
        setBoeken([]);
        setBoekTitel('');
        setSuccesBericht('');
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
        setOpstarten(true);
    }

    return (
        <div>
            <input type="text" placeholder='Zoek op titel' value={boekTitel}
                onChange={e => setBoekTitel(e.target.value)} />
            <span>
                <button onClick={() => {
                    laadData();
                }}>
                    Zoek
                </button>
                <button onClick={() => reset()}>
                    Reset
                </button>
            </span>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {boeken.map(boek => (
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
                                <Button onClick ={() => {setNieuweExemplaren(true); setBoekId(boek.id);}}>Exemplaren Toevoegen</Button>
                                <Popup open={nieuweExemplaren} modal closeOnEscape>
                                    <div className="modal">
                                        <button className="close" onClick={closePopup}> &times; </button>
                                        {NieuweExemplarenToevoegen(boekId)}
                                    </div>
                                </Popup>                                
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default MaakBoekTabel;