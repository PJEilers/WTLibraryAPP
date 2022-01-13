import "./PersoonToevoegen.css"
import { emailCheck } from "./Constanten";
import {useState} from 'react'

function PersoonToevoegen () {

    const [naam, setNaam] = useState('');
    const [email, setEmail] = useState('');
    const [adminRechten, setAdminRechten] = useState(false);
    const [succesBericht, setSuccesBericht] = useState('');
    const [alleenLezen, setAlleenLezen] = useState(false);
    const [knopUit, setKnopUit] = useState(false);
    const [resetID, setResetID] = useState(0);


    const nieuwPersoon = () => {
        if (!email.toLowerCase().match(emailCheck) 
        || naam == '') {
            alert('Vul een geldig e-mailadres en naam in');
        } else {
            const nieuwPersoon = {
                naam: naam,
                email: email,
                wachtwoord: "WT123",
                adminRechten: adminRechten,
            };
            
            maakNiewPersoonAan("http://localhost:8080/maakpersoonaan", nieuwPersoon).then(response => {
                if (response.ok) {
                    setSuccesBericht('Persoon is toegevoegd')
                    setAlleenLezen(true)
                    setKnopUit(true)
                } else {
                    setSuccesBericht('E-mailadres is niet uniek')
                }
            }).catch(error => console.log(error))
        }       
    }


    const reset = () => {
        setAdminRechten(false);
        setEmail('');
        setNaam('');
        setSuccesBericht('');
        setAlleenLezen(false);
        setKnopUit(false)
        setResetID(resetID+1);
    }


    return (
        <div key = {resetID}>
            <h1>Voeg een persoon toe</h1>
            <div className = "PersoonToevoegen">
   
                <label>Volledige naam</label>
                <input type = "text" 
                       readOnly = {alleenLezen}
                       onChange = {e => setNaam(e.target.value)}/>

                <label>E-mail</label>
                <input type = "email" 
                       readOnly = {alleenLezen}
                       onChange = {e => setEmail(e.target.value)}/>

                <label>Admin rechten</label>
                <input type = "checkbox" id = "checkbox" disabled={knopUit}
                onChange ={e => setAdminRechten(e.target.checked)}/>

                <label id = "stuur"></label>
                <button disabled={knopUit} onClick = {() => nieuwPersoon()}>Maak nieuw persoon aan</button>

            </div>
            <p>{succesBericht}</p>
            <button onClick = {() => reset()}>Nog een persoon aanmaken</button>

        </div>
    )
}

const maakNiewPersoonAan = async(url, persoon) =>  {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persoon)
    })
    return response;
}

export default PersoonToevoegen;