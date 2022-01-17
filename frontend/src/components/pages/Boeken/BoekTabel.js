import './BoekTabel.css';
import React from "react";
import { useState } from "react";
import Reserveren from '../Reserveringen/Reserveren';

function MaakBoekTabel() {
    const[boeken, setBoeken] = useState([]);
    const[boekenWeergeven, setBoekenWeergeven] = useState([]);
    const[boekTitel, setBoekTitel] = useState('');
    const[boekTags, setBoekTags] = useState('');
    const[opstarten, setOpstarten] = useState(false);

    const laadData = () => {
        fetch('http://localhost:8080/boeken', {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            setBoeken(data);
            setBoekenWeergeven(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const boekenOpTitel = () => {
        let filterData = boeken.filter(v => v.titel.toLowerCase().includes(boekTitel.toLowerCase()));
        setBoekenWeergeven(filterData);
    }

    const boekenOpTags = () => {
        let filterData = boeken.filter(v => {
            if(v.tags !== null) {
                v.tags.toLowerCase().includes(boekTags.toLowerCase());
            }
        });
        console.log(filterData);
        setBoekenWeergeven(filterData);
    }

    const reset = () => {
        setBoekenWeergeven(boeken);
        setBoekTitel('');
        setBoekTags('');
        setOpstarten(false);
    }

    if (!opstarten) {
        laadData();
        setBoekenWeergeven(boeken);
        setOpstarten(true);
    }

    return (
        <div>
            <input type="text" placeholder='Zoek op titel' value={boekTitel}
                                       onChange={e => {
                                            setBoekTitel(e.target.value);
                                            boekenOpTitel();
                                       }}/>
            <input type="text" placeholder='Zoek op tags' value={boekTags}
                                       onChange={e => {
                                            setBoekTags(e.target.value);
                                            boekenOpTags();
                                       }}/>
            <button onClick={() => reset()}>
                Reset
            </button>
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
                    {boekenWeergeven.map(boek => (
                        <tr key={boek.id}>
                            <td>{boek.id}</td>
                            <td>{boek.titel}</td>
                            <td>{boek.auteur}</td>
                            <td>{boek.isbn}</td>
                            <td>{boek.tags}</td>
                            <td>{boek.exemplarenTotaal}</td>
                            <td>{boek.beschikbaar}</td>
                            <td><Reserveren boekId = {boek.id} persoonId = {1}/></td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MaakBoekTabel;