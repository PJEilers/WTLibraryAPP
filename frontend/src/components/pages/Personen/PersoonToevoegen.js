import { PersoonToevoegenStyling } from './PersoonToevoegenStyling';
// import "./PersoonToevoegen.css"
import { postRequest } from "../../../Constanten";
import { useEffect, useState } from 'react'

function PersoonToevoegen() {

    const [naam, setNaam] = useState('');
    const [email, setEmail] = useState('');
    const [adminRechten, setAdminRechten] = useState(false);
    const [role, setRole] = useState('');
    const [succesBericht, setSuccesBericht] = useState('');
    const [uit, setUit] = useState(false);


    const nieuwPersoon = (e) => {
        setUit(true);
        const nieuwPersoon = {
            naam: naam,
            email: email,
            wachtwoord: "WT123",
            role: role,
        };

        postRequest("/maakpersoonaan", nieuwPersoon).then(response => {
            if (response.ok) {
                setSuccesBericht('Persoon is toegevoegd');

            } else {
                setUit(false);
                setSuccesBericht('E-mailadres is niet uniek');
            }
        }).catch(error => console.log(error))
        e.preventDefault();
    }

    const veranderRole = (props) => {
        setAdminRechten(props)
        if (props) {
            setRole('ROLE_ADMIN');
        } else {
            setRole('ROLE_GEBRUIKER');
        }
    }

    useEffect(() => {
        setRole('ROLE_GEBRUIKER');
    },[])


    const reset = () => {
        setAdminRechten(false);
        setEmail('');
        setNaam('');
        setRole('ROLE_GEBRUIKER');
        setSuccesBericht('');
        setUit(false)
    }


    return (
        <PersoonToevoegenStyling>
            <span>
                <h1>Voeg een persoon toe</h1>
                <form onSubmit={nieuwPersoon}>

                    <label>Volledige naam</label>
                    <input type="text" required
                        disabled={uit}
                        value={naam}
                        onChange={e => setNaam(e.target.value)}
                        onInvalid={e => e.target.setCustomValidity("Vul iets in")}
                        onInput={e => e.target.setCustomValidity("")}
                    />

                    <label>E-mail</label>
                    <input type="email" required
                        disabled={uit}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                        onInvalid={e => e.target.setCustomValidity("Vul een geldig e-maildres in")}
                        onInput={e => e.target.setCustomValidity("")}
                    />

                    <label>Admin rechten</label>
                    <input type="checkbox" id="checkbox" disabled={uit} value={adminRechten}
                        onChange={e => veranderRole(e.target.checked)} checked={adminRechten}/>

                    <label id="stuur"></label>
                    <input className='submit' type="submit" value="Voeg persoon toe" disabled={uit} />

                </form>
                <p>{succesBericht}</p>
                <button onClick={() => reset()}>Nog een persoon aanmaken</button>
            </span>
        </PersoonToevoegenStyling>
    )
}

export default PersoonToevoegen;