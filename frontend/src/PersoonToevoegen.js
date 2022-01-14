import "./PersoonToevoegen.css"
import { emailPattern } from "./Constanten";
import { useState } from 'react'

function PersoonToevoegen() {

    const [naam, setNaam] = useState('');
    const [email, setEmail] = useState('');
    const [adminRechten, setAdminRechten] = useState(false);
    const [succesBericht, setSuccesBericht] = useState('');
    const [uit, setUit] = useState(false);


    const nieuwPersoon = (e) => {
        setUit(true);
        const nieuwPersoon = {
            naam: naam,
            email: email,
            wachtwoord: "WT123",
            adminRechten: adminRechten,
        };

        maakNiewPersoonAan("http://localhost:8080/maakpersoonaan", nieuwPersoon).then(response => {
            if (response.ok) {
                setSuccesBericht('Persoon is toegevoegd');

            } else {
                setUit(false);
                setSuccesBericht('E-mailadres is niet uniek');
            }
        }).catch(error => console.log(error))
        e.preventDefault();
    }


    const reset = () => {
        setAdminRechten(false);
        setEmail('');
        setNaam('');
        setSuccesBericht('');
        setUit(false)
    }


    return (
        <div>
            <h1>Voeg een persoon toe</h1>
            <form onSubmit={nieuwPersoon} className="PersoonToevoegen">

                <label>Volledige naam</label>
                <input type="text" required
                    disabled = {uit}
                    value = {naam}
                    onChange={e => setNaam(e.target.value)}
                    onInvalid={e => e.target.setCustomValidity("Vul iets in")}
                    onInput={e => e.target.setCustomValidity("")}
                />

                <label>E-mail</label>
                <input type="email" required
                    disabled = {uit}
                    value = {email}
                    onChange={e => setEmail(e.target.value)}
                    pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                    onInvalid={e => e.target.setCustomValidity("Vul een geldig e-maildres in")}
                    onInput={e => e.target.setCustomValidity("")}
                />

                <label>Admin rechten</label>
                <input type="checkbox" id="checkbox" disabled={uit} value = {adminRechten}
                    onChange={e => setAdminRechten(e.target.checked)} />

                <label id="stuur"></label>
                <input type="submit" value="Voeg persoon toe" disabled={uit} />

            </form>
            <p>{succesBericht}</p>
            <button onClick={() => reset()}>Nog een persoon aanmaken</button>

        </div>
    )
}

const maakNiewPersoonAan = async (url, persoon) => {
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