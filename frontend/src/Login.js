import { useState } from 'react';
import './Login.css'
import { emailPattern } from './Constanten.js'

function Login() {

    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [succesBericht, setSuccesBericht] = useState('');
    const [persoonID, setpersoonID] = useState(0);
    const [adminRechten, setAdminRechten] = useState(false);


    const login = () => {
        postLogin("http://localhost:8080/login", {
            email: email,
            wachtwoord: wachtwoord
        }).then(response => {
            if (response.ok) {
                response.json().then(persoon => {
                    setpersoonID(persoon.id);
                    setAdminRechten(persoon.adminRechten);
                    setEmail('');
                    setWachtwoord('');
                    setSuccesBericht(`Succesvol ingelogd (id=${persoon.id}, admin = ${persoon.adminRechten}) 
                                            (en dan wordt je doorgestuurd naar de homepagina oid)`);
                })
            } else {
                setSuccesBericht("E-mailadres of wachtwoord onjuist");
            }
        })
    }

    return (
        <div>
            <form className='Login' onSubmit={login}>
                <label>Email</label>
                <input type="email" onChange={e => setEmail(e.target.value)} required 
                    pattern= "^[^@\s]+@[^@\s]+\.[^@\s]+$"
                    value = {email}
                    onInvalid={e => e.target.setCustomValidity("Vul een geldig e-maildres in")}
                    onInput = {e => e.target.setCustomValidity("")}
                />

                <label>Wachtwoord</label>
                <input type="password" onChange={e => setWachtwoord(e.target.value)} required 
                    value = {wachtwoord}
                    onInvalid = {e => e.target.setCustomValidity("Vul iets in")}
                    onInput = {e => e.target.setCustomValidity("")}
                />
                <input type="submit" value="login" />
            </form>
            <p>{succesBericht}</p>
        </div>
    )
}
export default Login;

const postLogin = async (url, loginData) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    return response;
}