import './BoekTabel.css';
import React, { useEffect } from "react";
import { useState } from "react";
import Reserveren from '../Reserveringen/Reserveren';
import ExemplarenToevoegen from './ExemplarenToevoegen';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import '../../Styling/Popup.css'
import { TableStyle } from '../../Styling/Table';
import '../../Styling/Table.css'
import styled from 'styled-components';
import ExemplaarInformatie from './ExemplaarInformatie';
import ReactTabel from '../../Styling/ReactTabel';


function MaakBoekTabel(props) {
    const [boeken, setBoeken] = useState([]);
    const [boekenWeergeven, setBoekenWeergeven] = useState([]);
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false);
    const [exemplarenLijst, setExemplarenLijst] = useState(false);
    const [boekTitel, setBoekTitel] = useState('');
    const [boekTags, setBoekTags] = useState('');
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);
    const [headers, setHeaders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState([]);
    const [input, setInput] = useState([]);


    const laadData = () => {
        fetch('http://localhost:8080/boeken', { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                setBoeken(data);
                setBoekenWeergeven(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        elementenToevoegen();
    }

    const zoekBoek = (watVeranderd, waarde) => {
        //const [filterData, setFilterData] = useState([]);
        let filterData = [];
        if (watVeranderd === 'titel') {
            setBoekTitel(waarde);
            filterData = boeken.filter(v => v.titel.toLowerCase().includes(waarde.toLowerCase()));
        } else {
            setBoekTags(waarde);
            if (waarde !== '') {
                filterData = boeken.filter(v => v.tags && v.tags.toLowerCase().includes(waarde.toLowerCase()));
            } else {
                filterData = boeken;
            }
        }
        setBoekenWeergeven(filterData);
    }

    const determineHeaders = () => {
        setHeaders([
            {
                Header: 'Id',
                accessor: 'id',
                className: 'Id',
            },
            {
                Header: 'Boek Titel',
                accessor: 'titel',
                className: 'titel',
            },
            {
                Header: 'Auteur',
                accessor: 'auteur',
                className: 'auteur',
            },
            {
                Header: 'ISBN',
                accessor: 'isbn',
                className: 'isbn',
            },
            {
                Header: 'Tags',
                accessor: 'tags',
                className: 'tags',
            },
            {
                Header: 'Exemplaren Totaal',
                accessor: 'exemplarenTotaal',
                className: 'exemplarenTotaal',
            },
            {
                Header: 'Exemplaren Beschikbaar',
                accessor: 'beschikbaar',
                className: 'beschikbaar',
            }
        ])
    }

    const reset = () => {
        setBoekenWeergeven(boeken);
        setBoekTitel('');
        setBoekTags('');
        console.log(boekenWeergeven);
    }

    function NieuweExemplarenToevoegen(props) {
        return (
            <ExemplarenToevoegen boekToegevoegd={true} boektitel={boekTitel}
                boekID={props} />
        )

    }

    const closePopup = () => setNieuweExemplaren(false)

    const elementenToevoegen = () => {

        setHeaders(prevState => ([...prevState, {
            Header: 'Nieuwe Exemplaren',
            accessor: 'btnnieuweexemplaren',
            className: 'btnnieuweexemplaren'
        }]))

        setBoekenWeergeven(
            boekenWeergeven.map(element => {
            element.btnnieuweexemplaren = 1;//<Button onClick={() => { setNieuweExemplaren(true);}}>Exemplaren Toevoegen</Button>
        }

        // [...{... , btnnieuweexemplaren: 1}]
        ))
        //setBoekenWeergeven(tmparray);
        
        
        // console.log(boekenWeergeven);
    }



    useEffect(() => {
        laadData();
        determineHeaders();
        elementenToevoegen();
        setLoaded(true);
    }, []);



    return (
        <div>
            <input type="text" placeholder='Zoek op titel' value={boekTitel}
                onChange={e => zoekBoek('titel', e.target.value)} />
            <input type="text" placeholder='Zoek op tags' value={boekTags}
                onChange={e => zoekBoek('tags', e.target.value)} />
            <button onClick={() => reset()}>
                Reset
            </button>
            <button onClick={() => elementenToevoegen()}>
                Add Button
            </button>
            <ReactTabel
                input={boekenWeergeven}
                headers={headers}
                getColumnProps={column => ({
                    style: {
                        backgroundColor: column.Header === 'Boek Titel' ? 'red' : 'white'
                    },
                    onClick: () => { column.id === 'titel' ? setExemplarenLijst(true) : setExemplarenLijst(false) }
                })}
                getRowProps={row => ({
                    onClick: () => { setBoekId(row.cells[0].value); }
                })}
                hideColumns={[1]}
            />
            {boekId}
            {/* <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Boek ID</th>
                            <th>Titel</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Tags</th>
                            <th>Exemplaren Totaal</th>
                            <th>Exemplaren Beschikbaar</th>
                            <th>Reserveer</th>
                            <th>Exemplaar Toevoegen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boekenWeergeven.map(boek => (
                            <tr key={boek.id}>
                                <td >{boek.id}</td>
                                <td className = 'Boek' onClick={() => {setExemplarenLijst(true); setBoekId(boek.id)}}>{boek.titel}</td>
                                <td>{boek.auteur}</td>
                                <td>{boek.isbn}</td>
                                <td>{boek.tags}</td>
                                <td>{boek.exemplarenTotaal}</td>
                                <td>{boek.beschikbaar}</td>
                                <td><Reserveren boekId={boek.id} persoonId={1} /></td>
                                <td>
                                    <Button onClick={() => { setNieuweExemplaren(true); setBoekId(boek.id); }}>Exemplaren Toevoegen</Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableStyle> */}
            <Popup open={nieuweExemplaren} onClose={() => setNieuweExemplaren(false)} modal>
                <div className="modal">
                    <button className="close" onClick={closePopup}> &times; </button>
                    {NieuweExemplarenToevoegen(boekId)}
                </div>
            </Popup>
            <Popup open={exemplarenLijst} onClose={() => setExemplarenLijst(false)} modal closeOnDocumentClick={false}>
                <div className="modal">
                    <button className="close" onClick={() => setExemplarenLijst(false)}> &times; </button>
                    <ExemplaarInformatie boekId={boekId} persoon={props.persoon} />
                </div>
            </Popup>

        </div>

    );
}

export default MaakBoekTabel;