import './BoekToevoegen.css';
import React, {useState} from "react";




function BoekToevoegen() {

    const [boektitel, setBoektitel] = useState('');
    const [auteur, setAuteur] = useState('');
    const [beschrijving, setBeschrijving] = useState('');
    const [ISBN, setISBN] = useState('');
    const [druk, setDruk] = useState(null);
    const [tags, setTags] = useState('');

    return (
        <div>            <h1>Voeg een boek toe</h1>
            <div className='BoekToevoegen'>

                <label>Boektitel</label>
                <input type="text" onChange={e => setBoektitel(e.target.value)}/>

                <label>Auteur</label>
                <input type="text" onChange={e => setAuteur(e.target.value)} />

                <label>ISBN</label>
                <input type="text" onChange={e => setISBN(e.target.value)} />

                <label>Beschrijving</label>
                <input type="text" onChange={e => setBeschrijving(e.target.value)} />

                <label>Druk</label>
                <input type="number" onChange={e => setDruk(e.target.value)} />

                <label>Tags (gescheiden door komma)</label>
                <input type="text" onChange={e => setTags(e.target.value)} />


            </div>
        </div>
    )
}

export default BoekToevoegen;