<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการไวน์ในตระกร้า</h1>
        </div>
        <div class="scan-qr-card">
            <div>
                <div class="qr-session text-center">
                    <div class="qr-code">
                        <div ref="templateReference">
                            <qrcode-vue
                                :value="apiUrl"
                                size="170"
                                level="H"
                            ></qrcode-vue>
                        </div>
                    </div>
                    <div class="download-button">
                        <button class="btn-download" @click="onDownloadPdfClick">แบบสำหรับยื่นชำระภาษี ณ ด่านศุลกากรในวันนำเข้า</button>
                    </div>
                    <div class="download-button">
                        <button class="btn-download" @click="downloadQrCode">ดาวน์โหลดคิวอาร์โค้ด</button>
                    </div>
                    <p>สามารถยื่น QR แจ้งกับหน้าด้านศุลกากร ณ ช่อง มีของต้องสำแดง หรือ ช่องแดง</p>
                </div>
                <div class="button-session">
                    <button class="btn-home">กลับหน้าแรก</button>
                    <button class="btn-cancel-qr">ย้อนกลับ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
// import {QrcodeStream} from 'vue-qrcode-reader'
import { getConfirmExciseTaxForm } from '@/api/getQRData.js'
import { toPng } from "html-to-image";

export default {
    components: {
        QrcodeVue,
        // QrcodeStream,
    },

    setup () {
        const cartId = localStorage.getItem('cartId')
        const token = localStorage.getItem('token')
        const qrCode = ref('')
        const cartItems = ref([])
        const apiUrl = `https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-getFtCart/${cartId}`
        const qrCodeImage = ref(null)
        const savedPdfUrl = ref('')
        const qrData = ref('')
        const templateReference = ref(null);

        // const onDecode = (cartId) => {
        //     const constructedUrl = `https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-getFtCart/${cartId.value}?token=${token.value}`;
        //     apiUrl.value = constructedUrl;
        //     window.open(apiUrl, '_blank');
        // }

        // const captureQrCodeImage = (img) => {
        //     qrCodeImage.value = img
        //     console.log('QR Code image:', qrCodeImage.value)
        // }

        const downloadQrCode = () => {
            if (templateReference.value) {
                toPng(templateReference.value, {
                    cacheBust: true,
                    imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA' +
                                    'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
                                    '//8/w38GIAXDIBKE0DHxgljNBAAO' +
                                    '9TXL0Y4OHwAAAABJRU5ErkJggg==',
                })
                .then((dataUrl) => {
                    console.log("Downloading QR code!");
                    const link = document.createElement('a');
                    link.download = "my-qrcode.png";
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Error capturing QR code image:', err);
                });
            } else {
                console.error('QR code element not found');
            }
        }

        const onDownloadPdfClick = () => {
            if (savedPdfUrl.value) {
                const link = document.createElement('a')
                link.href = savedPdfUrl.value // Use the saved PDF URL
                link.download = 'import_tax_form.pdf' // Set the filename for download
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } else {
                console.error('No PDF URL available.')
            }
        }

        const base64ToArrayBuffer = (base64) => {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
        };

        const getQrData = async () => {
            const fetchQrData = await getConfirmExciseTaxForm(cartId, token)
            qrData.value = fetchQrData.data
        }


        onMounted (() => {
            // cartId.value = localStorage.getItem('cartId')
            // token.value = localStorage.getItem('token')
            cartItems.value = JSON.parse(localStorage.getItem('cartItemsToScan'))
            // apiUrl.value = `https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-getFtCart/${cartId.value}&token=${token.value}`;
            getQrData ();
            
            const savedPdfBase64 = localStorage.getItem('generatedPdf')
            if (savedPdfBase64) {
                const savedPdfBytes = base64ToArrayBuffer(savedPdfBase64)
                const savedPdfBlob = new Blob([savedPdfBytes], { type: 'application/pdf' })
                savedPdfUrl.value = URL.createObjectURL(savedPdfBlob)
            }

            console.log("Token :", token)
        })

        return {
            qrCode,
            cartId,
            cartItems,
            apiUrl,
            qrData,
            templateReference,
            onDownloadPdfClick,
            downloadQrCode,
            // captureQrCodeImage,
            qrCodeImage
            // onDecode
        }
    }
}
</script>

<style scoped> 
.scan-qr-card {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 50px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.qr-session {
    width: 373px;
    height: auto;
    background-color: #EAEAEA;
    padding: 20px 30px;
    margin-bottom: 20px;
}

.btn-download {
    margin: 10px 0px;
    padding: 10px ;
    width: 100%;
    background-color: #C7C7C7;
    box-shadow: 0px 1px 3px #22222280;
    border: none;
    border-radius: 5px;
}

/* .button-session {
    padding: 5px 0px;
} */

.btn-home {
    margin: 5px 0px;
    width: 100%;
    height: 44px;
    background-color: #162848;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
}

.btn-cancel-qr {
    margin: 5px 0px;
    width: 100%;
    height: 44px;
    background-color: #77818A;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
}

.qr-code {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>