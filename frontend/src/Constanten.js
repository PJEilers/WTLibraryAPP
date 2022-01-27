export const connectieString = "http://localhost:8080";

export const postRequest = async(url,data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response;
}

export const uitleningToevoegen = (persoonId, exemplaar) => {
    let output = true;
    const nieuweUitlening = {
        exemplaar: {id: exemplaar.id},
        persoon: {id: persoonId},
        beginDatum: new Date().toISOString().split('T')[0]
    }
    postRequest(connectieString + '/maakuitleningaan/0', nieuweUitlening).then(response => {
        if (response.ok) {
            response.json().then(uitlening => {                
                output = true;
            })
        } else {
            console.log("mislukt");
            output = false;
        }
    }).catch(error => {console.log(error); output = false;});
    return output;

}