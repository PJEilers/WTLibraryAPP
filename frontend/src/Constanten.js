export const connectieString = "localhost:8080";

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
