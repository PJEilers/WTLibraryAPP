import styled from "styled-components";

export const BoekToevoegenStyling = styled.div`
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
    left: 90px;
    width: 375px;
}

h2 {
    font-size: 18px;
    color: black;
    font-size: 15px;
    width: 170px;
}

h3{
    font-size: 18px;
}

label {
    color: black;
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
    grid-gap:6px;
}

form label:after{
    content: ":";
}

form #stuur:after{
    content: "";
}

input{
    display: grid;
    position: relative;
    border-radius: 7px;
    left: 50px;
    border: none;
    &:focus{
        outline:none;
    }
}

button{
    background-color: black;
    position: relative;
    left: 145px; 
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

.submit2{
    background-color: black;
    position: relative;
    margin-top: 9px;
    left: 80px;
    color: #fff;
    width: 100px;
    height: 25px;
    border-radius: 4px;
    border: 1px solid rgb(47, 211, 6);
}
.submit2:hover{
    color: rgb(47, 211, 6);
    cursor: pointer;
}

.klikveld{
    background-color: rgb(47, 211, 6,.1);
    border: solid 2px black;
    border-radius: 4px;
    color: black;
    position: absolute;
    right: 80px; 
    margin: auto;
    margin-top: 9px;
    height: 20px;
    width: 40px;
}

`


