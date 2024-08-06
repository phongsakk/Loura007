export const uploadFileV4 = async (file, accessToken) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    
    const formdata = new FormData();
    formdata.append("file", file);
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    
    const reponse = await fetch("https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-UploadFile", requestOptions)
      
    const data = await reponse.json();

    return data;
}