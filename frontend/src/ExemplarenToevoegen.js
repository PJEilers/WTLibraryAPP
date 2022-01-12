import {useState, useRef} from 'react'

function ExemplarenToevoegen(props) {


    const [hoeveelheid, setHoeveelheid] = useState(1);
    const [labels, setLabels] = useState([])
    const [alleenLezen, setAlleenLezen] = useState(false)
    const [knopUit, setKnopUit] = useState(false)

    const bevestig = () => {
        const data = {
            boekId: props.boekID
        }       

        voegExemplarenToe("http://localhost:8080/opslaanexemplaar/" + hoeveelheid, data).then(response => {
            if (response.ok) {
                response.json().then(aantal => {
                    console.log(aantal)
                    let labels = [];
                    for (let h = aantal-hoeveelheid; h < aantal; h++) {
                        labels.push("WT-" + props.boekID + "." + (h+1));
                    }
                    setLabels(labels);
                    setAlleenLezen(true);
                    setKnopUit(true);
                })
            }
        }).catch(error => {
            console.log(error)
        })


    }


    
    if (props.boekToegevoegd) {
        return (
            <div>
                <h2>Hoeveel exemplaren wil je toevoegen</h2>
                <input type = "number" defaultValue={hoeveelheid} min={1}
                                       readOnly={alleenLezen}
                                       onChange={e => setHoeveelheid(e.target.value)}/>
              <button disabled = {knopUit} onClick={() => bevestig()}>Bevestig</button>
              <h3>Gegenereere labels:</h3>
              <ul>
                {labels.map((label,index) => <li key = {index}>{label}</li>)}
              </ul>
            </div>
        )
    } else {
        return null;
    }
}

const voegExemplarenToe = async(url, boekID) =>  {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boekID)
    })
    return response;
}

export default ExemplarenToevoegen;