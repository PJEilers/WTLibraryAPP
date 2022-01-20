import styled from 'styled-components';

// Tabel Style die kan worden overwritten via classes of zoals verder beneden.
export const TableStyle = styled.div`

table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;    

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
 
    th, td {
        //text-align: center;
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        min-width: 1px;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;        
        text-overflow: ellipsis;
        

        :last-child {
            border-right: 0;
        }
    }
    
}

.Id {
    width: 1px;
}

.Naam {
    width: 50px;
    block-size: fit-content;
}

.Datum {
    width:10px;
    block-size: fit-content;
}

.UitleningKnop {
    width:10px;
    block-size: fit-content;
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