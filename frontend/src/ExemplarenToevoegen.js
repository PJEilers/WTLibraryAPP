import {useState, useRef} from 'react'

function ExemplarenToevoegen(props) {


    const [hoeveelheid, setHoeveelheid] = useState(1);
    const [labels, setLabels] = useState([])
    const [alleenLezen, setAlleenLezen] = useState(false)
    const [knopUit, setKnopUit] = useState(false)

    const bevestig = () => {
        //TODO POST request/response

        let labels = [];
        const afko = props.boektitel.substring(0,4); //Eerste 4 letters van boek voor nu
        for (let h = 0; h < hoeveelheid; h++) {
            labels.push("WT-" + afko + "-" + (h+1));
        }
        setLabels(labels);
        setAlleenLezen(true);
        setKnopUit(true);
    }
    
    if (props.boekToegevoegd) {
        return (
            <div key = {props.uniekID}>
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
    }
    return null;
}

export default ExemplarenToevoegen;