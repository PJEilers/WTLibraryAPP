import { useState } from 'react';
import './Login.css'
import { connectieString, emailPattern } from '../../../Constanten.js'
import Cookies from 'universal-cookie'

function Login({ setPersoonInfo }) {

    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [succesBericht, setSuccesBericht] = useState('');

    const login = (e) => {
        postLogin(connectieString +"/authenticate", {
            username: email,
            password: wachtwoord
        }).then(response => {
            if (response.ok) {
                response.json().then(persoon => {
                    setEmail('');
                    setWachtwoord('');
                    setPersoonInfo({ token: persoon.token, persoonId: persoon.id, role: persoon.role});
                    localStorage.setItem('token', JSON.stringify(persoon.token));
                    localStorage.setItem('persoonId', JSON.stringify(persoon.id));
                    localStorage.setItem('role', JSON.stringify(persoon.role));
                    // Hier moet nog de persoonId bijkomen
                })
            } else {
                setSuccesBericht("E-mailadres of wachtwoord onjuist");
            }
        })

        e.preventDefault();
    }

    return (
        <div>
            <form className='Login' onSubmit={login}>
                <div className="container">
                    <img src={require('../../../images/LogoWT.PNG')} width="419" heigh="176" />
                    <div id='card'>
                        <h2 id="titel">Bibliotheek App</h2>
                        <div id='input'>
                            <label id="email"></label>
                            <span></span>
                            <input type="email" onChange={e => setEmail(e.target.value)} required
                                pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                                value={email}
                                placeholder='E-mailadres'
                                onInvalid={e => e.target.setCustomValidity("Vul een geldig e-maildres in")}
                                onInput={e => e.target.setCustomValidity("")}
                            />
                            <label id="wachtwoord"></label>
                            <span></span>
                            <input type="password" onChange={e => setWachtwoord(e.target.value)} required
                                value={wachtwoord}
                                placeholder='Wachtwoord'
                                onInvalid={e => e.target.setCustomValidity("Vul iets in")}
                                onInput={e => e.target.setCustomValidity("")}
                            />
                        </div>

                    </div>
                    <p>{succesBericht}</p>
                    <label id="login-btn" />
                    <input type="submit" id="login-btn" value="Login" />
                </div>
            </form>

        </div>
    )
}
export default Login;

const postLogin = async (url, loginData) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    return response;
}