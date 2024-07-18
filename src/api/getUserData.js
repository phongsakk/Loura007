export async function getRegisterData(userData) {
    try {
        // const apiPrefix = process.env.VUE_APP_API_PREFIX;
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtSignUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            if (response.status === 400) {
                const data = await response.json();
                return data
            }
            if (response.status === 409) {
                const data = await response.json();
                return data
            }
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.message}`);
        }
        const data = await response.json();
        return data;
    } catch {
        throw new Error("Registration failed");
    }
}

export async function getLonginUser (email, password) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtSignIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email : email, Password : password }),
        })
        if (!response.ok) {
            if (response.status === 400) {
                const data = await response.json();
                return data
            }
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.message}`);
        }
        const data = await response.json();
        return data;
    } catch {
        throw new Error ("Login failed")
    }
}

export async function verifyEmail (code, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtVerifyEmail?code=${code}`, {
        method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
    } catch {
        throw new Error ("Login failed")
    }
}

export async function resendEmail (email, token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtEmailResend`, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(email),
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

export async function getUserProfile (token) {
    try {
        const response = await fetch(`https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-FtProfile`, {
        method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (!response.ok) {
            if (response.status === 403) {
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