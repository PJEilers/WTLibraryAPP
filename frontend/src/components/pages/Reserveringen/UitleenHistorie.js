import '../../Styling/ZoekveldStyling.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';
import { persoonContext } from '../../../App';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);

    const [uitleningenWeergeven, setUitleningenWeergeven] = useState([]);
    const [opstarten, setOpstarten] = useState(false);
    const [filterWoord, setFilterWoord] = useState('');
    const persoonInfo = useContext(persoonContext);

    const uitleenData = () => {
        fetch('http://localhost:8080/historie/' + persoonInfo.persoonId, { mode: 'cors' })
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

    useEffect(() => {
        uitleenData();
    }, [opstarten])


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
                            <th>Exemplaar Label</th>
                            {(persoonInfo.adminRechten === 'true' || (persoonInfo.adminRechten && persoonInfo.adminRechten !== 'false')) &&  <th>Persoon</th>}
                            <th>Boek</th>
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningenWeergeven.map(uitlening => (
                            <tr key={uitlening.id}>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                {(persoonInfo.adminRechten === 'true' || (persoonInfo.adminRechten && persoonInfo.adminRechten !== 'false')) && <td>{uitlening.persoon}</td>} 
                                <td>{uitlening.boek}</td>                                 
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