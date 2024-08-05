<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการสุราในตระกร้า</h1>
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
        <div v-if="cartItems">
            <div v-for="wine in cartItems.Items" :key="wine.Id" class="product-card">
                <div class="row">
                    <div class="col-lg-2 d-flex align-items-center justify-content-center">
                        <div class="wine-image-card">
                            <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.WineLiquorPic.Path}`" alt="" class="card-image">
                        </div>
                    </div>
                    <div class="col-lg-7 horizontal-divider">
                        <div class="d-flex justify-content-between">
                            <div class="category">
                                <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{wine.WineLiquor.CategoryLabel}}</p>
                            </div>
                            <div class="year">
                                <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span class="manu-year">{{ wine.WineLiquorPic.WineLiquorYear }}</span></p>
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
                                <p>alc. {{ wine.WineLiquorPic.Alcohol }} % vol.</p>
                            </div>
                            <div class="col-6">
                                <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                <p>{{ wine.BottleSize ? wine.BottleSize : '' }}</p>
                            </div>
                        </div>
                        <div class="row text-start">
                            <div class="col-3">
                                <label class="form-label">ภาษีสรรพสามิต</label>
                                <p>{{ formatNumber(wine.ExciseTax) }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ภาษีท้องถิ่น</label>
                                <p>{{ formatNumber(wine.LocalTax) }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">เงินบำรุงกองทุน</label>
                                <p>{{ formatNumber(wine.Fund) }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ภาษีศุลกากร</label>
                                <p>{{ formatNumber(wine.CustomsDuty) }} บาท</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 price-col text-end">
                        <label class="form-label fw-bold">มูลค่าเบื้องต้น</label>
                        <p class="price-text">{{ formatNumber(wine.InitialValue) }} บาท</p>
                        <label class="form-label fw-bold">รวมภาษีทั้งสิ้น</label>
                        <p class="price-text">{{ formatNumber(wine.TotalTax) }} บาท</p>
                        <div class="d-flex justify-content-between">
                            <label class="form-label">จำนวนขวด</label>
                            <div class="quantity-count">
                                <button class="btn-count" @click="decreaseQuantity(wine.Id)">-</button>
                                <input type="text" class="quantity-input text-center" v-model="wine.WineLiquorTotal" disabled>
                                <button class="btn-count" @click="increaseQuantity(wine.Id)">+</button>
                            </div>
                        </div>
                        <div>
                            <button class="delete-product" @click="onDeleteCartItemClick(wine.Id)">ลบรายการสินค้า</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="summary-card">
                <div class="d-flex justify-content-between">
                    <p class="text-start summary-label">ปริมาตรสุราในตะกร้า</p>
                    <p class="text-end summary-value">{{ totalLiters }}/10 ลิตร</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="text-start summary-label">รวมจำนวนสุรานำเข้าทั้งหมด</p>
                    <p class="text-end summary-value">{{ totalQuantity }} ขวด</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="text-start summary-label">เป็นมูลค่าเบื้องต้น</p>
                    <p class="text-end summary-value">{{ formatNumber(totalInitialPrice) }} บาท</p>
                </div>
                <hr class="divider-line">
                <div class="d-flex justify-content-between">
                    <p class="text-start summary-label" style="font-weight: 700;">รวมมูลค่าภาษีที่ต้องชำระ</p>
                    <p class="text-end summary-value">{{ formatNumber(totalTaxAmount) }} บาท</p>
                </div>
                <div class="summary-button">
                    <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
                    <button class="btn-confirm" @click="onConfirmClick">ยืนยัน</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
// import { jsPDF } from 'jspdf'
import { getCartItem } from '@/api/getWineSearch'
import router from '@/router/router'

// import moment from 'moment';
// import 'moment/locale/th';

export default {
    setup() {
        const cartId = ref('')
        const token = ref('')
        const cartItems = ref([])
        const importCheckpoint = ref('')
        const importPurpose = ref('')
        const importDate = ref('')
        const spinner = ref(false)

        const totalLiters = computed(() => {
            return (cartItems.value?.Items || []).reduce((sum, item) => {
                const bottleSize = item.BottleSize ? (item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize)) : '';
                return sum + (bottleSize * item.WineLiquorTotal);
            }, 0);
        });

        const totalQuantity = computed(() => {
            return (cartItems.value?.Items || []).reduce((sum, item) => sum + item.WineLiquorTotal, 0);
        });

        const totalInitialPrice = computed(() => {
            return (cartItems.value?.Items || []).reduce((sum, item) => sum + (item.InitialValue * item.WineLiquorTotal), 0);
        });

        const totalTaxAmount = computed(() => {
            return (cartItems.value?.Items || []).reduce((sum, item) => sum + parseFloat(String(item.TotalTax).replace(/,/g, '')), 0);
        });

        const increaseQuantity = (wineId) => {
            const wine = cartItems.value.find(w => w.Id === wineId);
            console.log("Increase wine:", wine)
            if (wine) {
                wine.quantity++;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
                // saveCartItemsToLocalStorage();
            }
        }

        const decreaseQuantity = (wineId) => {
            const wine = cartItems.value.find(w => w.Id === wineId);
            console.log("Decrease wine:", wine)
            if (wine) {
                wine.quantity--;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
                // saveCartItemsToLocalStorage();
            }
        }

        const onDeleteCartItemClick = (wineId) => {
            cartItems.value = cartItems.value.filter(wine => wine.Id !== wineId);
            // saveCartItemsToLocalStorage();
        }

        const onConfirmClick = () => {
            spinner.value = true;
            // const pdf = new jsPDF();
            // pdf.text('Hello world!', 10, 10);
            // const pdfUrl = pdf.output('bloburl');
            // console.log('PDF url :', pdfUrl)
            localStorage.setItem('cartItemsToScan', JSON.stringify(cartItems.value))
            router.push('/pdf-view')
            spinner.value = false
        }

        const fetchCartItem = async () => {
            spinner.value = true
            const getCartData = await getCartItem (cartId.value, token.value)
            cartItems.value = getCartData.data
            console.log('Cart data :', cartItems.value)
            console.log("Import purpose :", cartItems.value.ImportPurpose.CheckpointLabel)
            importCheckpoint.value = cartItems.value.ImportPurpose.CheckpointLabel
            importPurpose.value = cartItems.value.ImportPurpose.PurposeLabel
            importDate.value = new Date(cartItems.value.ImportPurpose.PurposeDate).toISOString().slice(0, 10)
            spinner.value = false
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

        // const formatDate = (data) => {
        //     const date = new Date(data);
        //     const day = String(date.getDate()).padStart(2, '0');
        //     const month = String(date.getMonth() + 1).padStart(2, '0');
        //     const year = date.getFullYear();
        //     return `${day}/${month}/${year}`;
        // }

        onMounted (() => {
            cartId.value = localStorage.getItem('cartId')
            token.value = localStorage.getItem('token')
            fetchCartItem()
        })

        return {
            cartItems,
            totalLiters,
            totalQuantity,
            totalInitialPrice,
            totalTaxAmount,
            importCheckpoint,
            importPurpose,
            importDate,
            spinner,
            formatNumber,
            increaseQuantity,
            decreaseQuantity,
            onDeleteCartItemClick,
            onConfirmClick
        }
    }
}
</script>

<style scoped>
.summary-button {
    padding-top: 20px;
    display: flex;
    justify-content: center;
}

.summary-label {
    font-size: 20px;
}

.summary-value {
    font-size: 20px;
    font-weight: 700;
    color: #2B476D;
}

.delete-product {
    font-size: 14px;
    color: #FF5757;
    text-decoration: underline;
    border: none;
    background-color: transparent !important;
}

.price-text {
    color: #2B476D;
    font-size: 24px;
    font-weight: 700;
}

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

.wine-name {
    color: #000000;
    font-size: 22px;
}
</style>