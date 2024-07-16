export async function getBottleSize(bottleSize) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/master/enumlist?enumgroup=${bottleSize}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
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