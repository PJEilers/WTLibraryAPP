import "./PersoonToevoegen.css"
import {useState} from 'react'

function PersoonToevoegen () {

    const [naam, setNaam] = useState('');
    const [email, setEmail] = useState('');
    const [adminRechten, setAdminRechten] = useState(false);
    const [succesBericht, setSuccesBericht] = useState('');
    const [resetID, setResetID] = useState(0)

    const checkEmail = (email) => {
        if (email != '' && email.includes("@")) {
            const afterAt = email.substring(email.indexOf("@")+1);
            if(afterAt.includes("@") || !afterAt.includes(".")) {
                return true;
            }
            
            if (email.slice(-1) == "@" || email.slice(-1) == "." ||
                email.slice(0,1) == "@" || email.slice(0,1) == ".") return true;
            return false;
        }
        return true;
    }

    const nieuwPersoon = () => {
        if (!email.match(".+@(?!@).+\..+") || naam == '') {
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
                } else {
                    setSuccesBericht('E-mailadres is niet uniek')
                }
            })
        }       
    }


    const reset = () => {
        setAdminRechten(false);
        setEmail('');
        setNaam('');
        setSuccesBericht('');
        setResetID(resetID+1);
    }


    return (
        <div key = {resetID}>
            <h1>Voeg een persoon toe</h1>
            <div className = "PersoonToevoegen">
   
                <label>Volledige naam</label>
                <input type = "text" onChange = {e => setNaam(e.target.value)}/>

                <label>E-mail</label>
                <input type = "email" onChange = {e => setEmail(e.target.value)}/>

                <label>Admin rechten</label>
                <input type = "checkbox" id = "checkbox" onChange ={e => setAdminRechten(e.target.checked)}/>

                <label id = "stuur"></label>
                <button onClick = {() => nieuwPersoon()}>Maak nieuw persoon aan</button>

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