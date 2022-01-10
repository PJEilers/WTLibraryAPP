import './BoekToevoegen.css';
import {useState} from "react";

function BoekToevoegen() {

    const [boektitel, setBoektitel] = useState('');
    const [auteur, setAuteur] = useState('');
    const [beschrijving, setBeschrijving] = useState('');
    const [ISBN, setISBN] = useState(null);
    const [druk, setDruk] = useState(null);
    const [tags, setTags] = useState(null);

    const stuurOp = () => {
        if (boektitel == '' || auteur == '' || ISBN == '') {
            alert("Vul alle verplichte velden in")
        } else {
            const boekData = {}
            //TODO: POST request/response met correct json
        }


    }

    return (
        <div>            
            <h1>Voeg een boek toe</h1>
            <div className='BoekToevoegen'>

                <label>Boektitel</label>
                <input type="text" placeholder = "verplicht veld" onChange={e => setBoektitel(e.target.value)}/>

                <label>Auteur</label>
                <input type="text" placeholder = "verplicht veld"  onChange={e => setAuteur(e.target.value)} />

                <label>ISBN</label>
                <input type="text" placeholder = "verplicht veld"  onChange={e => setISBN(e.target.value)} />

                <label>Tags</label>
                <input type="text" placeholder = "gescheiden door komma" onChange={e => setTags(e.target.value)} />   

                <label id = "stuur"></label>
                <button onClick = {() => stuurOp()}>Maak nieuw boek aan</button>

            </div>          
        </div>
    )
}

export default BoekToevoegen;