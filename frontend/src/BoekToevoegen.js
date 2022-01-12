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
    const [uniekID, setUniekID] = useState(0)
    const [succesBericht, setSuccesBericht] = useState('')
    

    const stuurOp = () => {
        if (boektitel == '' || auteur == '' || ISBN == '') {
            alert("Vul alle verplichte velden in")
        } else {
            const boekData = {}

            //TODO: POST request/response met correct json
            maakBoekAan();

            setAlleenLezen(true)
            setKnopUit(true)
            setBoekToegevoegd(true)

        }
    }

    const maakBoekAan = () => {
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
                    setSuccesBericht('Boek is toegevoegd aan de database')
                } else {
                    setSuccesBericht('Dit boek staat al in de database, ga verder met exemplaar toevoegen')
                }
            })
            .catch(error => {
                alert('Er is iets fout gegaan, het boek is niet toegevoegd aan de database')
            });
    }

    const reset = () => {
        setBoekToegevoegd(false)
        setAlleenLezen(false)
        setKnopUit(false)
        setBoektitel('')
        setAuteur('')
        setISBN('')
        setTags(null)
        setUniekID(uniekID+1)
        setSuccesBericht('')
    }

    return (
        <div key = {uniekID}>            
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
            <p>{succesBericht}</p>          
            <ExemplarenToevoegen boekToegevoegd={boekToegevoegd} boektitel = {boektitel}
                                 uniekID={uniekID}/>
            <button onClick={() => reset()}>Nieuw Boek</button>
        </div>
    )
}

export default BoekToevoegen;