import './BoekToevoegen.css';
import {useState} from "react";
import ExemplarenToevoegen from './ExemplarenToevoegen';

function BoekToevoegen() {

    const [boektitel, setBoektitel] = useState('');
    const [auteur, setAuteur] = useState('');
    const [ISBN, setISBN] = useState('');
    const [tags, setTags] = useState(null);
    const [alleenLezen, setAlleenLezen] = useState(false)
    const [knopUit, setKnopUit] = useState(false)
    const [boekToegevoegd, setBoekToegevoegd] = useState(false)
    

    const stuurOp = () => {
        if (boektitel == '' || auteur == '' || ISBN == '') {
            alert("Vul alle verplichte velden in")
        } else {
            const boekData = {}
            //TODO: POST request/response met correct json
            setAlleenLezen(true)
            setKnopUit(true)
            setBoekToegevoegd(true)

        }
    }

    return (
        <div>            
            <h1>Voeg een boek toe</h1>
            <div className='BoekToevoegen'>

                <label>Boektitel</label>
                <input type="text" placeholder = "verplicht veld" 
                                   onChange={e => setBoektitel(e.target.value)}
                                   readOnly={alleenLezen}/>

                <label>Auteur</label>
                <input type="text" placeholder = "verplicht veld"  
                                   onChange={e => setAuteur(e.target.value)} 
                                   readOnly = {alleenLezen}/>

                <label>ISBN</label>
                <input type="text" placeholder = "verplicht veld"  
                                   onChange={e => setISBN(e.target.value)} 
                                   readOnly = {alleenLezen}/>

                <label>Tags</label>
                <input type="text" placeholder = "gescheiden door komma" 
                                   onChange={e => setTags(e.target.value)} 
                                   readOnly = {alleenLezen}/>   

                <label id = "stuur"></label>
                <button disabled = {knopUit} onClick = {() => stuurOp()}>Maak nieuw boek aan</button>


            </div>          
            <ExemplarenToevoegen boekToegevoegd={boekToegevoegd} boektitel = {boektitel}/>
        </div>
    )
}

export default BoekToevoegen;