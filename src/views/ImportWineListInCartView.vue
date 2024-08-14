<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการไวน์ในตระกร้า</h1>
        </div>
        <div class="import-card">
            <div class="text-start" style="width: 400px;">
                    <label class="form-label">วัตถุประสงค์ในการนำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="importPurpose">
                        <option v-for="option in importPurposeList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <label class="form-label">ด่านนำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="importCheckpoint">
                        <option v-for="option in checkpointList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <label class="form-label">วันที่ประมาณนำเข้า</label>
                    <input type="date" class="form-input" :min="minDate" v-model="importDate">
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
                        <div class="d-flex justify-content-between" style="padding-top: 10px;">
                            <div class="category">
                                <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{wine.WineLiquor.CategoryLabel}}</p>
                            </div>
                            <div class="year">
                                <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span class="manu-year">{{ wine.WineLiquorPic.WineLiquorYear }}</span></p>
                            </div>
                        </div>
                        <div class="row text-start">
                            <p class="wine-name-display">{{ wine.WineLiquor.DisplayName }}</p>
                        </div>
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
                                <p>{{ wine.BottleSize }}</p>
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
                                <label class="form-label">เงินบำรุง 4 กองทุน</label>
                                <p>{{ formatNumber(wine.Fund) }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">อากรศุลกากร</label>
                                <p>{{ formatNumber(wine.CustomsDuty) }} บาท</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 price-col text-end">
                        <label class="form-label bold">มูลค่าเบื้องต้น</label>
                        <p class="price-text">{{ formatNumber(wine.InitialValue) }} บาท</p>
                        <label class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</label>
                        <p class="price-text">{{ formatNumber(wine.TotalTax) }} บาท</p>
                        <div class="d-flex justify-content-between">
                            <label class="form-label">จำนวนขวด</label>
                            <div class="quantity-count">
                                <button class="btn-count" @click="decreaseQuantity(wine.Id)" disabled >-</button>
                                <input type="text" class="quantity-input text-center" v-model="wine.WineLiquorTotal" disabled>
                                <button class="btn-count" @click="increaseQuantity(wine.Id) " disabled>+</button>
                            </div>
                        </div>
                        <!-- <div>
                            <button class="delete-product" @click="onDeleteCartItemClick(wine.Id)">ลบรายการสินค้า</button>
                        </div> -->
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
                <div v-if="userTypeId === '21'" style="padding: 10px 70px;">
                    <!-- <p class="tax-paid text-center">ชำระภาษีแล้ว</p> -->
                    <div class="d-flex justify-content-center">
                        <button class="btn-checking" @click="onCheckWineListClick">ตรวจสอบด้วยตนเอง</button>
                        <button class="btn-scan" @click="onCheckWineByUploadClick">สแกนฉลาก</button>
                    </div>
                    <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button>
                    <button class="btn-downloadQr" @click="onDownloadQRCodeClick">ดาวน์โหลดคิวอาร์โค้ดและแบบฟอร์ม</button>
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
import { getCartItem } from '@/api/getWineSearch'
import { useRouter } from 'vue-router'
import { getEnumGroup } from '@/api/getMaster'
// import { getQRCode } from '@/api/getQRData'
import QRCode from 'qrcode';

export default {
    props: ['cardId'],
    setup (props) {
        const router = useRouter()

        const token = ref('')
        const importCartId = ref(props.cartId || '')
        const userTypeId = ref('')
        const cartItems = ref([])
        const importCheckpoint = ref('')
        const importPurpose = ref('')
        const importDate = ref('')
        const importPurposeList = ref([])
        const checkpointList = ref([])

        const spinner = ref(false)

        const totalLiters = computed(() => {
            return (cartItems.value?.Items || []).reduce((sum, item) => {
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
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

        const onCheckWineListClick = () => {
            router.push('/import-wine-list/edit-wine-list')
        }

        const onCheckWineByUploadClick = () => {
            router.push('/import-wine-list/check-wine-by-upload')
        }

        const onBackToHomeClick = () => {
            router.push('/')
        }

        const onPreviousClick = () => {
            router.push('/import-wine-list')
        }

        const onDownloadQRCodeClick = async() => {
            console.log("Downloading QR Code!!!!!!!!");
            
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
            spinner.value = true
            const getCartData = await getCartItem (importCartId.value, token.value)
            cartItems.value = getCartData.data
            console.log('Cart data :', cartItems.value)
            console.log("Import purpose :", cartItems.value.ImportPurpose.CheckpointLabel)
            importCheckpoint.value = cartItems.value.ImportPurpose.Checkpoint
            importPurpose.value = cartItems.value.ImportPurpose.PurposeId
            importDate.value = new Date(cartItems.value.ImportPurpose.PurposeDate).toISOString().slice(0, 10)
            spinner.value = false
        }

        const fetchImportPurpose = async () => {
            const enumGroup = 'FtImportPurpose' 
            const importPurposeData = await getEnumGroup (enumGroup)
            importPurposeList.value = importPurposeData.data
        }

        const fetchCheckpoint = async () => {
            const enumGroup = 'FtCheckPoint'
            const checkpointData = await getEnumGroup (enumGroup)
            checkpointList.value = checkpointData.data
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
        //     return `${month}/${day}/${year}`;
        // }

        const formatNumber = (value) =>{
            const floatValue = parseFloat(value);
                return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        const minDate = computed ( () => {
            const today = new Date().toISOString().split('T')[0];
            return today;
        })

        onMounted (() => {
            token.value = localStorage.getItem('token')
            importCartId.value = localStorage.getItem('importCartId')
            userTypeId.value = localStorage.getItem('userTypeId')
            fetchCartItem()
            fetchImportPurpose()
            fetchCheckpoint()
        })

        return {
            cartItems,
            userTypeId,
            importCheckpoint,
            importPurpose,
            importDate,
            totalLiters,
            totalQuantity,
            totalInitialPrice,
            totalTaxAmount,
            spinner,
            importPurposeList,
            checkpointList,
            increaseQuantity,
            decreaseQuantity,
            onDeleteCartItemClick,
            onCheckWineListClick,
            onCheckWineByUploadClick,
            onBackToHomeClick,
            onDownloadQRCodeClick,
            onPreviousClick,
            formatNumber,
            minDate
        }
    }
}
</script>

<style scoped>
.product-card {
    margin-top: 20px;
    padding: 0px 20px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.summary-button {
    padding: 20px 30px 0px 30px;
    /* display: flex;
    justify-content: center; */
}

.btn-home {
    width: 392px;
    height: 44px;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
}

.btn-previous {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    height: 44px;
    background-color: #77818A;
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

.btn-checking {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    width: 50%;
    height: 44px;
    background-color: #162848;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-right: 3px;
}

.btn-scan {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    width: 50%;
    height: 44px;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-left: 3px;
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
    padding: 30px 20%;
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

.tax-paid {
    color: #2B476D;
    font-size: 18px;
    font-weight: 700;
}

.import-card {
    margin-top: 20px;
    padding: 30px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}
</style>