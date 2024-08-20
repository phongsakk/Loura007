<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการไวน์ในตระกร้า</h1>
        </div>

        <div class="import-card">
            <div class="text-start" style="width: 400px;">
                <label class="form-label">วัตถุประสงค์ในการนำเข้า</label>
                <select id="idSelect" name="id" class="select" v-model="importPurpose">
                    <option v-for="option in importPurposeList" :key="option.Id" :value="option.Id" class="option">
                        {{ option.EnumName }}
                    </option>
                </select>
                <label class="form-label">ด่านนำเข้า</label>
                <select id="idSelect" name="id" class="select" v-model="checkpoint">
                    <option v-for="option in checkpointList" :key="option.Id" :value="option.Id" class="option">
                        {{ option.EnumName }}
                    </option>
                </select>
                <label class="form-label">วันที่ประมาณนำเข้า</label>
                <input type="date" class="form-input" v-model="importDate">
            </div>
        </div>

        <div v-for="wine in itemsArray" :key="wine.Id">
            <div v-if="wine.isEditing">
                    <div class="product-card">
                        <div class="row text-start" style="padding: 10px 20px 20px 20px;">
                            <div class="col-7 position-relative">
                                <label class="form-label">ค้นหาด้วยชื่อ</label>
                                <input type="text" class="search-input" placeholder="ชื่อสุรา" v-model="wineName"
                                    @input="onWineNameSearch">
                                <ul class="autocomplete-results" v-if="algoliaResults.length">
                                    <li v-for="(result, index) in algoliaResults" :key="index"
                                        @click="selectWine(result.name)">
                                        <img :src="result.image_bottle" alt="Bottle Image" class="bottle-image" />{{
                    result.name }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-1">
                                <label class="form-label">ปีที่ผลิต</label>
                                <select id="idSelect" name="years" class="search-input" v-model="vintage">
                                    <option value="" disabled selected>ไม่เลือกปีที่ผลิต</option>
                                    <option v-for="option in years" :key="option" :value="option" class="option">
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-3">
                                <label class="form-label">ขนาดบรรจุภัณฑ์</label>
                                <select id="idSelect" name="id" class="search-input" v-model="bottleSize">
                                    <option v-for="option in bottleSizes" :key="option.Id" :value="option.EnumName"
                                        class="option">
                                        {{ option.EnumName }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-1">
                                <div class="search-button" style="margin-top: 10px;">
                                    <button class="btn-search" @click="onSearchClick">ค้นหา</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search-result-session" v-if="wineSearch.length > 0">
                        <div v-for="wine in wineSearch" :key="wine.id" class="wine-detail-card">
                            <div class="row">
                                <div class="col-lg-2 d-flex justify-content-center align-items-center">
                                    <div class="search-image-card">
                                        <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.Path}`"
                                            alt="" class="search-image">
                                    </div>
                                </div>
                                <div class="col-lg-4 horizontal-divider">
                                    <div class="d-flex justify-content-between">
                                        <div class="category">
                                            <p class="category-name" style="margin-bottom: 0px;"><span
                                                    class="category-icon"><img src="../assets/img/wine-img1.png"
                                                        class="category-image"></span>{{ wine.CategoryName }}</p>
                                        </div>
                                        <div class="year">
                                            <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span
                                                    class="wine-detail-text">{{ wine.Year }}</span></p>
                                        </div>
                                    </div>
                                    <div class="wine-name text-start">{{ wine.WineName }}</div>
                                    <div class="row text-start">
                                        <div class="col-4">
                                            <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                            <p class="wine-detail-text">{{ wine.AVB }} %</p>
                                        </div>
                                        <div class="col-8">
                                            <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                            <p class="wine-detail-text">{{ wine.BottleSize }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 horizontal-divider text-start">
                                    <p>ประเทศที่ผลิต</p>
                                    <p class="wine-detail-text">{{ wine.Country }}</p>
                                    <p>มาตรฐาน</p>
                                    <p class="wine-detail-text">{{ wine.ClassDescription }}</p>
                                </div>
                                <div class="col-lg-3">
                                    <div class="price-col">
                                        <div class="d-flex justify-content-between">
                                            <label class="form-label">มูลค่าเบื้องต้น</label>
                                            <div v-if="wine.RecommendMinPrice === 0">
                                                <p v-if="isEdit === false" class="red-text text-end" style="font-size: 18px; font-weight: 700; margin: 10px 0px 0px 0px;">
                                                    ไม่พบราคาในระบบ
                                                    <img src="../assets/img/price-edit-icon.png" alt="" class="price-edit-icon" style="cursor: pointer;" @click="onEditPriceClick(wine.Id)">
                                                </p>
                                                <div v-else >
                                                    <input type="text" class="price-input text-end" v-model="wine.newPrice">
                                                </div>
                                            </div>
                                            <p v-else class="wine-price">{{ formatNumber(wine.RecommendMinPrice) }} บาท</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <label class="form-label">ปริมาตรสุราทั้งหมด(ลิตร)</label>
                                            <p class="wine-price">{{ wine.wineLiter }}ลิตร</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <label class="form-label">จำนวนขวด</label>
                                            <div class="quantity-count">
                                                <button class="btn-count" @click="decreaseQuantity(wine.Id)">-</button>
                                                <input type="text" class="quantity-input text-center"
                                                    v-model="wine.quantity" disabled>
                                                <button class="btn-count" @click="increaseQuantity(wine.Id)">+</button>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-end" style="margin-top: 10px;">
                                            <!-- <button class="btn-detail">รายละเอียดเพิ่มเติม</button> -->
                                            <button class="btn-add-to-cart"
                                                @click="onAddToCartClick(wine.Id)">เพิ่มเข้าตะกร้า</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isEdit === true" class="upload-session">
                                <div class="upload-card">
                                    <input type="file" class="image-input" id="file-input" accept="application/pdf,image/*" @change="uploadWineFile($event, wine.Id)">
                                    <label for="file-input" class="upload-label" style="cursor: pointer;">
                                        <div v-if="wine.fileName">
                                            <img v-if="wine.fileType === 'application/pdf'" src="../assets/img/pdf-icon.png" alt="" class="after-upload-image">
                                            <img v-else src="../assets/img/after-upload-icon.png" alt="" class="after-upload-image">
                                            <p v-if="wine.fileType === 'application/pdf'" class="upload-header">อัพโหลดไฟล์แล้ว</p>
                                            <p v-else class="upload-header">อัพโหลดรูปภาพแล้ว</p>
                                        </div>
                                        <div v-else>
                                            <img src="../assets/img/upload-icon.png" alt="" class="upload-icon">
                                            <h3 class="upload-header" style="margin-bottom: 5px;">อัพโหลดภาพ</h3>
                                            <h3 class="upload-header" style="margin-bottom: 5px;">หลักฐานการชำระเงิน</h3>
                                            <p class="upload-text">วางไฟล์รูปตรงนี้ หรือ เลือกไฟล์รูป</p>
                                        </div>
                                    </label>
                                </div>
                                <div class="price-edit-buttons">
                                    <button class="btn-cancel" @click="onPriceCancelClick">ย้อนกลับ</button>
                                    <button class="btn-save" @click="onPriceConfirmClick(wine.Id)">ยืนยัน</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- </div> -->
            </div>

            <div v-else class="product-card">
                <div v-if="wine.isCorrect !== false">
                    <div class="row ">
                        <div class="col-lg-2 d-flex align-items-center justify-content-center">
                            <div class="wine-image-card">
                                <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.WineLiquorPic?.Path}`"
                                    alt="" class="card-image">
                            </div>
                        </div>
                        <div class="col-lg-7 horizontal-divider">
                            <div class="d-flex justify-content-between" style="padding-top: 10px;">
                                <div class="category">
                                    <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img
                                                src="../assets/img/wine-img1.png" class="category-image"></span>{{
                        wine.WineLiquor.CategoryLabel }}</p>
                                </div>
                                <div class="year">
                                    <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span class="manu-year">{{
                        wine.WineLiquorPic.WineLiquorYear }}</span></p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <!-- <div v-if="wine.isCorrect === false" class="wine-name-incorrect" @click="onWineNameChangeClick(wine.Id)">{{ wine.WineLiquor.DisplayName }}</div> -->
                                <p class="wine-name-display">{{ wine.WineLiquor.DisplayName }}</p>
                            </div>
                            <div class="row text-start">
                                <div class="col-3">
                                    <label class="form-label">ประเทศที่ผลิต</label>
                                    <p style="margin-bottom: 0px;">{{ wine.WineLiquor.Country }}</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                    <p style="margin-bottom: 0px;">alc. {{ wine.WineLiquorPic.Alcohol }} % vol.</p>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                    <p style="margin-bottom: 0px;">{{ wine.BottleSize }}</p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <div class="col-3">
                                    <label class="form-label">ภาษีสรรพสามิต</label>
                                    <p style="margin-bottom: 0px;">{{ formatNumber(wine.ExciseTax) }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ภาษีท้องถิ่น</label>
                                    <p style="margin-bottom: 0px;">{{ formatNumber(wine.LocalTax) }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">เงินบำรุงกองทุน</label>
                                    <p style="margin-bottom: 0px;">{{ formatNumber(wine.Fund) }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ภาษีศุลกากร</label>
                                    <p style="margin-bottom: 0px;">{{ formatNumber(wine.CustomsDuty) }} บาท</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 price-col text-end">
                            <label class="form-label bold">มูลค่าเบื้องต้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ wine.InitialValue ? formatNumber(wine.InitialValue) : formatNumber(wine.newPrice) }} บาท</p>
                            <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                            <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ wine.TotalTax ? wine.TotalTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0' }} บาท</p>
                            <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ wine.WineLiquorTotal }} ขวด</p>
                            <div v-if="wine.isCorrect === true">
                                <button class="btn-checked-correct">ตรวจสอบสุราเรียบร้อยแล้ว</button>
                                <div v-if="wine.uploadFile">
                                    <button class="btn-display-file" @click="onFileDisplayClick(wine.Id, wine.newPrice)">
                                        <img src="../assets/img/eye-icon.webp" alt="" style="height: 14px; width: auto; margin-right: 5px;">
                                        <span v-if="wine.displayFile === false">ดูหลักฐานการชำระเงิน</span>
                                        <span v-if="wine.displayFile === true">ซ่อนหลักฐานการชำระเงิน</span>
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                <div class="check-buttons">
                                    <button class="btn-incorrect" @click="onIncorrectClick(wine.Id)"
                                        :disabled="disabledIncorrect">สินค้าไม่ถูกต้อง</button>
                                    <button class="btn-correct" @click="onCorrectClick(wine.Id)">สินค้าถูกต้อง</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="wine.displayFile" class="file-display">
                        <div v-if="wine.fileType === 'application/pdf'" class="file-display-frame text-center d-flex justify-content-center" align="center">
                            <iframe :src="wine.uploadFile" frameborder="0" class=" w-100" style="height: 650px;"></iframe>
                        </div>
                        <div v-else class="uploaded-image-display">
                            <img :src="wine.uploadFile" alt="" class="uploaded-wine-image">
                        </div>
                    </div>
                </div>
                
            </div>
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
                <p class="text-start summary-label">เป็นมูลค่าเบื้องต้น</p>
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
            <div style="padding: 0px 70px;">
                <p v-if="isConfirmed === true" class="tax-confirm text-center">ยืนยันการรับชำระเงินภาษี</p>
                <div class="d-flex justify-content-center">
                    <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button>
                    <!-- <div> -->
                    <button class="btn-save" v-if="isConfirmed === false" @click="onConfirmSaveClick">ยืนยัน</button>
                    <button class="btn-save" v-else @click="onSaveClick">ยืนยัน</button>
                    <!-- </div> -->
                </div>
                <!-- <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button> -->
                <button class="btn-downloadQr" @click="onDownloadQRCodeClick">ดาวน์โหลดคิวอาร์โค้ดและแบบฟอร์ม</button>
            </div>
        </div>
    </div>
    <div v-if="notFoundAlert" class="d-flex justify-content-center">
        <div class="not-found-alert">
            <div class="alert alert-primary" role="alert">
                <p style="margin-bottom: 0px;">ไม่พบข้อมูลไวน์ที่ต้องการค้นหา</p>
                <!-- <button @click="onOkayClick()" type="button">Ok</button> -->
            </div>
        </div>
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { getCartItem } from '@/api/getWineSearch'
import algoliasearch from 'algoliasearch';
import { useRouter } from 'vue-router'
import { getWineSearch, getBottleSize, updateCart } from '@/api/getWineSearch.js'
import { getEnumGroup } from '@/api/getMaster'
import { uploadFileV4 } from '@/api/uploadFile'
// import { getQRCode } from '@/api/getQRData'
import QRCode from 'qrcode';
import number2Decimal from '@/js/number2Decimal';

