export async function getImportLiquor (liquorData, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-addFtImportPurpose`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(liquorData)
        })
        if (!response.ok) {
            throw new Error('Error: Unable to fetch data');
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}