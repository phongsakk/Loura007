export async function getDbdData (idNumber) {
    try {
        // const apiPrefix = process.env.VUE_APP_API_PREFIX;
        const response = await fetch (`https://auth-dbd-checking-s5llprbruq-as.a.run.app/`, {
            method : 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jusristic_id: `${idNumber}`})
        })
        if (!response.ok) {
            if (response.status === 400) {
                const data = await response.json();
                return data
            }
            if (response.status === 502) {
                const data = await response.json();
                return data
            }
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.message}`);
        }else{
            const data = await response.json();
            return data
        }
        
    } catch (error) {
        console.log('Error');
    }
}