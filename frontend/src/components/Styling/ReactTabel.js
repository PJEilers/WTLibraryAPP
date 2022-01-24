import { useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import { TableStyle } from './Table';

// Create a default prop getter
const defaultPropGetter = () => ({})

// Expose some prop getters for headers, rows and cells, or more if you want!
function ReactTabel({
    headers,
    input,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    hideColumns,
}) {

    const columns = useMemo(
        () => headers,
        [headers]
    )

    const data = useMemo(
        () => input,
        [input]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        toggleHideColumn,
    } = useTable({
        columns,
        data,
    })

    useEffect(() => {
        hideColumns.map(column => toggleHideColumn(column))
    }, [hideColumns])

    return (
        <TableStyle>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    // Return an array of prop objects and react-table will merge them appropriately
                                    {...column.getHeaderProps([
                                        {
                                            className: column.className,
                                            style: column.style,
                                        },
                                        getColumnProps(column),
                                        getHeaderProps(column),
                                    ])}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            // Merge user row props in
                            <tr {...row.getRowProps(getRowProps(row))}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            // Return an array of prop objects and react-table will merge them appropriately
                                            {...cell.getCellProps([
                                                {
                                                    className: cell.column.className,
                                                    style: cell.column.style,
                                                },
                                                getColumnProps(cell.column),
                                                getCellProps(cell),
                                            ])}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </TableStyle>
    )
}

// function ReactTabel({input, headers}) {


//     return (
//         <TableStyle>
//             <TableReact
//                 columns={columns}
//                 data={data}
//                 // getHeaderProps={column => ({
//                 //     onClick: () => alert('Header!'),
//                 // })}
//                 // getColumnProps={column => ({
//                 //     onClick: () => alert('Column!'),
//                 // })}
//                 // getRowProps={row => ({
//                 //     style: {
//                 //         background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
//                 //     },
//                 // })}
//                 // getCellProps={cellInfo => ({
//                 //     style: {
//                 //         backgroundColor: `hsl(${120 * ((120 - cellInfo.value) / 120) * -1 +
//                 //             120}, 100%, 67%)`,
//                 //     },
//                 // })}
//             />
//         </TableStyle>
//     )
// }

export default ReactTabel
