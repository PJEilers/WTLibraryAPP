import styled from "styled-components";

export const PersoonToevoegenStyling = styled.div`
span{
    display: block;
    width: 450px;
    margin-top: 1%;
    border: solid medium black;
    border-radius: 15px;
    background: rgb(47, 211, 6, .8);
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
    text-align: left;
}


h1{
    font-size: 30px;
    position: relative;
    left: 75px;
    width: 375px;
}

label {
    color: black;
    font-weight: bold;
    display: block;
    width: 150px;
    text-align: left;
    float: left;
}

form {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap:5px;
    grid-gap:6px;
}

form label:after{
    content: ":";
}

form #checkbox{
    vertical-align: left;
}

form #stuur:after{
    content: "";
}

input{
    display: grid;
    position: relative;
    border: none;
    border-radius: 7px;
    &:focus{
        outline:none;
    }
}

button{
    background-color: black;
    position: relative;
    left: 157px; 
    color: #fff;
    border-radius: 7px;
    border: 1px solid rgb(47, 211, 6);
    font-size: 15px;
    height: 40px;
    width: 150px;
    }

button:hover{
    color: rgb(47, 211, 6);
    cursor:pointer;
}

.submit{
    background-color: black;
    font-size:1rem;
    color: #fff;
    width: 150px;
    height: 25px;
    border-radius: 7px;
    border: 1px solid rgb(47, 211, 6);
}
.submit:hover{
    color: rgb(47, 211, 6);
    cursor: pointer;
}

`
