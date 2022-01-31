import '../../Styling/ZoekveldStyling.css';
import React, { useContext, useEffect } from 'react';
import { useState, useMemo } from 'react';
import { TableStyle } from '../../Styling/Table';
import { permissionContext, persoonContext } from '../../../App';
import {BasicTable} from '../../Styling/Pagination.js';

function UitleenHistorieTabel() {
    const [uitleningen, setUitleningen] = useState([]);
    const permission = useContext(permissionContext);
    const persoonInfo = useContext(persoonContext);
    const [uitleningenWeergeven, setUitleningenWeergeven] = useState([]);
    const [opstarten, setOpstarten] = useState(false);
    const [filterWoord, setFilterWoord] = useState('');

    const columns = useMemo(
        () => [
            {
                Header: 'Exemplaar Label',
                accessor: 'exemplaarLabel',
            },
            {
                Header: 'Persoon',
                accessor: 'persoon',
            },
            {
                Header: 'Boek',
                accessor: 'boek',
            },
            {
                Header: 'Begin Datum',
                accessor: 'beginDatum',
            },
            {
                Header: 'Eind Datum',
                accessor: 'eindDatum',
            },
        ]
    )
    
    if (!permission) {
        columns.splice(1, 1);
    }
    
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
                <BasicTable columns={columns} data={uitleningenWeergeven}/>
            </TableStyle>
        </div>
    );
}

export default UitleenHistorieTabel;