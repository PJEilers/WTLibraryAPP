import styled from "styled-components";

export const BoekToevoegenStyling = styled.div`
span{
    display: block;
    width: 35%;
    margin-top: 1%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    text-align: left;
}


h1{
    font-size: 30px;
    width: 275px;
    border-bottom: 2px solid black;
}

h2 {
    color: black;
    font-size: 15px;
    width: 200px;
    float: left;
}

h3{
    font-size: 18px;
}

label {
    color: black;//#25f025;
    font-weight: bold;
    display: block;
    width: 90px;
    text-align: left;
    float: left;
}

form {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap:5px;
    //margin-left: auto;
    //margin-right: auto;
    // display:grid;
    grid-gap:5px;
}

form label:after{
    content: ":";
}

form #stuur:after{
    content: "";
}

input{
    display: grid;
    border: none;
    border-bottom: 2px solid black;
    &:focus{
        outline:none;
    }
}

button{
    background-color: black;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #25f025;
    font-size: 15px;
    height: 40px;
    width: 150px;
    }

button:hover{
    color: #25f025;
    cursor:pointer;
}

.submit{
    background-color: black;
    color: #fff;
    width: 150px;
    border-radius: 4px;
    border: 1px solid #25f025;
}
.submit:hover{
    color: #25f025;
    cursor: pointer;
}

.submit2{
    background-color: black;
    color: #fff;
    width: 100px;
    margin-left: 125px;;
    border-radius: 4px;
    border: 1px solid #25f025;
}
.submit2:hover{
    color: #25f025;
    cursor: pointer;
}

.klikveld{
    margin: auto;
    height: 20px;
    width: 80px;
}

`


