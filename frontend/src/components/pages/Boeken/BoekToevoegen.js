// import './BoekToevoegen.css';
import { useState } from "react";
import ExemplarenToevoegen from './ExemplarenToevoegen';
import {BoekToevoegenStyling} from './BoekToevoegenStyling'
function BoekToevoegen() {

    const [boektitel, setBoektitel] = useState('');
    const [auteur, setAuteur] = useState('');
    const [ISBN, setISBN] = useState('');
    const [tags, setTags] = useState(null);
    const [uit, setUit] = useState(false);
    const [boekToegevoegd, setBoekToegevoegd] = useState(false);
    const [boekID, setBoekID] = useState(0);
    const [succesBericht, setSuccesBericht] = useState('');
    const [resetID, setResetID] = useState(1);


    const stuurOp = (e) => {
        const boekData = {}
        setUit(true);
        
        //TODO: POST request/response met correct json
        maakBoekAan();


        e.preventDefault();
    }

    const maakBoekAan = (e) => {
        let nieuwBoek = {
            titel: boektitel,
            auteur: auteur,
            isbn: ISBN,
            tags: tags,
        }

        fetch("http://localhost:8080/maakboekaan", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nieuwBoek)
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(nieuwBoek => {
                        if (nieuwBoek.bestaat) {
                            setSuccesBericht('Dit boek staat al in de database, ga verder met exemplaren toevoegen');
                            setBoekID(nieuwBoek.bestaat.id)
                        } else {
                            setSuccesBericht('Boek is toegevoegd aan de database');
                            setBoekID(nieuwBoek.bestaatNiet.id)
                        }
                    });
                    setBoekToegevoegd(true);
                } else {
                    setUit(false);
                    setBoekToegevoegd(false);
                    setSuccesBericht('Er is iets fout gegaan, het boek is niet toegevoegd aan de database');
                }
            })
            .catch(error => {
                setUit(false);
                setBoekToegevoegd(false);
                setSuccesBericht('Er is iets fout gegaan, het boek is niet toegevoegd aan de database')
            });
    }

    const reset = () => {
        setBoekToegevoegd(false)
        setUit(false)
        setBoektitel('')
        setAuteur('')
        setISBN('')
        setTags(null)
        setSuccesBericht('')
        setResetID(resetID+1)
    }

    return (
        <BoekToevoegenStyling>
        <span key = {resetID}>
            <h1>Voeg een boek toe</h1>
            <form onSubmit={stuurOp}>

                <label>Boektitel</label>
                <input type="text" required
                    value={boektitel}
                    onChange={e => setBoektitel(e.target.value)}
                    disabled={uit}
                    onInvalid={e => e.target.setCustomValidity("Vul iets in")}
                    onInput={e => e.target.setCustomValidity("")} />

                <label>Auteur</label>
                <input type="text" required
                    value={auteur}
                    onChange={e => setAuteur(e.target.value)}
                    disabled={uit}
                    onInvalid={e => e.target.setCustomValidity("Vul iets in")}
                    onInput={e => e.target.setCustomValidity("")} />

                <label>ISBN</label>
                <input type="text" required
                    value={ISBN}
                    onChange={e => setISBN(e.target.value)}
                    disabled={uit}
                    onInvalid={e => e.target.setCustomValidity("Vul iets in")}
                    onInput={e => e.target.setCustomValidity("")} />

                <label>Tags</label>
                <input type="text" placeholder="gescheiden door komma"
                    onChange={e => setTags(e.target.value)}
                    disabled={uit} />

                <label id="stuur"></label>
                <input className = 'submit' type="submit" disabled={uit} value="Maak nieuw boek aan" />


            </form>
            <p>{succesBericht}</p>
            <ExemplarenToevoegen boekToegevoegd={boekToegevoegd} boektitel={boektitel}
                boekID={boekID} />
            <button onClick={() => reset()}>Nog een boek toevoegen</button>
            <h2></h2>
        </span>
        </BoekToevoegenStyling>
    )
}

export default BoekToevoegen;