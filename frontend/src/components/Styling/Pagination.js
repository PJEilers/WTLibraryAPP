import { useTable, usePagination } from "react-table";
import { Button } from "../Styling/Button.js";

export const BasicTable = ({ columns, data }) => {
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