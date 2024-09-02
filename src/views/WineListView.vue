<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการไวน์ในตระกร้า</h1>
        </div>
        <div class="import-card">
            <div class="row text-start">
                <div class="col-4 horizontal-divider-before">
                    <p class="import-header">พิกัดนำเข้า</p>
                    <p class="import-text">{{ importCheckpoint }}</p>
                </div>
                <div class="col-4 horizontal-divider-before">
                    <p class="import-header">วัตถุประสงค์ในการนำเข้า</p>
                    <p class="import-text">{{ importPurpose }}</p>
                </div>
                <div class="col-4 horizontal-divider-before">
                    <p class="import-header">วันที่นำเข้าโดยประมาณ</p>
                    <p class="import-text">{{ importDate }}</p>
                </div>
            </div>
        </div>
        <div class="table-card" style="overflow-x: auto;">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" class="table-header blue-text">ลำดับ</th>
                        <th scope="col" class="table-header blue-text text-start">ประเภทสินค้า</th>
                        <th scope="col" class="table-header blue-text text-start">ชื่อสินค้า</th>
                        <th scope="col" class="table-header blue-text">แบบ/รุ่น</th>
                        <th scope="col" class="table-header blue-text">ดีกรี/ปริมาณน้ำตาล<br/>CO2/น้ำหนัก/มวล</th>
                        <th scope="col" class="table-header blue-text">ขนาด</th>
                        <th scope="col" class="table-header blue-text">ปริมาณที่นำเข้า</th>
                        <th scope="col" class="table-header blue-text">ราคาที่ใช้เป็นฐาน ในการคำนานภาษี</th>
                        <!-- <th scope="col" class="table-header">หมายเหตุ</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(wine, index) in cartItems.Items" :key="wine.Id">
                        <td>{{ index + 1 }}</td>
                        <td class="text-start">{{ wine.WineLiquor.CategoryLabel }}</td>
                        <td class="text-start">{{ wine.WineLiquor.DisplayName }}</td>
                        <td>{{ wine.WineLiquorPic.WineLiquorYear }}</td>
                        <td>{{ wine.WineLiquorPic.Alcohol }}%</td>
                        <td>{{ wine.BottleSize }}</td>
                        <td>{{ wine.WineLiquorTotal }} ขวด</td>
                        <td class="fw-bold">{{ formatNumber(wine.InitialValue * wine.WineLiquorTotal) }} บาท</td>
                        <!-- <td>{{ wine. }}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="summary-card">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">ปริมาตรสุราในตะกร้า</p>
                <p class="text-end summary-value">{{ totalLiter }}/10 ลิตร</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">รวมจำนวนสุรานำเข้าทั้งหมด</p>
                <p class="text-end summary-value">{{ totalQty }} ขวด</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">มูลค่าที่ใช้ในการคำนวนภาษี</p>
                <p class="text-end summary-value">{{ totalInitialValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2
                }) }} บาท</p>
            </div>
            <hr class="divider-line">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label" style="font-weight: 700;">รวมมูลค่าภาษีที่ต้องชำระ</p>
                <p class="text-end summary-value">{{ totalTaxAll.toLocaleString('en-US', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2
                }) }} บาท</p>
            </div>
            <div class="payment-success">
                <img src="../assets/img/success-icon.png" alt="" class="success-icon">
                <p class="payment-success-text">ทำการชำระภาษีสำเร็จ</p>
            </div>
            <div style="padding: 0px 80px;">
                <button class="btn-previous" @click="onPreviousClick">กลับหน้าแรก</button>
                <button class="btn-downloadQr" @click="onDownloadQRCodeClick">ดาวน์โหลดคิวอาร์โค้ดและแบบฟอร์ม</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getCartItem } from '@/api/getWineSearch'
import { useRouter, useRoute } from 'vue-router'
import QRCode from 'qrcode';

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()
        const importCartId = ref('')
        const token = ref('')
        const cartItems = ref([])
        const importCheckpoint = ref('')
        const importPurpose = ref('')
        const importDate = ref('')
        const totalInitialPrice = ref('')
        const totalTax = ref('')

        const totalLiter = ref(0)
        const totalQty = ref(0)
        const totalInitialValue = ref(0)
        const totalTaxAll = ref(0)

        const onPreviousClick = () => {
            router.push ('/import-wine-list')
        }

        const onDownloadQRCodeClick = () => {
            const qrData = `https://tbit-stamp.exise.go.th/qr/cart/${importCartId.value}`; 

            QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' }, (err, url) => {
                if (err) {
                console.error(err);
                return;
                }

                // Create a link element to download the QR code
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qr-code.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }

        const fetchCartItem = async () => {
            const getCartData = await getCartItem (importCartId.value, token.value)
            cartItems.value = getCartData.data
            console.log('Cart data :', cartItems.value)
            importCheckpoint.value = cartItems.value.ImportPurpose.CheckpointLabel
            importPurpose.value = cartItems.value.ImportPurpose.PurposeLabel
            importDate.value = formatDate(cartItems.value.ImportPurpose.PurposeDate)

            totalLiter.value = cartItems.value.Items?.reduce((acc, cur) => acc + (cur.WineLiquorTotal * (cur.BottleSize === 'Bottle (750ml)' || cur.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(cur.BottleSize) / 1000 : extractBottleSizeL(cur.BottleSize))), 0)
            totalQty.value = cartItems.value.Items?.reduce((acc, cur) => acc + cur.WineLiquorTotal, 0);
            totalInitialValue.value = cartItems.value.Items?.reduce((acc, cur) => acc + (cur.WineLiquorTotal * cur.InitialValue), 0);
            totalTaxAll.value = cartItems.value.Items?.reduce((acc, cur) => acc + (cur.WineLiquorTotal * cur.TotalTax), 0);
        }

        const extractBottleSizeMl = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const extractBottleSizeL = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const formatDate = (data) => {
            const date = new Date(data);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        const formatNumber = (value) =>{
            const floatValue = parseFloat(value);
                return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        onMounted (() => {
            importCartId.value = route.params.cartId;
            token.value = localStorage.getItem('token')
            fetchCartItem()
        })

        return {
            cartItems,
            importCheckpoint,
            importPurpose,
            importDate,
            formatNumber,
            totalInitialPrice,
            totalTax,
            onPreviousClick,
            onDownloadQRCodeClick,
            totalLiter,
            totalQty,
            totalInitialValue,
            totalTaxAll,
        }
    }
}
</script>

<style scoped>
.import-card {
    margin-top: 20px;
    padding: 40px 20%;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.import-header {
    font-size: 18px;
    font-weight: 700;
    color: #2B476D;
}

.import-text {
    font-size: 16px;
    color: #3D3E3E;
}

.btn-previous {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    height: 44px;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin: 10px 0px;
}

.btn-downloadQr {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    height: 44px;
    background-color: #FFFFFF;
    color: #3D3E3E;
    border: 2px solid #3D3E3E;
    border-radius: 5px;
}

.success-icon {
    width: 60px;
    height: auto;
    margin-right: 10px;
}
</style>