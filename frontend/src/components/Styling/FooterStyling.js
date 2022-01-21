import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    padding: 20px 0px;
    position: absolute;
    left: 0;
    bottom: 0;
    right:0;
    background: radial-gradient(circle, black 70%, #25f025 100%);
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 100px;

`
export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 50px;

    @media (max-width: 960px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`

export const StyleLink = styled(Link)`
    color:#fff;
    margin-bottom: 15px;
    font-size: 0.85rem;
    text-decoration: none;

    &:hover{
        color: #25f025;
        cursor: pointer;
        transition: 0.1s ease-in;
    }
`
export const Item = styled.div`
    font-size: 0.85rem;
    margin-bottom: 10px;
    color: grey;
    text-decoration: none;

    &:hover{
        cursor: default;
        
    }
`


export const Title = styled.div`
    font-size: 1rem;
    color: #25f025;
    margin-bottom: 20px;
    font-weight: bold;

    &:hover{
        cursor:default;
    }
`