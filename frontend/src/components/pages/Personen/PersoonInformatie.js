import '../../Styling/ZoekveldStyling.css'; // voor zoekveld styling
import './PersoonInformatie.css';
import { useState, useEffect, useContext, useMemo } from "react";
import { Button } from '../../Styling/Button'
import { connectieString, postRequest, uitleningToevoegen } from '../../../Constanten';
import Popup from 'reactjs-popup';
import ExemplaarInformatie from '../Boeken/ExemplaarInformatie';
import { TableStyle } from '../../Styling/Table';
import MaakBoekTabel from '../Boeken/BoekTabel';
import { persoonContext } from '../../../App';
import { useTable, usePagination } from "react-table";


function PersoonInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [personen, setPersonen] = useState([]);
    const [gezochtePersonen, setGezochtePersonen] = useState([]);
    const [naam, setNaam] = useState('')
    const [succesBericht, setSuccesBericht] = useState('');
    const [uitleningToegevoegd, setUitleningToegevoegd] = useState(false);
    const [huidigPersoon, setHuidigPersoon] = useState(null);
    const [nieuweUitlening, setNieuweUitlening] = useState(false);
    const persoon = useContext(persoonContext);

    const columns1 = useMemo(
        () => [
            {
                Header: 'Naam',
                accessor: 'naam',
            },
            {
                Header: 'E-mail',
                accessor: 'email',
            },
            {
                Header: 'Uitlenen',
                Cell: ({ cell }) => (
                    {/* <Button onClick={() => setUitleningInfo(cell.row.original.id)}>Uitlenen</Button> */},
                    leenUitTabel(cell.row.original, cell.row.original.nieuweUitleningToevoegen, cell.row.original.exemplaar)
                )
            }
        ]
    )
    const columns2 = useMemo(
        () => [
            {
                Header: 'Naam',
                accessor: 'naam',
            },
            {
                Header: 'E-mail',
                accessor: 'email',
            },
            {
                Header: 'Uitlenen',
                Cell: ({ cell }) => (
                    <Button onClick={() => setUitleningInfo(cell.row.original)}>Uitlenen</Button>
                )
            }
        ]
    )


    const haalPersonenOp = () => {
        fetch("http://localhost:8080/personen/")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (Object.entries(result).length > 0) {
                        setPersonen(result);
                        setSuccesBericht("Gevonden!")
                        setGezochtePersonen(result);
                    } else {
                        setSuccesBericht("Geen overeenkomend persoon gevonden")
                    }

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    };

    useEffect(() => {
        haalPersonenOp();
    }, []);

    const haalPersonenOpNaam = (naam) => {
        setNaam(naam);

        let filterData = personen.filter(v => v.naam.toLowerCase().includes(naam.toLowerCase()));
        if (Object.entries(filterData).length > 0) {
            setGezochtePersonen(filterData);
            setSuccesBericht("Personen gevonden")
        } else {
            setGezochtePersonen(personen);
            setSuccesBericht("Geen overeenkomend persoon gevonden")
        }

    };

    const setUitleningInfo = (persoon) => {
        setNieuweUitlening(true);
        setHuidigPersoon(persoon.id);
        setUitleningToegevoegd(false);
    }

    const zetExemplaar = () => {
        if (props.exemplaar) {
            gezochtePersonen.forEach((element) => {
                element.exemplaar = props.exemplaar;
                element.nieuweUitleningToevoegen = props.nieuweUitleningToevoegen;
            })
        }
    }

    return (
        <div>
            <h1 className = 'paragraph'>
            <input className = 'zoekveld' type="string" placeholder='Zoek op naam ...' defaultValue={naam}
                onChange={e => { haalPersonenOpNaam(e.target.value) }} />
            <button className='resetbtn' onClick={() => haalPersonenOpNaam()}>Zoek</button>
            </h1>
            <TableStyle>
                {zetExemplaar()}
                {props.exemplaar ?
                    <BasicTable columns={columns1} data={gezochtePersonen} paginaLengte={5}/>
                    :
                    <BasicTable columns={columns2} data={gezochtePersonen} paginaLengte={20}/>
                }
            </TableStyle>
            <Popup open={nieuweUitlening} modal onClose={() => setNieuweUitlening(false)} closeOnDocumentClick={false}>
                <div className="modal">
                    <button className="close" onClick={() => setNieuweUitlening(false)}> &times; </button>
                    <MaakBoekTabel persoon = {huidigPersoon}/>
                </div>
            </Popup>
        </div>
    );


}
export default PersoonInformatie;

const leenUitTabel = (persoon, nieuweUitleningToevoegen, exemplaar) => {
    if (exemplaar) {
        return (
            <>
                <Button onClick={() => nieuweUitleningToevoegen(persoon.id, exemplaar, 0)}>Leen uit</Button>
            </>
        );
    }
    return null;
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