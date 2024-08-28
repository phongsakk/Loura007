export async function getConfirmExciseTaxForm(cardId, token) {
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
        throw new Error("Login failed")
    }
}

export async function getQRCode(cardId, token) {
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
        throw new Error("Login failed")
    }
}

export async function setPairStampBottle(BottleId, SNNO, token) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const body = JSON.stringify({ BottleId, SNNO });

    const options = {
        method: "POST",
        headers: headers,
        body: body,
    };

    try {
        const response = await fetch("https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtQrPairStampBottle", options)

        if (!response.ok || response.status >= 400) {
            console.log(response);
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error("Login failed")
    }

}

export async function setQrConfirmImage(raw, token) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(raw),
    };

    try {
        const response = await fetch("https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtQrConfirmImage", options)

        if (!response.ok || response.status >= 400) {
            console.log(response);
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create image confirmation");
    }
}