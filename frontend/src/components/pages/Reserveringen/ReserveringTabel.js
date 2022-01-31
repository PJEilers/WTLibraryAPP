import '../../Styling/ZoekveldStyling.css'
import './ReserveringTabel.css';
import { useState, useEffect, useMemo } from "react";
import { TableStyle } from '../../Styling/Table';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import { uitleningToevoegen } from '../../../Constanten'
import ExemplaarInformatie from '../Boeken/ExemplaarInformatie';

import { useTable, usePagination } from "react-table";
import {BasicTable} from '../../Styling/Pagination.js';

function MaakReserveringTabel() {
    const [reserveringen, setReserveringen] = useState([]);
    const [opstarten, setOpstarten] = useState(false);
    const [nieuweUitlening, setNieuweUitlening] = useState(false);
    const [huidigPersoon, setHuidigPersoon] = useState(null);
    const [huidigBoek, setHuidigBoek] = useState(null);
    const [reserveringWeergeven, setReserveringWeergeven] = useState([]);
    const [filterWoord, setFilterWoord] = useState('');
    const [huidigReserveringId, setHuidigReserveringId] = useState(0);

    const columns = useMemo(
        () => [
            {
                Header: 'Boek Titel',
                accessor: 'titel',
            },
            {
                Header: 'Boek Auteur',
                accessor: 'auteur',
            },
            {
                Header: 'Naam',
                accessor: 'naam',
            },
            {
                Header: 'Datum',
                accessor: 'datum',
            },
            {
                Header: ' ',
                Cell: ({ cell }) => (
                    <Button onClick={() => console.log(cell.row.original.persoonId + ", " + cell.row.original.boekId + ", " + cell.row.original.id)}>Uitlenen</Button>
                )
            },
        ]
    );

    const laadData = () => {

        fetch('http://localhost:8080/reserveringenPersoonBoek', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setReserveringen(data);
                setReserveringWeergeven(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

    }

    const zoekFunctie = (waarde) => {

        let filterData = [];

        setFilterWoord(waarde)

        filterData = reserveringen.filter(reservering => {
            let termaanwezigheid = false;

            Object.entries(reservering).map(([key, value]) => {
                if (!termaanwezigheid) {
                    termaanwezigheid = (value !== null ? value.toString().toLowerCase().includes(waarde.toLowerCase()) : false);
                }
            });
            return (termaanwezigheid);
        })
        setReserveringWeergeven(filterData);
    }

    const setUitleningInfo = (persoonId, boekId, reserveringId) => {
        setNieuweUitlening(true);
        setHuidigPersoon(persoonId);
        setHuidigBoek(boekId);
        setHuidigReserveringId(reserveringId);
    }

    useEffect(() => {
        laadData();
    }, [opstarten, nieuweUitlening])

    const zetButtonInData = () => {
        reserveringWeergeven.forEach(element => {
            element.Button = <Button onClick={() => alert("test")}>Uitlenen</Button>;
        })
    }

    return (
        <div>
            <h1 className='paragraph'>
                <input className='zoekveld' type="text" placeholder='Zoeken...' value={filterWoord}
                    onChange={e => zoekFunctie(e.target.value)} />
                <button className='resetbtn' onClick={() => setOpstarten(!opstarten)}>Reset</button>
            </h1>

            <TableStyle>
                <BasicTable columns={columns} data={reserveringWeergeven}/>
            </TableStyle>
        </div>
    );
}

export default MaakReserveringTabel;