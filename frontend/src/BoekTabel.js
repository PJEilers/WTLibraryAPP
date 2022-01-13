import './BoekTabel.css';
import React from "react";
import { useState } from "react";

function MaakBoekTabel() {
    const[boeken, setBoeken] = useState([]);
    const[boekTitel, setBoekTitel] = useState('');
    const[succesBericht, setSuccesBericht] = useState('');

    const laadData = () => {
        if (boekTitel == "") {
            fetch('http://localhost:8080/boeken', {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                setBoeken(data);
            })
            .catch((error) => {
                  console.error('Error:', error);
            });
        } else {
            fetch('http://localhost:8080/zoektitel/' + boekTitel, {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setBoeken(data)
                } else {
                    setSuccesBericht('Dit boek staat niet in de database');
                    setBoekTitel('');
                }
            })
        }

    }


    return (
        <div>
            <input type="text" defaultValue={''}
                                       onChange={e => setBoekTitel(e.target.value)}/>
            <span>
                <button onClick={() => laadData()}>Zoek</button>
                <button onClick={() => {
                    setBoekTitel('');
                    laadData();
                }}>
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
                    </tr>
                </thead>

                <tbody>
                    {boeken.map(boek => (
                        <tr>
                            <td>{boek.id}</td>
                            <td>{boek.titel}</td>
                            <td>{boek.auteur}</td>
                            <td>{boek.isbn}</td>
                            <td>{boek.tags}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MaakBoekTabel;