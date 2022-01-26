import './UitleenHistorie.css';
import React from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const [uitleningenWeergeven, setUitleningenWeergeven] = useState([]);
    const [firstBoot, setFirstBoot] = useState(true);
    const [persoonNaam, setPersoonNaam] = useState('');
    const [beginDatum, setBeginDatum] = useState('');
    const [eindDatum, setEindDatum] = useState('');
    const [opstarten, setOpstarten] = useState(false);

    const uitleenData = () => {
        fetch('http://localhost:8080/historie', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setUitleningen(data);
                setUitleningenWeergeven(data);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }

const zoekFunctie = (watVeranderd, waarde) => {
    let filterData = [];
    if (watVeranderd === 'persoon') {
        setPersoonNaam(waarde);
        filterData = uitleningen.filter(v => v.persoon.toLowerCase().includes(waarde.toLowerCase()));
    } else {
        setBeginDatum(waarde);
        if (waarde !== ''){
            filterData = uitleningen.filter( v => v.beginDatum && v.beginDatum.toLowerCase().includes(waarde.toLowerCase()));
        } else {
            filterData = uitleningen;
        }
    }
    setUitleningenWeergeven(filterData);
} 

    const reset = () => {
        setUitleningenWeergeven(uitleningen);
        setPersoonNaam('');
        setBeginDatum('');
        setEindDatum('');
        setOpstarten(false);
    }

    if (firstBoot) {
        uitleenData();
        setFirstBoot(false);
    }

    return (
        <div>
            <input type="text" placeholder='zoeken' value={persoonNaam}
                onChange={e => zoekFunctie('persoon', e.target.value)} />
            <select>
                <option>exemplaarid</option>
                <option>gebruiker</option>
                <option>begindatum</option>
                <option>einddatum</option>
            </select>
            
            <input type="text" placeholder='datum zoeken' value={beginDatum}
                onChange={e => zoekFunctie('beginDatum', e.target.value)} />
            <button onClick={() => reset()}>Reset</button>

            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Exemplaar ID</th>
                            <th>Persoon</th>
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningenWeergeven.map(uitlening => (
                            <tr key={uitlening.id}>
                                <td>{uitlening.id}</td>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                <td>{uitlening.persoon}</td>
                                <td>{uitlening.beginDatum}</td>
                                <td>{uitlening.eindDatum}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableStyle>
        </div>
    );
}

export default UitleenHistorieTabel;