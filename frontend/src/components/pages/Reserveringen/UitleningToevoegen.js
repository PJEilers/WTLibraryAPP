import "./UitleningToevoegen.css"
import {useState} from 'react'

function UitleningToevoegen () {
    const [exemplaarId, setExemplaarId] = useState(1)
    const [persoonId, setPersoonId] = useState(1)
    const [beginDatum, setBeginDatum] = useState("2000-01-01")

    const stuurOp = (e) => {
        const nieuwUitlening = {
            exemplaarId: exemplaarId,
            persoonId: persoonId,
            beginDatum: beginDatum
        }

        maakUitleningAan("http://localhost:8080/maakuitleningaan", nieuwUitlening)
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

const maakUitleningAan = async(url, uitlening) =>  {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uitlening)
    })
    return response;
}

export default UitleningToevoegen;