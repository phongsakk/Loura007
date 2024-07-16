export async function getWineSearch(wineName, vintage, location, avb, bottleSize, bottleCode, currencyCode, uid) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/wine/WineSearch?Winename=${wineName}&Vintage=${vintage}&Location=${location}&AVB=${avb}&BottleSize=${bottleSize}&BottleCode=${bottleCode}&Currencycode=${currencyCode}&uid=${uid}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) {
            if (response.status === 404) {
                const data = await response.json();
                return data
            }
            throw new Error('Error: Unable to fetch data');
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function uploadWineSearchImage(winePhoto) {
    try {
        const reader = new FileReader();

        const base64Promise = new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
        });

        reader.readAsDataURL(winePhoto);

        const base64Image = await base64Promise;
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv2-searchImageByWS`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: base64Image })

        })
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

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

export async function addToCart (wineData) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-addFtCart`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wineData)
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

export async function getCartItem(cartId, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-getFtCart/${cartId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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

export async function updateCart (wineData, cartId, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-updateFtCart/${cartId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(wineData)
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