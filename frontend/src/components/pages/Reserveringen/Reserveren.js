import {connectieString, postRequest} from "../../../Constanten.js"
import {useState, useContext} from "react"
import {persoonContext} from "../../../App.js"
import { Button } from '../../Styling/Button'

function Reserveren (props) {

    const [succesBericht, setSuccesBericht] = useState('')

    const persoonInfo = useContext(persoonContext);
    
    const maakReservering = () => {
        
        const reserveringData = {
            boek : { id: props.boekId},
            persoon : { id: persoonInfo.persoonId},
            datum : new Date().toISOString().split('T')[0]
        }

        console.log(reserveringData);

        postRequest(connectieString + "/maakreserveringaan", reserveringData).then(response => {
            if (response.ok) {
                response.json().then(reservering => {
                    if (reservering.bestaat) {
                        setSuccesBericht("Reservering bestaat al")
                        
                    } else {
                        setSuccesBericht("Reservering is succesvol toegevoegd")
                    }
                })              
            } else {
                setSuccesBericht("Er is iets fout gegeaan")
            }
        }).catch(error => {
            setSuccesBericht("Er is iets fout gegeaan")
        })
    }
    
    return (
        <div>
            <Button buttonSize = 'btn--small' onClick={() => maakReservering()}>Reserveer</Button> <span>{succesBericht}</span>
        </div>
    )
}

export default Reserveren;
