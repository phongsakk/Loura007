<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการไวน์ในตระกร้า</h1>
        </div>
        <div v-if="cartItems?.length > 0" style="margin-top: 10px;">
            <div v-for="wine in cartItems" :key="wine.Id" class="product-card">
                <div class="row">
                    <div class="col-lg-2 d-flex justify-content-center align-items-center">
                        <div class="wine-image-card">
                            <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.Path}`" alt="" class="card-image">
                        </div>
                    </div>
                    <div class="col-lg-7 horizontal-divider">
                        <div class="d-flex justify-content-between" style="padding-top: 10px;">
                            <div class="category">
                                <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{wine.CategoryName}}</p>
                            </div>
                            <div class="year">
                                <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span style="color: #000000;">{{ wine.Year }}</span></p>
                            </div>
                        </div>
                        <div class="wine-name text-start">{{ wine.WineName }}</div>
                        <div class="row text-start">
                            <div class="col-3">
                                <label class="form-label">ประเทศที่ผลิต</label>
                                <p>{{ wine.Country }}</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                <p>alc. {{ wine.AVB }} % vol.</p>
                            </div>
                            <div class="col-6">
                                <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                <p>{{ wine.BottleSize }}</p>
                            </div>
                        </div>
                        <div class="row text-start">
                            <div class="col-3">
                                <label class="form-label">ภาษีสรรพสามิต</label>
                                <p>{{ wine.exciseTaxByTotal }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ภาษีท้องถิ่น</label>
                                <p>{{ wine.externalLocal }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">เงินบำรุง 4 กองทุน</label>
                                <p>{{ wine.externalFund }} บาท</p>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ภาษีศุลกากร</label>
                                <p>{{ wine.exciseTaxByDuty }} บาท</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 price-col text-end">
                        <label class="form-label" style="font-weight: 700;">มูลค่าเบื้องต้น</label>
                        <p class="price-text">{{ formatNumber(wine.RecommendMinPrice) }} บาท</p>
                        <label class="form-label" style="font-weight: 700;">รวมภาษีและเงินกองทุนทั้งหมด</label>
                        <p class="price-text">{{ wine.externalTotal }} บาท</p>
                        <div class="d-flex justify-content-between">
                            <label class="form-label">จำนวนขวด</label>
                            <div class="quantity-count">
                                <button class="btn-count" @click="decreaseQuantity(wine.Id)" :disabled="wine.quantity <= 1">-</button>
                                <input type="text" class="quantity-input text-center" v-model="wine.quantity" disabled>
                                <button class="btn-count" @click="increaseQuantity(wine.Id)" :disabled="totalLiters + (wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) : extractBottleSizeL(wine.BottleSize)) > 10.00">+</button>
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
                <div class="summary-button">
                    <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
                    <button class="btn-confirm" @click="onConfirmClick">ยืนยัน</button>
                </div>
            </div>
        </div>
    </div>
    <div class="register-modal" v-if="registerModal === true">
        <div class="modal">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="sub-header">ลงทะเบียนเพื่อเข้าใช้งาน</div>
                    <label class="form-label text-start">สัญชาติผู้นำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="status">
                        <option value="" disabled selected></option>
                        <option v-for="option in statusList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <div v-if="status !== 4" class="text-start">
                        <label class="form-label text-start">เลขบัตรประจำตัวประชาชน/เลขนิติบุคคล</label>
                        <input type="text" class="form-input" onkeydown="return event.keyCode !== 69" maxlength="13" v-model="idNumber" @input="onIdNumberInput($event)" :disabled="!status">
                        <p v-if="validationMessage" class="error-text">{{ validationMessage }}</p>
                        <p class="error-text" v-if="idErrorMessage">{{ idErrorMessage }}</p>
                        <label class="form-label text-start">ประเภทผู้นำเข้า</label>
                        <input type="text" class="form-input input-grey" v-model="idLabel" disabled>
                        
                    </div>
                    <div v-if="status === 4" class="text-start">
                        <label class="form-label text-start">เลขที่พาสปอร์ต</label>
                        <input type="text" class="form-input" v-model="passportNumber">
                    </div>
                    <!-- <div v-else class="text-start">onkeydown="return event.keyCode !== 69"
                        <label class="form-label text-start">Input yout id number</label>
                        <input type="text" class="form-input" v-model="idNumber" disabled>
                    </div> -->
                    <div class="modal-button">
                        <button class="btn-back" @click="onModalCancelClick">ย้อนกลับ</button>
                        <button class="btn-confirm" @click="onRegisterClick">ยืนยัน</button>
                    </div>
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
import { useRouter } from 'vue-router'
import { addToCart } from '@/api/getWineSearch'
import { getDbdData } from '@/api/getUserInfoById'
import { getEnumGroup } from '@/api/getMaster'
import { BroadcastChannel } from 'broadcast-channel';


export default {
    setup() {
        const router = useRouter()
        
        const cartItems = ref([])
        const registerModal = ref(false)
        const idNumber = ref('')
        const idLabel = ref('')
        const passportNumber = ref('')
        const token = ref('')
         
        const taxByPrice = ref(5)
        const taxByValue = ref(1000)
        // const taxByDuty = ref(0)
        const taxByFund = ref(1.175)
        const exciseTaxByDuty = ref(0)
        const exciseTaxByValue = ref(0)
        const calTaxByDuty = ref(0)
        const calTaxByValue = ref(0)
        const calTaxByFund = ref(0)
        const exciseTaxByPrice = ref(0)
        const exciseTaxByTotal = ref(0)
        const externalLocal = ref(0)
        const externalFund = ref(0)
        const externalTotal = ref(0)
        const fAndI = ref(0)
        const validationMessage = ref('')
        const idErrorMessage = ref('')

        const statusList = ref([])
        const status = ref('')
        const spinner = ref(false)

        const isLoggedIn = ref(false)

        const cartChannel = new BroadcastChannel('cart_channel');

        const isTotalLitersExceeded = computed(() => totalLiters.value > 10);

        const onConfirmClick = async() => {
            const newParseFloat = (val) => parseFloat(`${val}`.replace(/,/g, ""));
            spinner.value = true
            const wineData = {
                IsStatus : 0,
                CreatedBy: 0,
                UpdatedBy: 0,
                datas : cartItems.value?.map (wine => ({
                    WineLiquorId: wine.WineLiquorId,
                    Year: wine.Year,
                    BottleSize: wine.BottleSize,
                    WineLiquorTotal: wine.quantity,
                    ExciseTax: newParseFloat(wine.exciseTaxByTotal),
                    LocalTax: newParseFloat(wine.externalLocal),
                    Fund: newParseFloat(wine.externalFund),
                    CustomsDuty: newParseFloat(wine.exciseTaxByDuty),
                    InitialValue: newParseFloat(wine.RecommendMinPrice),
                    TotalTax: newParseFloat(wine.externalTotal),
                    NewPrice: wine.NewPrice,
                    InvoiceFileType: wine.fileType,
                    InvoicePictureUrl: wine.uploadFile
                }))
            }
            console.log("WineData :", wineData)
            const addWineDataToCart = await addToCart(wineData, token.value)
            console.log("Added to cart :", addWineDataToCart.data)
            // uploadWineFile(cartItems.value.Id);
            localStorage.setItem('cartId', addWineDataToCart.data.insertedId)
            console.log("isLoggedIn :", isLoggedIn.value)
            if (isLoggedIn.value && isLoggedIn.value === 'true') {
                router.push('/import-liquor')
                localStorage.removeItem('cartItems')
            } else {
                window.scrollTo(0,0)
                registerModal.value = true
            }
            spinner.value = false
        }

        const onBackClick = () => {
            router.push('/')
        }

        const onRegisterClick = async() => {
            if (!idNumber.value && !passportNumber.value) {
                idErrorMessage.value = 'กรุณากรอกข้อมูล'
            }
            else {
                if (idNumber.value) {
                    if (idNumber.value.startsWith('0')){
                        const getDbd = await getDbdData(idNumber.value)
                        console.log("DBD data :", getDbd.data)
                        localStorage.setItem('dbdId',idNumber.value)
                        localStorage.removeItem('individualId')
                        localStorage.removeItem('passportId')
                    }
                    else {
                        localStorage.setItem('individualId',idNumber.value)
                        localStorage.removeItem('dbdId')
                        localStorage.removeItem('passportId')
                    }
                }
                if (passportNumber.value) {
                    localStorage.setItem('passportId', passportNumber.value)
                    localStorage.removeItem('dbdId')
                    localStorage.removeItem('individualId')
                }
                localStorage.setItem('status',status.value)
                // localStorage.setItem('isLoggedIn','true')
                router.push('/register')
            }
        }

        const onModalCancelClick = () => {
            registerModal.value = false
        }

        const increaseQuantity = (wineId) => {
            const wine = cartItems.value.find(w => w.Id === wineId);
            console.log("Increase wine:", wine)
            if (wine) {
                wine.quantity++;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
                console.log("Extract Bottle Size :", extractBottleSizeMl(wine.BottleSize))
                saveCartItemsToLocalStorage();
            }
        }

        const decreaseQuantity = (wineId) => {
            // const wine = cartItems.value.find(w => w.Id === wineId);
            const wineIndex = cartItems.value.findIndex(w => w.Id === wineId);
            const wine = cartItems.value[wineIndex];
            console.log("Decrease wine:", wine)
            if (wine) {
                wine.quantity--;
                if (wine.quantity <= 0) {
                    cartItems.value.splice(wineIndex, 1);
                }
                else {
                    wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
                }
                saveCartItemsToLocalStorage();
            }
        }

        const saveCartItemsToLocalStorage = () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
            cartChannel.postMessage ("It's new item adding to cart")
        }

        const onDeleteCartItemClick = (wineId) => {
            cartItems.value = cartItems.value.filter(wine => wine.Id !== wineId);
            saveCartItemsToLocalStorage();
        }

        const extractBottleSizeMl = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const extractBottleSizeL = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const formatNumber = (value) =>{
            const floatValue = parseFloat(value);
            return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        const calculateValues = (item) => {
            const bottleSizeToCalculate = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
            const itemExciseTaxByDuty = item.RecommendMinPrice * 0 * 0.01;
            const itemExciseTaxByValue = (item.AVB / 100) * bottleSizeToCalculate * taxByValue.value;
            const itemCalTaxByDuty = (item.RecommendMinPrice + itemExciseTaxByDuty) * (taxByPrice.value / 100);
            const itemCalTaxByValue = itemExciseTaxByValue * taxByFund.value * (taxByPrice.value / 100);
            const itemCalTaxByFund = 1 - taxByFund.value * (taxByPrice.value / 100);
            console.log({itemExciseTaxByValue, itemCalTaxByDuty,itemCalTaxByValue,itemCalTaxByFund})
            const itemExciseTaxByPrice = (itemCalTaxByDuty + itemCalTaxByValue) / itemCalTaxByFund;
            const itemExciseTaxByTotal = (itemExciseTaxByValue + itemCalTaxByDuty);
            const itemExternalLocal = 0.1 * itemExciseTaxByTotal;
            const itemExternalFund = 0.075 * itemExciseTaxByTotal;
            const itemExternalTotal = itemExciseTaxByTotal + itemExternalLocal + itemExternalFund;
            const itemFAndI = 0.11 * item.RecommendMinPrice;

            return {
                itemExciseTaxByDuty,
                itemExciseTaxByValue,
                itemCalTaxByDuty,
                itemCalTaxByValue,
                itemCalTaxByFund,
                itemExciseTaxByPrice,
                itemExciseTaxByTotal,
                itemExternalLocal,
                itemExternalFund,
                itemExternalTotal,
                itemFAndI
            }
        }

        const totalLiters = computed(() => {
            return cartItems.value.reduce((sum, item) => {
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
                return sum + (bottleSize * item.quantity);
            }, 0);
        });

        const totalQuantity = computed(() => {
            return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
        });

        const totalInitialPrice = computed(() => {
            return cartItems.value.reduce((sum, item) => sum + (item.RecommendMinPrice * item.quantity), 0);
        });

        const totalTaxAmount = computed(() => {
            return cartItems.value.reduce((sum, item) => sum + parseFloat(item.externalTotal.replace(/,/g, '') * item.quantity), 0);
        });

        const onIdNumberInput = (event) => {
            const number = event.target.value;
            idNumber.value = number.replace(/\D/g, '');
            idLabel.value = idNumber.value.startsWith('0') ? 'นิติบุคคล' : 'บุคคลธรรมดา';
            validationMessage.value = validateId(idNumber.value);
            idErrorMessage.value = ''
        }

        const validateEmpty = (value, text) => {
            return value ? null : text;
        };

        const validateType = (value, text) => {
            return !isNaN(value) ? null : text;
        };

        const validateId = (value) => {
            let result = null;

            if (value) {
                value = value.trim();

                result = validateEmpty(value, '* กรุณากรอกข้อมูล');
                result = result || validateType(value, '* กรอกข้อมูลไม่ถูกต้อง');

                if (value?.length !== 13) {
                result = '* กรุณากรอกข้อมูลให้ครบ 13 หลัก';
                } else {
                let resultCheck = false;
                let idCard = parseFloat(value.trim()) || 0;
                if (idCard !== 0) {
                    let base = 1000000000000;
                    let basenow = -1;
                    let sum = 0;
                    for (let i = 13; i > 1; i--) {
                    basenow = Math.floor(idCard / base);
                    idCard = idCard - basenow * base;
                    sum += basenow * i;
                    base = base / 10;
                    }
                    let checkbit = (11 - (sum % 11)) % 10;

                    if (checkbit > 9) {
                    checkbit = parseInt(String(checkbit).slice(-1), 10);
                    }

                    let lastNum = parseInt(value.slice(-1), 10);
                    resultCheck = lastNum === checkbit; 
                }

                if (!resultCheck) {
                    result = 'กรอกข้อมูลไม่ถูกต้อง';
                }
                }
            }
            return result;
        };

        const fetchStatus = async () => {
            const enumGroup = 'IsStatus'
            const getStatus = await getEnumGroup (enumGroup)
            statusList.value = getStatus.data
        }

        onMounted (() => {
            isLoggedIn.value = localStorage.getItem('isLoggedIn')
            cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
            token.value = localStorage.getItem('token')
            console.log("Cart items from localstorage :", cartItems.value)

            fetchStatus();

            cartItems.value = cartItems.value?.map(item => {
                const calculatedValues = calculateValues(item);

                return {
                ...item,
                exciseTaxByDuty: formatNumber(calculatedValues.itemExciseTaxByDuty),
                exciseTaxByValue: formatNumber(calculatedValues.itemExciseTaxByValue),
                calTaxByDuty: formatNumber(calculatedValues.itemCalTaxByDuty),
                calTaxByValue: formatNumber(calculatedValues.itemCalTaxByValue),
                calTaxByFund: formatNumber(calculatedValues.itemCalTaxByFund),
                exciseTaxByPrice: formatNumber(calculatedValues.itemExciseTaxByPrice),
                exciseTaxByTotal: formatNumber(calculatedValues.itemExciseTaxByTotal),
                // exciseTaxByFund: formatNumber(calculatedValues.exciseTaxByFund),
                externalLocal: formatNumber(calculatedValues.itemExternalLocal),
                externalFund: formatNumber(calculatedValues.itemExternalFund),
                externalTotal: formatNumber(calculatedValues.itemExternalTotal),
                fAndI: formatNumber(calculatedValues.itemFAndI)
                };
            });

            console.log("Updated cart items with calculated values:", cartItems.value);
        })

        return {
            cartItems,
            idNumber,
            idLabel,
            passportNumber,
            taxByPrice,
            taxByValue,
            taxByFund,
            exciseTaxByDuty,
            exciseTaxByPrice,
            exciseTaxByTotal,
            exciseTaxByValue,
            calTaxByDuty,
            calTaxByValue,
            calTaxByFund,
            externalLocal,
            externalTotal,
            externalFund,
            fAndI,
            totalLiters,
            totalQuantity,
            totalInitialPrice,
            totalTaxAmount,
            statusList,
            status,
            spinner,
            onConfirmClick,
            onBackClick,
            onRegisterClick,
            onModalCancelClick,
            increaseQuantity,
            decreaseQuantity,
            onDeleteCartItemClick,
            formatNumber,
            onIdNumberInput,
            extractBottleSizeMl,
            extractBottleSizeL,
            registerModal,
            isTotalLitersExceeded,
            validationMessage,
            idErrorMessage
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

.modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: auto;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 99;
}

.modal-content {
    padding: 70px;
    margin-top: 20%;
    border: none !important;
    width: 550px;
    text-align: center;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.modal-button {
    margin-top: 30px
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

.wine-name {
    color: #000000;
    font-size: 22px;
}

</style>