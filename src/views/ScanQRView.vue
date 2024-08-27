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
                        <button class="btn-download d-flex align-items-center justify-content-center" @click="onDownloadPdfClick" style="padding-left: 20px; padding-right: 20px;"><img src="../assets/img/download-icon.png" alt="" class="download-icon"><span>แบบสำหรับยื่นชำระภาษี ณ ด่านศุลกากรในวันนำเข้า</span></button>
                    </div>
                    <div class="download-button">
                        <button class="btn-download" @click="downloadQrCode"><img src="../assets/img/download-icon.png" alt="" class="download-icon">ดาวน์โหลดคิวอาร์โค้ด</button>
                    </div>
                    <p>สามารถยื่น QR แจ้งกับหน้าด้านศุลกากร ณ ช่อง มีของต้องสำแดง หรือ ช่องแดง</p>
                </div>
                <div class="button-session">
                    <button class="btn-home" @click="onHomeClick">กลับหน้าแรก</button>
                    <button class="btn-cancel-qr" @click="onCancelClick">ย้อนกลับ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
        const router = useRouter()
        const cartId = localStorage.getItem('cartId')
        const token = localStorage.getItem('token')
        const qrCode = ref('')
        const cartItems = ref([])
        const apiUrl = `https://tbit-exiseftvue.web.app/import-wine-list/import-wine-list-in-cart/${cartId}`
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
            const pdfUrl = localStorage.getItem('generatedPdfUrl');
            if (pdfUrl) {
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'import_tax_form.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Optionally, revoke the object URL after download
                URL.revokeObjectURL(pdfUrl);
                }

        // const base64ToArrayBuffer = (base64) => {
        //     const binaryString = atob(base64);
        //     const bytes = new Uint8Array(binaryString.length);
        //     for (let i = 0; i < binaryString.length; i++) {
        //         bytes[i] = binaryString.charCodeAt(i);
        //     }
        //     return bytes.buffer;
        };

        const getQrData = async () => {
            const fetchQrData = await getConfirmExciseTaxForm(cartId, token)
            qrData.value = fetchQrData.data
        }

        const onHomeClick =() => {
            router.push('/')
        }

        const onCancelClick = () => {
            router.push('/pdf-view')
        }

        onMounted (() => {
            // cartId.value = localStorage.getItem('cartId')
            // token.value = localStorage.getItem('token')
            cartItems.value = JSON.parse(localStorage.getItem('cartItemsToScan'))
            // apiUrl.value = `https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-getFtCart/${cartId.value}&token=${token.value}`;
            getQrData ();
            
            const savedPdfBase64 = localStorage.getItem('generatedPdf')
            
            if (savedPdfBase64) {
                const base64String = savedPdfBase64.split(',')[1];

                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                const blob = new Blob([byteArray], { type: 'application/pdf' });
                savedPdfUrl.value = URL.createObjectURL(blob);
                
                // const savedPdfBytes = base64ToArrayBuffer(savedPdfBase64)
                // const savedPdfBlob = new Blob([savedPdfBytes], { type: 'application/pdf' })
                // savedPdfUrl.value = URL.createObjectURL(savedPdfBlob)
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
            onHomeClick,
            onCancelClick,
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
    font-family: "Prompt", sans-serif;
    /* font-size: 20px; */
    font-weight: 700;
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
    font-family: "Prompt", sans-serif;
    size: 20px;
    font-weight: 700;
    margin: 5px 0px;
    width: 100%;
    height: 44px;
    background-color: #162848;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
}

.btn-cancel-qr {
    font-family: "Prompt", sans-serif;
    size: 20px;
    font-weight: 700;
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

.download-icon {
    width: 17px;
    height: auto;
    margin-right: 10px;
}

.download-button {
    padding: 0px 20px;
}
</style>