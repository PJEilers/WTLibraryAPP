import '../../Styling/ZoekveldStyling.css'; //voor zoekveld styling
import React, { useEffect, useMemo } from "react";
import { useState, useContext } from "react";
import Reserveren from '../Reserveringen/Reserveren';
import ExemplarenToevoegen from './ExemplarenToevoegen';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import '../../Styling/Popup.css'
import { TableStyle } from '../../Styling/Table';
import '../../Styling/Table.css'
import { permissionContext } from '../../../App.js';
import ExemplaarInformatie from './ExemplaarInformatie';
import { useTable, usePagination } from "react-table";

function MaakBoekTabel(props) {
    const [boeken, setBoeken] = useState([]);
    const [boekenWeergeven, setBoekenWeergeven] = useState([]);
    const [nieuweExemplaren, setNieuweExemplaren] = useState(false);
    const [exemplarenLijst, setExemplarenLijst] = useState(false);
    const [opstarten, setOpstarten] = useState(false);
    const [boekId, setBoekId] = useState(1);
    const permission = useContext(permissionContext);
    const [filterWoord, setFilterWoord] = useState('');
    const [columns, setColumns] = useState([]);
    const [paginaLengte, setPaginaLengte] = useState(20);

    const colAll = useMemo(() => [
        {
            Header: 'Boek ID',
            accessor: 'id',
        },
        {
            Header: 'Titel',
            accessor: 'titel',
        },
        {
            Header: 'Auteur',
            accessor: 'auteur',
        },
        {
            Header: 'ISBN',
            accessor: 'isbn',
        },
        {
            Header: 'Tags',
            accessor: 'tags',
        },
        {
            Header: 'Beschikbaar',
            Cell: ({ cell }) => (
                bepaalBeschikbaar(cell.row.original.beschikbaar, cell.row.original.exemplarenTotaal)
            )
        },
        {
            Header: 'Uitleningen',
            accessor: 'hoeveeluitleningen',
        },
        {
            Header: 'Reserveer',
            Cell: ({ cell }) => (
                <Reserveren boekId={cell.row.original.id} />
            )
        },
        {
            Header: 'Exemplaar Toevoegen',
            Cell: ({ cell }) => (
                <Button onClick={() => { 
                    setNieuweExemplaren(true); setBoekId(cell.row.original.id); }}>
                        Exemplaren Toevoegen
                </Button>
            )
        },
    ])

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
    }

    const zoekFunctie = (waarde) => {

        let filterData = [];

        setFilterWoord(waarde)

        filterData = boeken.filter(boek => {
            let termaanwezigheid = false;

            Object.entries(boek).map(([key, value]) => {
                if (!termaanwezigheid) {
                    termaanwezigheid = (value !== null ? value.toString().toLowerCase().includes(waarde.toLowerCase()) : false);
                }
            });

            return (termaanwezigheid);
        })
        setBoekenWeergeven(filterData);
    }

    const bepaalBeschikbaar = (beschikbaar, totaal) => {
        if (permission) {
            return (beschikbaar + '/' + totaal);
        } else if (beschikbaar === 0) {
            return ('Niet op voorraad');
        } else {
            return ('Op voorraad');
        }
        
    }

    const bepaalTabel = () => {
        let temp = [...colAll];
        console.log(temp);
        if (permission && !props.persoon) {
            setColumns(temp);
        } else if (permission && props.persoon) {
            temp.splice(7, 1);
            setColumns(temp);
            setPaginaLengte(5);
        } else {
            temp.splice(8, 1);
            temp.splice(6, 1);
            setColumns(temp);
        }
    }

    // Dit wordt telkens uitgevoerd als nieuweExemplaren verandert, dus na sluiten popup ExemplaarToevoegen
    useEffect(() => {
        laadData();
        setBoekenWeergeven(boeken);
        bepaalTabel();
    }, [nieuweExemplaren, exemplarenLijst, opstarten])

    return (
        <div>
            <h1 className='paragraph'>
                <input className='zoekveld' type="text" placeholder='Zoeken...' value={filterWoord}
                    onChange={e => zoekFunctie(e.target.value)} />
                <button className='resetbtn' onClick={() => setOpstarten(!opstarten)}>Reset</button>
            </h1>
            <TableStyle>
                <BasicTable columns={columns} data={boekenWeergeven} paginaLengte={paginaLengte}/>          
            </TableStyle>
            <Popup open={nieuweExemplaren} onClose={() => { setNieuweExemplaren(false); }} modal>
                <div className="modal">
                    <button className="close" onClick={() => setNieuweExemplaren(false)}> &times; </button>
                    <ExemplarenToevoegen boekToegevoegd={true}
                        boekID={boekId} />
                </div>
            </Popup>
            <Popup open={exemplarenLijst} onClose={() => setExemplarenLijst(false)} modal closeOnDocumentClick={false}>
                <div className="modal">
                    <button className="close" onClick={() => setExemplarenLijst(false)}> &times; </button>
                    <ExemplaarInformatie boekId={boekId} persoon={props.persoon} />
                    <br />
                    <Button onClick={() => setExemplarenLijst(false)}>Klaar</Button>
                </div>
            </Popup>

        </div>

    );
}

//niet optimaal om dit in deze file te zetten
//maar maakt het een stuk makkelijker met de uitleen knop
const BasicTable = ({ columns, data, paginaLengte }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
    
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
      } = useTable(
        {
          columns,
          data,
          initialState: { pageSize: paginaLengte },
        },
        usePagination
      )

      // Render the UI for your table
      return (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

        <div className="pagination">
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </Button>{' '}
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </Button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </Button>{' '}
            <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </Button>{' '}
        </div>
      </>
    )
  }

export default MaakBoekTabel;