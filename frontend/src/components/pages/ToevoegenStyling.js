import styled from "styled-components";

export const ToevoegenStyling = styled.div`
div{
    display: block;
    width: 600px;
    margin-top: 75px;
    border: solid medium black;
    border-radius: 15px;
    background: rgb(47, 211, 6, .8);
    margin-left:auto;
    margin-right: auto;
    padding: 10px;
    text-align: left;
}
h1{
    font-size: 1.25rem;
}

.toevoegingen {
    color: black;
    outline: none;
    display: flex;
    height: 25px;
    text-decoration:none;
    position: absolute;
}
.toevoegingen:hover{
    border-bottom: solid 2px black;
}
`