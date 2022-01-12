import './BoekTabel.css';

function MaakBoekTabel() {
    fetch('http://localhost:8080/boeken', {mode: 'cors'})
    .then(response => response.json())
    .then(data => {
        vulTabel(data);
    })
    .catch((error) => {
          console.error('Error:', error);
    });

    return (
        <div>
            <h1>Boeken</h1>
            <table>
                <thead>
                    <tr>
                        <th>Boek ID</th>
                        <th>Titel</th>
                        <th>Auteur</th>
                        <th>ISBN</th>
                        <th>Tags</th>
                        <th>Exemplaren</th>
                        <th>Exemplaren Beschikbaar</th>
                    </tr>
                </thead>
                <tbody id='boekTabelBody'></tbody>
            </table>
        </div>
    )
    function vulTabel(boeken) {
        let boekTabelHtml = '';
        for (let boek of boeken) {
            boekTabelHtml += `<tr>
                <td>${boek.id}</td>
                <td>${boek.titel}</td>
                <td>${boek.auteur}</td>
                <td>${boek.isbn}</td>               
                <td>${boek.tags}</td>
                <td>1</td>
                <td>2</td>
            </tr>`
        }
        document.getElementById("boekTabelBody").innerHTML = boekTabelHtml;
    }
}

export default MaakBoekTabel;