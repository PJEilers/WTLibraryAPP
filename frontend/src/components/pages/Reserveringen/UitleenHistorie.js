import '../../Styling/ZoekveldStyling.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TableStyle } from '../../Styling/Table';
import { permissionContext, persoonContext } from '../../../App';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const permission = useContext(permissionContext);
    const persoonInfo = useContext(persoonContext);
    const [uitleningenWeergeven, setUitleningenWeergeven] = useState([]);
    const [opstarten, setOpstarten] = useState(false);
    const [filterWoord, setFilterWoord] = useState('');
    
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
            <button className= 'resetbtn' onClick={() => setOpstarten(!opstarten)}>Reset</button>
            </h1>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Exemplaar Label</th>
                            {permission && <th>Persoon</th>}
                            <th>Boek</th>
                            <th>Begin Datum</th>
                            <th>Eind Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uitleningenWeergeven.map((uitlening, index) => (
                            <tr key={index}>
                                <td>WT-{uitlening.boekId}.{uitlening.exemplaarId}</td>
                                {permission && <td>{uitlening.persoon}</td>} 
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