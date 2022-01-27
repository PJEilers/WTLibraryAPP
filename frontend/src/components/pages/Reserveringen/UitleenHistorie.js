import '../../Styling/ZoekveldStyling.css';
import React from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const [uitleningenWeergeven, setUitleningenWeergeven] = useState([]);
    const [firstBoot, setFirstBoot] = useState(true);
    const [opstarten, setOpstarten] = useState(false);
    const [filterWoord, setFilterWoord] = useState('');


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


    const zoekFunctie = (waarde) => {
        
        let filterData = [];

        setFilterWoord(waarde)

        filterData = uitleningen.filter(uitlening => {
            let termaanwezigheid = false;

            Object.entries(uitlening).map(([key, value]) => {
                    if(!termaanwezigheid){
                        termaanwezigheid = (value !== null ? value.toString().toLowerCase().includes(waarde.toLowerCase()) : false);
                    }
            });

            return(termaanwezigheid);
        })
    setUitleningenWeergeven(filterData);
    }


    const reset = () => {
        setUitleningenWeergeven(uitleningen);
        setOpstarten(false);
    }

    if (firstBoot) {
        uitleenData();
        setFirstBoot(false);
    }

    return (
        <div>
            <h1 className = 'paragraph'>
            <input className= 'zoekveld' type="text" placeholder='Zoeken...' value={filterWoord}
                onChange={e => zoekFunctie(e.target.value)}></input>
                       
            <button className= 'resetbtn' onClick={() => reset()}>Reset</button>
            </h1>
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