export default {
    setup() {
        const router = useRouter()

        const importCartId = ref('')
        const token = ref('')
        const cartItems = ref([])
        const itemsArray = ref([])
        const isCorrect = ref('')
        const algoliaResults = ref([])
        const dropdownVisible = ref(false)
        const selectedWine = ref('')
        const currentWineId = ref('')
        const query = ref('');
        const searchObject = ref('')
        const wineName = ref('')
        const vintage = ref('')
        const location = ref('')
        const avb = ref('')
        const bottleSizes = ref([])
        const bottleSize = ref('')
        const bottleCode = ref('')
        const currencyCode = ref('THB')
        const uid = ref('')
        const wineSearch = ref([])
        const enumGroup = ref('BottleSize')
        const newAddedWine = ref('')
        const removeArray = ref([])
        const addArray = ref([])
        const isNewWine = ref(false)
        const importPurposeList = ref([])
        const importPurpose = ref('')
        const checkpointList = ref([])
        const checkpoint = ref('')
        const importDate = ref('')
        const years = ref([])
        const spinner = ref(false)
        const isConfirmed = ref(false)
        const notFoundAlert = ref(false)
        const disabledIncorrect = ref(false)
        const isEdit = ref(false)
        const displayFile = ref(false)

        const defaultArray = ref([])

        // const taxByPrice = ref(5)
        // const taxByValue = ref(1000)
        // const taxByDuty = ref(0)
        // const taxByFund = ref(1.175)
        // const exciseTaxByDuty = ref(0)
        // const exciseTaxByValue = ref(0)
        // const calTaxByDuty = ref(0)
        // const calTaxByValue = ref(0)
        // const calTaxByFund = ref(0)
        // const exciseTaxByPrice = ref(0)
        // const exciseTaxByTotal = ref(0)
        // const externalLocal = ref(0)
        // const externalFund = ref(0)
        // const externalTotal = ref(0)
        // const fAndI = ref(0)

        const totalLiter = ref(0)
        const totalQty = ref(0)
        const totalInitialValue = ref(0)
        const totalTaxAll = ref(0)

        const onCorrectClick = (wineId) => {
            const wineIndex = itemsArray.value.findIndex(w => w.Id === wineId);
            if (wineIndex !== -1) {
                itemsArray.value[wineIndex].isCorrect = true;
                itemsArray.value[wineIndex].isChecked = true;
                itemsArray.value = [...itemsArray.value ]; // Ensure reactivity
                // console.log("Correct wine :", itemsArray.value);
            }
        }

        const onIncorrectClick = async (wineId) => {
            const wineIndex = cartItems.value.Items.findIndex(w => w.Id === wineId);
            // console.log("In incorrect click!!!!!!!!!!!!!")
            const removeIndex = itemsArray.value.findIndex(w => w.Id === wineId);
            if (wineIndex !== -1 && removeIndex !== -1) {
                cartItems.value.Items[wineIndex].isCorrect = false;
                itemsArray.value[removeIndex].isCorrect = false;
                cartItems.value.Items[wineIndex].isChecked = true;
                itemsArray.value[removeIndex].isChecked = true;
                disabledIncorrect.value = true;
                removeArray.value.push(cartItems.value.Items[wineIndex]);
                itemsArray.value = [...itemsArray.value]; // Ensure reactivity
                itemsArray.value[removeIndex].isEditing = true;
                // console.log("Wine list to remove :", removeArray.value);
                // console.log("InCorrect wine :", cartItems.value.Items[wineIndex]);
            }
        }

        const onWineNameChangeClick = async (wineId) => {
            currentWineId.value = wineId
            const client = algoliasearch('Q3BB077ZJ4', 'e25233448e08e7b8babe79599f43c5c0')
            const index = client.initIndex('wine_index');
            const { hits } = await index.search('', { hitsPerPage: 1000 });
            algoliaResults.value = hits
            dropdownVisible.value = true
            // console.log("Algolia search result :", algoliaResults.value)
        }

        const onWineNameSearch = async () => {
            const client = algoliasearch('Q3BB077ZJ4', 'e25233448e08e7b8babe79599f43c5c0')
            const index = client.initIndex('wine_index');
            const { hits } = await index.search(wineName.value);
            algoliaResults.value = hits
            index.search(query.value).then(({ hits }) => {
                if (hits.length != 0) {
                    searchObject.value = hits[0].objectID
                }
                else {
                    searchObject.value = ''
                }
            });
            // console.log("Algolia search result :", algoliaResults.value)
        }

        const selectWine = (value) => {
            wineName.value = value
            algoliaResults.value = []
            dropdownVisible.value = false
        };

        watch(cartItems.value.Items, (newVal) => {
            console.log("Cart Items changed:", newVal);
        })

        watch(bottleSize, (selectedBottleSize) => {
            if (selectedBottleSize) {
                const selected = bottleSizes.value.find(option => option.EnumName === bottleSize.value);
                bottleCode.value = selected ? selected.EnumCode : ''
                // console.log("Bottle Code :", bottleCode.value)
            }
        })

        const onSearchClick = async () => {
            spinner.value = true
            const wineSearchData = await getWineSearch(wineName.value, vintage.value, location.value, avb.value, bottleSize.value, bottleCode.value, currencyCode.value, uid.value)
            if (wineSearchData.code === 404) {
                spinner.value = false
                await showNotFoundAlert()
            }
            else {
                if (Array.isArray(wineSearchData.data)) {
                    wineSearch.value = wineSearchData.data.map(wine => {
                    const wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)'
                        ? extractBottleSizeMl(wine.BottleSize) / 1000
                        : extractBottleSizeL(wine.BottleSize);
                    return { ...wine, quantity: 1, wineLiter };
                    });
                } else if (typeof wineSearchData.data === 'object') {
                    const wine = wineSearchData.data;
                    const wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)'
                    ? extractBottleSizeMl(wine.BottleSize) / 1000
                    : extractBottleSizeL(wine.BottleSize);
                    wineSearch.value = [{ ...wine, quantity: 1, wineLiter }];
                } else {
                    console.error('Unexpected data format:', wineSearchData.data);
                }
                // console.log("Updated wine search array:", wineSearch.value)
                spinner.value = false
            }
        }

        const decreaseQuantity = (wineId) => {
            // console.log("Wine id to decrease:", wineId)
            const wine = wineSearch.value.find(w => w.Id === wineId);
            // console.log("Decrease wine:", wine)
            if (wine && wine.quantity > 1) {
                wine.quantity--;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
            }
            // cartChannel.postMessage ("It's new item adding to cart")
        }

        const increaseQuantity = (wineId) => {
            // console.log("Wine id to increase:", wineId)
            const wine = wineSearch.value.find(w => w.Id === wineId);
            // console.log("Increase wine:", wine)
            if (wine) {
                wine.quantity++;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
            }
            // cartChannel.postMessage ("It's new item adding to cart")
        }

        const onEditPriceClick = (wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            isEdit.value = true

            return { ...wine, newPrice: 0 , uploadFile: '', fileType: ''};
        }

        const onFileUpload = (event, wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            wine.uploadFile = event.target.files[0]
            wine.fileType = event.target.files[0].type
            // console.log("Uploaded file:", wine.uploadFile)
        }


        const onPriceConfirmClick = (wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            wine.RecommendMinPrice = wine.newPrice
            // console.log("Wine after confirm price :", wine)
            isEdit.value = false
        }

        const uploadWineFile = async (event, wineId) => {
            spinner.value = true;
            const wine = wineSearch.value.find(w => w.Id === wineId);
            const file = event.target.files[0];
            if (!file) {
                alert('No file selected!');
                return;
            }

            try {
                const data = await uploadFileV4(file, token.value);
                // console.log('File uploaded successfully:', data);
                wine.uploadFile = data.data.publicURL;
                wine.fileType = data.data.contentType;
                wine.fileName = file.name; // Store the file name
            } catch (error) {
                console.error('Error uploading file:', error);
            }
            spinner.value = false;
        };

        const onAddToCartClick = async (WineLiquorId) => {
            const wine = wineSearch.value.find(w => w.Id === WineLiquorId);
            const editingItem = itemsArray.value.find(i => i.isEditing);
            editingItem.isEditing = false;
            // const modifiedArray = 
            addArray.value = wine
            console.log("Added array ", addArray.value);
            
            const item = addArray.value;
            const calculatedValues = calculateValues(item);

            Object.assign(item, {
                exciseTaxByDuty: formatNumber(calculatedValues.itemExciseTaxByDuty),
                exciseTaxByValue: formatNumber(calculatedValues.itemExciseTaxByValue),
                calTaxByDuty: formatNumber(calculatedValues.itemCalTaxByDuty),
                calTaxByValue: formatNumber(calculatedValues.itemCalTaxByValue),
                calTaxByFund: formatNumber(calculatedValues.itemCalTaxByFund),
                exciseTaxByPrice: formatNumber(calculatedValues.itemExciseTaxByPrice),
                exciseTaxByTotal: formatNumber(calculatedValues.itemExciseTaxByTotal),
                externalLocal: formatNumber(calculatedValues.itemExternalLocal),
                externalFund: formatNumber(calculatedValues.itemExternalFund),
                externalTotal: formatNumber(calculatedValues.itemExternalTotal),
                fAndI: formatNumber(calculatedValues.itemFAndI),
                // isNewWine: true
            });
            // console.log("Add array:", addArray.value)
            isNewWine.value = true

            const existingItem = itemsArray.value.find(i => 
                i.Id === item.Id &&
                i.InitialValue === item.RecommendMinPrice &&
                i.WineLiquor.Country === item.Country &&
                i.WineLiquor.DisplayName === item.WineName &&
                i.WineLiquorPic.WineLiquorYear === item.Year
            );

            if (existingItem) {
                existingItem.WineLiquorTotal += item.quantity;
                // console.log("Updated quantity for existing item:", existingItem);
            } else {
                itemsArray.value.push({ WineLiquor: { DisplayName: addArray.value.WineName, CategoryLabel: addArray.value.CategoryName, Country: addArray.value.Country }, 
                WineLiquorPic: {WineLiquorYear: addArray.value.Year, Alcohol: addArray.value.AVB, Path: addArray.value.Path}, BottleSize: addArray.value.BottleSize, InitialValue : addArray.value.RecommendMinPrice, ExciseTax: addArray.value.exciseTaxByTotal, LocalTax: addArray.value.externalLocal, Fund: addArray.value.externalFund, CustomsDuty: addArray.value.exciseTaxByDuty, TotalTax: addArray.value.externalTotal, WineLiquorTotal: addArray.value.quantity, isNewWine: true, isCorrect: true,
                uploadFile: addArray.value.uploadFile, fileType: addArray.value.fileType, displayFile: displayFile.value, Id: addArray.value.Id, newPrice: addArray.value?.newPrice, isChecked: true})
                console.log("Updated items array : ", itemsArray.value);
            }
            
            disabledIncorrect.value = false

            // console.log(item);

            calculateSummary();

            wineName.value = '';
            // vintage.value = '';
            // bottleSize.value = '';
            wineSearch.value = [];
        }

        const onFileDisplayClick = (wineId, winePrice) => {
            const wine = itemsArray.value.find(w => w.Id === wineId && w.newPrice === winePrice);
            // console.log("New Price : ", winePrice)
            if (wine.displayFile === false) {
                wine.displayFile = true
            }
            else {
                wine.displayFile = false
            }
        }

        const calculateSummary = () => {
            // console.log("Calculate summary:", itemsArray.value);
            const filteredItems = itemsArray.value.filter(item => item.isCorrect !== false);
            console.log("filteredItems", filteredItems);
            
            totalLiter.value = filteredItems.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                return acc + (q * (cur.BottleSize === 'Bottle (750ml)' || cur.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(cur.BottleSize) / 1000 : extractBottleSizeL(cur.BottleSize)));
            }, 0);

            totalQty.value = filteredItems.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                return acc + q;
            }, 0);

            totalInitialValue.value = filteredItems.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                const price = cur.InitialValue || cur.RecommendMinPrice || cur.newPrice;
                const value = parseFloat(`${price}`.replace(/,/g, ""));
                console.log("Total Init value ", q, price);
                
                return acc + (q * value);
            }, 0);
            
            totalTaxAll.value = filteredItems.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                const tax = cur.TotalTax
                const t = cur.TotalTax ? parseFloat(`${tax}`.replace(/,/g, "")) : parseFloat(cur.externalTotal.replace(/,/g, ""));
                console.log("Total Tax value :", t);
                
                return acc + (q * t);
            }, 0);
        };

        const extractBottleSizeMl = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const extractBottleSizeL = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const fetchBottleSizes = async () => {
            const fetchSizes = await getBottleSize(enumGroup.value);
            bottleSizes.value = fetchSizes.data
            bottleSize.value = fetchSizes.data[0].EnumName
        }

        const onPreviousClick = () => {
            router.push({ name: 'import-wine-list-in-cart', params: { cartId: importCartId } })
        }

        const formatNumber = (value) => {
            const floatValue = parseFloat(value);
            return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        const calculateValues = (item) => {
            const TAX_BY_VALUE = 1000;
            const TAX_BY_PRICE = 5;
            const TAX_BY_FUND = 1.175;
            const calPrice = number2Decimal(item.RecommendMinPrice > 0 ? item.RecommendMinPrice : Number(item.newPrice));
            console.log("Calculate price:", calPrice);
            
            const bottleSizeToCalculate = number2Decimal(item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize));
            const itemExciseTaxByDuty = number2Decimal(calPrice * 0 * 0.01);
            const itemExciseTaxByValue = number2Decimal((item.AVB / 100) * bottleSizeToCalculate * TAX_BY_VALUE);
            const itemCalTaxByDuty = number2Decimal((calPrice + itemExciseTaxByDuty) * (TAX_BY_PRICE / 100));
            const itemCalTaxByValue = number2Decimal(itemExciseTaxByValue * TAX_BY_FUND * (TAX_BY_PRICE / 100));
            const itemCalTaxByFund = number2Decimal(1 - TAX_BY_FUND * (TAX_BY_PRICE / 100));
            const itemExciseTaxByPrice = number2Decimal((itemCalTaxByDuty + itemCalTaxByValue) / itemCalTaxByFund);
            const itemExciseTaxByTotal = number2Decimal((itemExciseTaxByValue + itemCalTaxByDuty));
            const itemExternalLocal = number2Decimal(0.1 * itemExciseTaxByTotal);
            const itemExternalFund = number2Decimal(0.075 * itemExciseTaxByTotal);
            const itemExternalTotal = number2Decimal(itemExciseTaxByTotal + itemExternalLocal + itemExternalFund);
            const itemFAndI = number2Decimal(0.11 * calPrice);

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

        const onConfirmSaveClick = () => {
            isConfirmed.value = true
        }

        const onSaveClick = async () => {
            // console.log("Add & remove array :", addArray.value, removeArray.value)
            // console.log("ItemsArray to save :", itemsArray.value)
            const allItemsCorrect = itemsArray.value.every(item => item.isChecked === true);

            if (!allItemsCorrect) {
                // console.log("Not all items are correct. Save operation aborted.");
                return;
            }


            if (addArray.value && addArray.value.length > 0) {
                spinner.value = true
                const wineData = {
                    isStatus : 2,
                    Add: [{
                        WineLiquorId: addArray.value.WineLiquorId,
                        Year: addArray.value.Year,
                        WineLiquorTotal: addArray.value.quantity,
                        BottleSize: addArray.value.BottleSize,
                        ExciseTax: parseFloat(addArray.value.exciseTaxByTotal),
                        LocalTax: parseFloat(addArray.value.externalLocal),
                        Fund: parseFloat(addArray.value.externalFund),
                        CustomsDuty: parseFloat(addArray.value.exciseTaxByDuty),
                        InitialValue: addArray.value.RecommendMinPrice,
                        TotalTax: parseFloat(addArray.value.externalTotal),
                        IsStatus: '',
                        // NewPrice: '',
                        // InvoiceFileType: '',
                        // InvoicePictureUrl: '',
                    }],
                    Remove: [{
                        Id: removeArray.value ? removeArray.value[0].Id : '',
                        CartId: removeArray.value[0].CartId,
                        WineLiquorId: removeArray.value[0].WineLiquorId,
                        WineLiquorPicId: removeArray.value[0].WineLiquorPicId,
                        WineLiquorTotal: removeArray.value[0].WineLiquorTotal,
                        BottleSize: removeArray.value[0].BottleSize,
                        ExciseTax: removeArray.value[0].ExciseTax,
                        LocalTax: removeArray.value[0].LocalTax,
                        Fund: removeArray.value[0].Fund,
                        CustomsDuty: removeArray.value[0].CustomsDuty,
                        InitialValue: removeArray.value[0].InitialValue,
                        TotalTax: removeArray.value[0].TotalTax,
                        IsStatus: '',
                    }]
                }
                // console.log("Wine Data :", wineData)
                const updateCartItem = await updateCart(wineData, importCartId.value, token.value)
                console.log("Updating cart :", updateCartItem.data)
                spinner.value = false
                router.push('/import-wine-list')
            }
            else {
                spinner.value = true
                const wineData = {
                    IsStatus : 2,
                }
                // console.log("Wine Data :", wineData)
                const updateCartItem = await updateCart(wineData, importCartId.value, token.value)
                console.log("Updating cart :", updateCartItem.data)
                spinner.value = false
                router.push('/import-wine-list')
            }
        }

        const onDownloadQRCodeClick = async () => {
            // console.log("Downloading QR Code!!!!!!!!");
            
            // const getQR = await getQRCode(importCartId.value, token.value)
            // console.log('GET QR DATA', getQR.data)

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
            const getCartData = await getCartItem(importCartId.value, token.value)
            cartItems.value = getCartData.data
            console.log('Cart data :', cartItems.value)
            checkpoint.value = cartItems.value.ImportPurpose.Checkpoint
            importPurpose.value = cartItems.value.ImportPurpose.PurposeId
            importDate.value = new Date(cartItems.value.ImportPurpose.PurposeDate).toISOString().slice(0, 10)
            // console.log("Import values :", importPurpose.value, checkpoint.value, importDate.value)
            itemsArray.value = cartItems.value.Items.map(item => {
                return {
                    ...item,
                    isCorrect: isCorrect.value,
                    isNewWine: isNewWine.value
                }
            });
            defaultArray.value = itemsArray.value
            calculateSummary(cartItems.value.Items);
            spinner.value = false
        }

        const fetchImportPurpose = async () => {
            const enumGroup = 'FtImportPurpose'
            const importPurposeData = await getEnumGroup(enumGroup)
            importPurposeList.value = importPurposeData.data
        }

        const fetchCheckpoint = async () => {
            const enumGroup = 'FtCheckPoint'
            const checkpointData = await getEnumGroup(enumGroup)
            checkpointList.value = checkpointData.data
        }

        const generateYearsArray = () => {
            const currentYear = new Date().getFullYear();
            years.value.push('NV');
            for (let year = currentYear; year >= currentYear - 200; year--) {
                years.value.push(year);
            }
            // years.value.reverse()
            return years;
        }

        const showNotFoundAlert = async () => {
            notFoundAlert.value = true;
            setTimeout(() => {
                notFoundAlert.value = false;
            }, 5000);
        };

        onMounted(() => {
            importCartId.value = localStorage.getItem('importCartId')
            token.value = localStorage.getItem('token')
            // newAddedWine.value = []

            fetchCartItem()
            fetchBottleSizes()
            fetchImportPurpose()
            fetchCheckpoint()
            generateYearsArray()
        })

        return {
            cartItems,
            itemsArray,
            isCorrect,
            algoliaResults,
            dropdownVisible,
            selectedWine,
            currentWineId,
            wineSearch,
            wineName,
            bottleSize,
            bottleSizes,
            searchObject,
            // wineImage,
            // autocompleteResults,
            newAddedWine,
            isNewWine,
            addArray,
            importPurposeList,
            importPurpose,
            checkpointList,
            checkpoint,
            importDate,
            years,
            vintage,
            spinner,
            isConfirmed,
            onWineNameChangeClick,
            selectWine,
            onPreviousClick,
            onWineNameSearch,
            onSearchClick,
            increaseQuantity,
            decreaseQuantity,
            onAddToCartClick,
            onCorrectClick,
            onIncorrectClick,
            // onAddConfirmClick,
            onSaveClick,
            onConfirmSaveClick,
            formatNumber,
            showNotFoundAlert,
            notFoundAlert,
            disabledIncorrect,
            totalLiter,
            totalQty,
            totalInitialValue,
            totalTaxAll,
            isEdit,
            onEditPriceClick,
            onFileUpload,
            uploadWineFile,
            onPriceConfirmClick,
            onFileDisplayClick,
            displayFile,
            onDownloadQRCodeClick
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

.import-card {
    margin-top: 20px;
    padding: 30px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.wine-name-incorrect {
    position: relative;
    width: 475px !important;
    padding: 10px;
    margin-left: 10px;
    font-size: 22px;
    font-weight: 700;
    box-shadow: 0px 3px 6px #00000029;
    background-color: #FFFFFF;
    border: 1px solid #CACACA;
    border-radius: 5px;
    z-index: 2;
}

.check-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.btn-correct {
    width: 50%;
    height: 44px;
    font-weight: 700;
    background-color: #2B476D;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    margin-left: 3px;
}

.btn-incorrect {
    width: 50%;
    height: 44px;
    font-weight: 700;
    background-color: #FF5757;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    margin-right: 3px;
}

.btn-checked-correct {
    margin-top: 20px;
    width: 100%;
    height: 45px;
    font-weight: 700;
    background-color: #FFFFFF;
    color: #5ED15E;
    border: 3px solid #5ED15E;
    border-radius: 5px;
}

.btn-checked-incorrect {
    margin-top: 20px;
    width: 100%;
    height: 45px;
    font-weight: 700;
    background-color: #FFFFFF;
    color: #FF5757;
    border: 3px solid #FF5757;
    border-radius: 5px;
}

.btn-previous {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    background-color: #77818A;
    width: 50%;
    height: 44px;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-right: 3px;
}

.btn-save {
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
    margin-top: 10px;
}

.tax-confirm {
    color: #FF0000;
    font-size: 24px;
    font-weight: 700;
}

.bottle-image {
    width: 50px;
    height: auto;
    margin-right: 10px;
    padding: 10px;
}

.search-input {
    width: 100%;
    height: 38px;
    border: 1px solid #2B476D;
    border-radius: 5px;
    background-color: #FFFFFF;
}

.search-input:focus,
.search-input:focus:not([readonly]) {
    outline: none;
    /* outline: 1px solid #3D3E3E !important; */
}

.search-button {
    display: flex;
    justify-content: flex-end;
    /* align-items: baseline; */
    padding-top: 20px;
}

.btn-search {
    width: 145px;
    height: 45px;
    background: #2B476D 0% 0% no-repeat padding-box;
    color: #FFFFFF;
    border: none;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
}

.search-result-session {
    margin-top: 20px;
}

.wine-detail-card {
    width: 100%;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
    margin: 20px 0px;
}

.slider-session {
    padding: 20px 0px;
}

.price-col {
    padding: 20px;
}

.wine-price {
    color: #2B476D;
    font-size: 18px;
    font-weight: 700;

}

.wine-name {
    color: #000000;
    font-size: 22px;
}

.wine-detail-text {
    color: #000000;
    font-size: 18px;
}

.btn-detail {
    background: transparent;
    border: none;
    text-decoration: underline;
    color: #77818A;
    font-size: 14px;
    padding: 0px !important;
}

.btn-add-to-cart {
    font-family: "Prompt", sans-serif;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    font-size: 14px;
    width: 114px;
    height: 33px;
    border-radius: 5px;
}

.autocomplete-results {
    list-style: none;
    padding: 0;
    margin: 0;
    left: 11px !important;
    right: 11px;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    background-color: white;
    z-index: 1000;
}

.autocomplete-results li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}

.autocomplete-results li:hover {
    background-color: #f0f0f0;
}

.confirm-buttons {
    margin-top: 20px;
}

.confirm-buttons .btn-cancel {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    background-color: #77818A;
    color: #FFFFFF;
    width: 167px;
    height: 44px;
    border-radius: 5px;
    border: none;
    margin-right: 3px;
}

.confirm-buttons .btn-confirm {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    background-color: #2B476D;
    color: #FFFFFF;
    width: 167px;
    height: 44px;
    border-radius: 5px;
    border: none;
    margin-left: 3px;
}

.not-found-alert {
    position: fixed;
    top: 15%;
    padding: 10px 30%;
    z-index: 1;
    text-align: center;
}

.alert>button {
    vertical-align: middle;
    background-color: #2B476D;
    color: #FFFFFF;
    padding: 7px 20px;
    border: 1px solid transparent;
    border-radius: 0.5rem;
}

.upload-icon {
    width: 50px;
    height: auto;
    margin-bottom: 20px;
}

.price-input {
    width: 168px;
    height: 32px;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #CACACA;
    border-radius: 5px;
}

.price-edit-buttons {
    margin-top: 10px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
}

.price-edit-buttons .btn-cancel {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    width: 167px;
    height: 44px;
    background-color: #77818A;
    border: none;
    border-radius: 5px;
    margin-right: 3px
}

.price-edit-buttons .btn-save {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    width: 167px;
    height: 44px;
    background-color: #2B476D;
    border: none;
    border-radius: 5px;
    margin-left: 3px
}

.upload-session {
    margin: 0px 20px 20px 20px;
}

.image-input {
    display: none;
    position: absolute;
    cursor: pointer;
    z-index: 1;
}

.upload-card {
    margin: 25px 0px;
    padding: 20px;
    border: 1px dashed #2B476D;
    border-radius: 7px;
    cursor: pointer;
}

</style>