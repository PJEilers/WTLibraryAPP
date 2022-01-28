import '../../Styling/ZoekveldStyling.css'; // voor zoekveld styling
import './PersoonInformatie.css';
import { useState, useEffect, useContext } from "react";
import { Button } from '../../Styling/Button'
import { connectieString, postRequest, uitleningToevoegen } from '../../../Constanten';
import Popup from 'reactjs-popup';
import ExemplaarInformatie from '../Boeken/ExemplaarInformatie';
import { TableStyle } from '../../Styling/Table';
import MaakBoekTabel from '../Boeken/BoekTabel';
import { persoonContext } from '../../../App';


function PersoonInformatie(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [personen, setPersonen] = useState([]);
    const [gezochtePersonen, setGezochtePersonen] = useState([]);
    const [naam, setNaam] = useState('')
    const [succesBericht, setSuccesBericht] = useState('');
    const [uitleningToegevoegd, setUitleningToegevoegd] = useState(false);
    const [huidigPersoon, setHuidigPersoon] = useState(null);
    const [nieuweUitlening, setNieuweUitlening] = useState(false);
    const persoon = useContext(persoonContext);


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
    }, []);

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

    const setUitleningInfo = (persoon) => {
        setNieuweUitlening(true);
        setHuidigPersoon(persoon.id);
        setUitleningToegevoegd(false);
    }

    return (
        <div>
            <h1 className = 'paragraph'>
            <input className = 'zoekveld' type="string" placeholder='Zoek op naam ...' defaultValue={naam}
                onChange={e => { haalPersonenOpNaam(e.target.value) }} />
            <button className='resetbtn' onClick={() => haalPersonenOpNaam()}>Zoek</button>
            </h1>
            <TableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Email</th>
                            <th>Uitlenen</th>
                            {/* {props.exemplaar ? <th></th> : null} */}
                        </tr>
                    </thead>
                    <tbody>
                        {gezochtePersonen.map(persoon =>
                            <tr key={persoon.id}>
                                <td>
                                    {persoon.naam}
                                </td>
                                <td>
                                    {persoon.email}
                                </td>
                                {/* Dit wordt aangeroepen als je vanaf BoekTabel.js komt: */}
                                {leenUitTabel(persoon, props.nieuweUitleningToevoegen, props.exemplaar)}
                                {/* Dit zie je als je van op PersoonInformatie.js zit:*/}
                                {!props.exemplaar &&
                                    <td >
                                        <Button onClick={() => setUitleningInfo(persoon)}>Uitlenen</Button>
                                    </td>
                                }
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </TableStyle>
            <Popup open={nieuweUitlening} modal onClose={() => setNieuweUitlening(false)} closeOnDocumentClick={false}>
                <div className="modal">
                    <button className="close" onClick={() => setNieuweUitlening(false)}> &times; </button>
                    <MaakBoekTabel persoon = {huidigPersoon}/>
                </div>
            </Popup>
        </div>
    );


}
export default PersoonInformatie;

const leenUitTabel = (persoon, nieuweUitleningToevoegen, exemplaar) => {
    if (exemplaar) {
        return (
            <td>
                <Button onClick={() => nieuweUitleningToevoegen(persoon.id, exemplaar, 0)}>Leen uit</Button>
            </td>
        );
    }
    return null;
}

