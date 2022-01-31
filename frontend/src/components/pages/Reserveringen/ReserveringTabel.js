import '../../Styling/ZoekveldStyling.css'
import './ReserveringTabel.css';
import { useState, useEffect, useMemo } from "react";
import { TableStyle } from '../../Styling/Table';
import { Button } from '../../Styling/Button'
import Popup from 'reactjs-popup';
import { uitleningToevoegen } from '../../../Constanten'
import ExemplaarInformatie from '../Boeken/ExemplaarInformatie';
import { useTable, usePagination } from "react-table";

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
                    <Button onClick={() => setUitleningInfo(cell.row.original.persoonId, cell.row.original.boekId, cell.row.original.id)}>Uitlenen</Button>
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

    return (
        <div>
            <h1 className='paragraph'>
                <input className='zoekveld' type="text" placeholder='Zoeken...' value={filterWoord}
                    onChange={e => zoekFunctie(e.target.value)} />
                <button className='resetbtn' onClick={() => setOpstarten(!opstarten)}>Reset</button>
            </h1>

            <TableStyle>
                <BasicTable columns={columns} data={reserveringWeergeven}/>
                
                <Popup open={nieuweUitlening} modal onClose={() => setNieuweUitlening(false)}>
                    <div className="modal">
                        <button className="close" onClick={() => setNieuweUitlening(false)}> &times; </button>
                        <ExemplaarInformatie persoon={huidigPersoon} boekId={huidigBoek} reserveringId={huidigReserveringId} />
                    </div>
                </Popup>
            </TableStyle>
        </div>
    );
}


//niet optimaal om dit in deze file te zetten
//maar maakt het een stuk makkelijker met de uitleen knop
const BasicTable = ({ columns, data }) => {
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
          initialState: { pageSize: 20 },
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

export default MaakReserveringTabel;