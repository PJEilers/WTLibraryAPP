import styled from 'styled-components';

// Tabel Style die kan worden overwritten via classes of zoals verder beneden.
export const TableStyle = styled.div`

table {
    border-spacing: 0;
    border: 1px solid black;

    thead {
        background-color: #25f025;
    }

    tr {
        :nth-child(even){
            background-color: lightgrey;
        }
        :last-child {
        td {
                border-bottom: 0;
            }
        }
    }

    th,
        td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
            border-right: 0;
        }
    }
}
`

// Zo kun je een overwrite doen. Moet je wel nog aanroepen in de tabel waar je de overwrite wil hebben
export const TableStyleOverwritten = styled(TableStyle)`
table{
    thead {
        background-color: black;
    }
}
`