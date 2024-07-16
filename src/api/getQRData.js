export async function getConfirmExciseTaxForm (cardId, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtCreateQRCode/${cardId}`, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            throw new Error('Error: Unable to fetch data');
        }
        const data = await response.json();
        return data
    } catch {
        throw new Error ("Login failed")
    }
}