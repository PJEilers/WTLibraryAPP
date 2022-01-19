import './PersoonInformatie.css';
import { useState, useEffect } from "react";
import {Button} from '../../Styling/Button'


function PersoonInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [personen, setPersonen] = useState([]);
    const [gezochtePersonen, setGezochtePersonen] = useState([]);
    const [naam, setNaam] = useState('')
    const [succesBericht, setSuccesBericht] = useState('');
  

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
    },[]);

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


    return (
        <div>
            <input type="string" defaultValue={naam}
                onChange={e => {haalPersonenOpNaam(e.target.value)}} />
            <button onClick={() => haalPersonenOpNaam()}>Zoek Personen</button>
            <table>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Email</th>
                      {props.exemplaar ? <th></th> : null}
                    </tr>
                </thead>
                <tbody>
                    {PersonenTabel(gezochtePersonen, props.nieuweUitleningToevoegen, props.exemplaar)}
                </tbody>
            </table>
            <p>{succesBericht}</p>

        </div>
    );


}
export default PersoonInformatie;

const leenUitTabel = (persoon, nieuweUitleningToevoegen, exemplaar) => {
    if (exemplaar) {
        return (

           <td>
               <Button onClick = {() => nieuweUitleningToevoegen(persoon.id, exemplaar)}>Leen uit</Button>
           </td>
        );
    }
    return null;
}

function PersonenTabel(personen,nieuweUitleningToevoegen, exemplaar) {
    return (
        <>
            {personen.map(persoon =>
                <tr>
                    <td>
                        {persoon.naam}
                    </td>
                    <td>
                        {persoon.email}
                    </td>
                    {leenUitTabel(persoon, nieuweUitleningToevoegen, exemplaar)}
                </tr>
            )
            }
        </>
    );
}