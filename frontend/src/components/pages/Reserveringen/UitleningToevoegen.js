import "./UitleningToevoegen.css"
import {useState} from 'react'
import { postRequest } from "../../../Constanten"

function UitleningToevoegen () {
    const [exemplaarId, setExemplaarId] = useState(1)
    const [persoonId, setPersoonId] = useState(1)
    const [beginDatum, setBeginDatum] = useState("2000-01-01")

    const stuurOp = (e) => {
        const nieuwUitlening = {
            exemplaar: {id: exemplaarId},
            persoon: {id: persoonId},
            beginDatum: beginDatum
        }

        postRequest("/maakuitleningaan", nieuwUitlening)
            .then(response => {
                alert("Is goed gegaan")
            })
            .catch(error => {
                alert("Is fout gegaan")
            })
    }

    return (
        <div>
            Uitlening: exemplaar id, persoon id, begin datum (yyyy-mm-dd)<br/>
            <input type="number"
                value={exemplaarId}
                onChange={e => setExemplaarId(e.target.value)}
            />
            <input type="number"
                value={persoonId}
                onChange={e => setPersoonId(e.target.value)}
            />
            <input type="text"
                value={beginDatum}
                onChange={e => setBeginDatum(e.target.value)}
            />
            <button onClick={() => stuurOp()}>Maak uitlening aan</button>
        </div>
    )
}

export default UitleningToevoegen;