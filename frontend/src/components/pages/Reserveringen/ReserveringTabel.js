import '../../Styling/ZoekveldStyling.css'
import './ReserveringTabel.css';
import { useState, useEffect } from "react";
import { TableStyle } from '../../Styling/Table';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import { uitleningToevoegen } from '../../../Constanten'
import ExemplaarInformatie from '../Boeken/ExemplaarInformatie';

function MaakReserveringTabel() {
    const[reserveringen, setReserveringen] = useState([]);
    const[opstarten, setOpstarten] = useState(false);
    const[nieuweUitlening, setNieuweUitlening] = useState(false);
    const[huidigPersoon, setHuidigPersoon] = useState(null);
    const[uitleningToegevoegd, setUitleningToegevoegd] = useState(false);
    const[huidigBoek, setHuidigBoek] = useState(null);
    const[reserveringWeergeven, setReserveringWeergeven] = useState([]);
    const[filterWoord, setFilterWoord] = useState('');


    const laadData = () => {

        fetch('http://localhost:8080/reserveringMetPersoonEnBoek', { mode: 'cors' })
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
                if(!termaanwezigheid){
                    termaanwezigheid = (value !== null ? value.toString().toLowerCase().includes(waarde.toLowerCase()) : false);
                }
            });
            return(termaanwezigheid);
        })
        setReserveringWeergeven(filterData);
    }

    const reset = () => {
        setReserveringWeergeven(reserveringen);
        setOpstarten(false);
    }

    const setUitleningInfo = (persoonId, boekId) => {
        setNieuweUitlening(true);
        setHuidigPersoon(persoonId);
        setUitleningToegevoegd(false);
        setHuidigBoek(boekId);
    }

    useEffect(() => {
        laadData();
    },[])

    return (
        <div>
            <h1 className = 'paragraph'>
            <input className = 'zoekveld' type="text" placeholder='Zoeken...' value={filterWoord}
                onChange={e => zoekFunctie(e.target.value)} />
            <button className = 'resetbtn' onClick={() => reset()}>Reset</button>
            </h1>

            <TableStyle>
            <table>
                <thead>
                    <tr>
                        <th>Boek titel</th>
                        <th>Boek auteur</th>
                        <th>Naam</th>
                        <th>Reserveringsdatum</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reserveringWeergeven.map((reservering, index )=> (
                        <tr key={index}>
                            <td>{reservering.titel}</td>
                            <td>{reservering.auteur}</td>
                            <td>{reservering.naam}</td>
                            <td>{reservering.datum}</td>
                            <td><Button onClick={() => setUitleningInfo(reservering.persoonId, reservering.boekId)}>Uitlenen</Button></td>
                        </tr>
                    ))}

                    <Popup open={nieuweUitlening} modal onClose={() => setNieuweUitlening(false)}>
                        <div className="modal">
                            <button className="close" onClick={() => setNieuweUitlening(false)}> &times; </button>
                            <ExemplaarInformatie persoon = {huidigPersoon} boekId = {huidigBoek}/>
                        </div>
                    </Popup>
                </tbody>
            </table>
            </TableStyle>
        </div>
    );
}

export default MaakReserveringTabel;