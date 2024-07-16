export async function getTitle() {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/master/titlelist`, {
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

export async function getEnumGroup(enumGroup) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-EnumGroup/${enumGroup}`, {
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

export async function getProvince() {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtLocations/Province`, {
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

export async function getDistrict(pvCode) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtLocations/District?PvCode=${pvCode}`, {
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

export async function getSubDistrict(pvCode, distCode) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtLocations/SubDistrict?PvCode=${pvCode}&DistCode=${distCode}`, {
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