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
        <div v-for="wine in cartItems" :key="wine.Id">
            <div class="product-card">
                <div class="row">
                    <div class="col-lg-2 d-flex justify-content-center align-items-center">
                        <div class="wine-image-card">
                            <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.WineLiquorPic.Path}`" alt="" class="card-image">
                        </div>
                    </div>
                    <div class="col-lg-7 horizontal-divider">
                        <div class="d-flex justify-content-between" style="padding-top: 10px;">
                            <div class="category">
                                <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{wine.WineLiquor.CategoryLabel}}</p>
                            </div>
                            <div class="year">
                                <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span style="color: #000000;">{{ wine.WineLiquorPic.WineLiquorYear }}</span></p>
                            </div>
                        </div>
                        <div class="wine-name text-start">{{ wine.WineLiquor.DisplayName }}</div>
                        <div class="row text-start">
                            <div class="col-3">
                                <label class="form-label">ประเทศที่ผลิต</label>
                                <p>{{ wine.WineLiquor.Country }}</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                <p>alc. {{ wine.WineLiquorPic.AVB }} % vol.</p>
                            </div>
                            <div class="col-6">
                                <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                <p>{{ wine.BottleSize }}</p>
                            </div>
                        </div>
                        <div class="row text-start">
                            <div class="col-3">
                                <label class="form-label">ภาษีสรรพสามิต</label>
                                <p>{{ wine.ExciseTax }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ภาษีท้องถิ่น</label>
                                <p>{{ wine.LocalTax }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">เงินบำรุง 4 กองทุน</label>
                                <p>{{ wine.Fund }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ภาษีศุลกากร</label>
                                <p>{{ wine.CustomsDuty }} บาท</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 price-col text-end">
                        <label class="form-label" style="font-weight: 700;">มูลค่าเบื้องต้น</label>
                        <p class="price-text">{{ formatNumber(wine.InitialValue) }} บาท</p>
                        <label class="form-label" style="font-weight: 700;">รวมภาษีและเงินกองทุนทั้งหมด</label>
                        <p class="price-text">{{ wine.TotalTax }} บาท</p>
                        <div class="d-flex justify-content-between">
                            <label class="form-label text-start">จำนวนขวด</label>
                            <div class="quantity-count">
                                <button class="btn-count" @click="decreaseQuantity(wine.Id)" :disabled="wine.WineLiquorTotal <= 1">-</button>
                                <input type="text" class="quantity-input text-center" v-model="wine.WineLiquorTotal" disabled>
                                <button class="btn-count" @click="increaseQuantity(wine.Id)" :disabled="totalLiters + (wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) : extractBottleSizeL(wine.BottleSize)) > 10.00">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="summary-card">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">ปริมาตรไวน์ในตะกร้า</p>
                <p class="text-end summary-value">{{ totalLiters }}/10 ลิตร</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">รวมจำนวนไวน์นำเข้าทั้งหมด</p>
                <p class="text-end summary-value">{{ totalQuantity }} ขวด</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">มูลค่าที่ใช้ในการคำนวนภาษี</p>
                <p class="text-end summary-value">{{ formatNumber(totalInitialPrice) }} บาท</p>
            </div>
            <hr class="divider-line">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label" style="font-weight: 700;">รวมภาษีและเงินกองทุนทั้งหมด</p>
                <p class="text-end summary-value">{{ formatNumber(totalTaxAmount) }} บาท</p>
            </div>
                
            <div class="payment-success">
                <img src="../assets/img/success-icon.png" alt="" class="success-icon">
                <p class="payment-success-text">ทำการชำระภาษีสำเร็จ</p>
            </div>
            <!-- <div class="summary-button"> -->
                <button class="btn-home" @click="onBackToHomeClick">กลับหน้าแรก</button>
                <button class="btn-downloadQr" @click="onDownloadQRCodeClick">ดาวน์โหลดคิวอาร์โค้ดและแบบฟอร์ม</button>
            <!-- </div> -->
        </div>
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from  'vue'
import { useRouter } from 'vue-router'
import { getCartItem } from '@/api/getWineSearch'

export default {
    setup() {
        const router = useRouter()

        const userCartId = ref('')
        const token = ref('')
        const cartItems = ref([])
        const importCheckpoint = ref('')
        const importPurpose = ref('')
        const importDate = ref('')

        const spinner = ref(false)

        const onBackToHomeClick = () => {
            router.push('/')
        }

        const totalLiters = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => {
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
                return sum + (bottleSize * item.WineLiquorTotal);
            }, 0);
        });

        const totalQuantity = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => sum + item.WineLiquorTotal, 0);
        });

        const totalInitialPrice = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => sum + (item.InitialValue * item.WineLiquorTotal), 0);
        });

        const totalTaxAmount = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => sum + parseFloat(String(item.TotalTax).replace(/,/g, '')), 0);
        });

        const fetchCartItem = async() => {
            spinner.value = true
            const cartData = await getCartItem (userCartId.value, token.value)
            cartItems.value = cartData.data.Items
            importCheckpoint.value = cartData.data.ImportPurpose.CheckpointLabel
            importPurpose.value = cartData.data.ImportPurpose.PurposeLabel
            importDate.value = formatDate(cartData.data.ImportPurpose.PurposeDate)
            spinner.value = false
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

        const extractBottleSizeMl = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const extractBottleSizeL = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
            return match ? parseFloat(match[1]) : 0;
        }

        onMounted ( () => {
            userCartId.value = localStorage.getItem('userCartId')
            token.value = localStorage.getItem('token')

            fetchCartItem()
        })

        return {
            cartItems,
            importCheckpoint,
            importPurpose,
            importDate,
            spinner,
            totalLiters,
            totalQuantity,
            totalInitialPrice,
            totalTaxAmount,
            formatNumber,
            extractBottleSizeL,
            extractBottleSizeMl,
            onBackToHomeClick
        }
    }
}
</script>

<style scoped>
.import-card {
    margin-top: 30px;
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

.wine-name {
    font-size: 22px;
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

.btn-home {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    height: 44px;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
}

.success-icon {
    width: 60px;
    height: auto;
    margin-right: 10px;
}

.payment-success {
    display: flex;
    align-items: center;
    margin: 10px 0px;
}
</style>