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

export async function getQRCode (cardId, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtGetQrCode/${cardId}`, {
        method: 'GET',
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

export async function getScanQRCodeStampOfficer (stampQRData, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtQrPairStampBottle`, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(stampQRData),
        })
        if (!response.ok) {
            if (response.status === 400) {
                const data = await response.json();
                return data
            }
            throw new Error('Error: Unable to fetch data');
        }
        const data = await response.json();
        return data
    } catch {
        throw new Error ("Login failed")
    }
}

export async function getQRConfirmImportWine (StampItems, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtQrConfirmImage`, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(StampItems),
        })
        if (!response.ok) {
            if (response.status === 400) {
                const data = await response.json();
                return data
            }
            throw new Error('Error: Unable to fetch data');
        }
        const data = await response.json();
        return data
    } catch {
        throw new Error ("Login failed")
    }
}