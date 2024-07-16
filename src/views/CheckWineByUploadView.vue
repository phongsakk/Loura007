<template>
    <div class="custom-container position-relative">
        <div class="header-card">
            <h1 class="text-start">รายการสุราในตระกร้า</h1>
        </div>
        <div class="import-card">
            <div class="text-start" style="width: 400px;">
                    <label class="form-label">วัตถุประสงค์ในการนำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="importPurpose">
                        <option value="" disabled selected>Select....</option>
                        <option v-for="option in importPurposeList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <label class="form-label">ด่านนำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="checkpoint">
                        <option value="" disabled selected>Select....</option>
                        <option v-for="option in checkpointList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <label class="form-label">วันที่ประมาณนำเข้า</label>
                    <input type="date" class="form-input" v-model="importDate">
                </div>
        </div>

        <div v-for="wine in itemsArray" :key="wine.Id">
        <div v-if="wine.isChecked === false">
            <div v-if="isUploaded === false">
                <div class="product-card">
                    <div class="row ">
                        <div class="col-lg-2 d-flex align-items-center justify-content-center">
                            <div class="wine-image-card">
                                <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.WineLiquorPic.Path}`" alt="" class="card-image">
                            </div>
                        </div>
                        <div class="col-lg-7 horizontal-divider">
                            <div class="d-flex justify-content-between" style="padding-top: 20px;">
                                <div class="category">
                                    <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{wine.WineLiquor.CategoryLabel}}</p>
                                </div>
                                <div class="year">
                                    <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span class="manu-year">{{ wine.WineLiquorPic.WineLiquorYear }}</span></p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <!-- <div v-if="wine.isUploaded === false" class="wine-name-incorrect" @click="onWineNameChangeClick(wine.Id)">{{ wine.WineLiquor.DisplayName }}</div> -->
                                <p v-if="wine.isUploaded === true" class="wine-name-display">{{ wine.WineLiquor.DisplayName }}</p>
                                
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
                                    <p style="margin-bottom: 0px;">{{ wine.ExciseTax }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ภาษีท้องถิ่น</label>
                                    <p style="margin-bottom: 0px;">{{ wine.TotalTax}} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">เงินบำรุงกองทุน</label>
                                    <p style="margin-bottom: 0px;">{{ wine.Fund }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ภาษีศุลกากร</label>
                                    <p style="margin-bottom: 0px;">{{ wine.CustomsDuty }} บาท</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 price-col text-end">
                            <label class="form-label bold">มูลค่าเบื้องต้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ wine.InitialValue }} บาท</p>
                            <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                            <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ wine.TotalTax }} บาท</p>
                            <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ wine.WineLiquorTotal }} ขวด</p>
                            <div v-if="isChecked === false">
                                <button class="btn-scan" @click="onScanClick">สแกนฉลาก</button>
                            </div>
                            <div v-else>
                                <div v-if="isUploaded === true">
                                    <button class="btn-correct"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- After upload -->
            <div v-else>
                <div v-if="isNewWine === false">
                    <div class="product-card">
                        <div class="row text-start" style="padding: 10px 20px 20px 20px;">
                            <div class="col-7 position-relative">
                                <label class="form-label">ค้นหาด้วยชื่อ</label>
                                <input type="text" class="search-input" placeholder="ชื่อสุรา" v-model="wineName" @input="onWineNameSearch">
                            </div>
                                <div class="col-1">
                                    <label class="form-label">ปีที่ผลิต</label>
                                    <select id="idSelect" name="years" class="search-input" v-model="vintage">
                                        <option value="" disabled selected>ไม่เลือกปีที่ผลิต</option>
                                        <option v-for="option in years" :key="option" :value="option"
                                            class="option">
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
                                    <div class="search-button d-flex align-items-end">
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
                                            <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.Path}`" alt="" class="search-image">
                                        </div>
                                    </div>
                                    <div class="col-lg-4 horizontal-divider">
                                        <div class="d-flex justify-content-between">
                                            <div class="category">
                                                <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{ wine.CategoryName }}</p>
                                            </div>
                                            <div class="year">
                                                <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span class="wine-detail-text">{{ wine.Year }}</span></p>
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
                                                <p class="wine-price">{{ wine.RecommendMinPrice }} บาท</p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <label class="form-label">ปริมาตรสุราทั้งหมด(ลิตร)</label>
                                                <p class="wine-price">{{ wine.wineLiter }}ลิตร</p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <label class="form-label">จำนวนขวด</label>
                                                <div class="quantity-count">
                                                    <button class="btn-count" @click="decreaseQuantity(wine.Id)">-</button>
                                                    <input type="text" class="quantity-input text-center" v-model="wine.quantity" disabled>
                                                    <button class="btn-count" @click="increaseQuantity(wine.Id)">+</button>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-end" style="margin-top: 10px;">
                                                <!-- <button class="btn-detail">รายละเอียดเพิ่มเติม</button> -->
                                                <button class="btn-add-to-cart" @click="onAddToCartClick(wine.Id)">ตรวจสอบไวน์</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div v-else class="product-card">
                    <div v-if="addArray" class="row ">
                        <div class="col-lg-2 d-flex align-items-center justify-content-center">
                            <div class="wine-image-card">
                                <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${addArray.Path}`" alt="" class="card-image">
                            </div>
                        </div>
                        <div class="col-lg-7 horizontal-divider">
                            <div class="d-flex justify-content-between" style="padding-top: 10px;">
                                <div class="category">
                                    <p class="category-name" style="margin-bottom: 0px;"><span class="category-icon"><img src="../assets/img/wine-img1.png" class="category-image"></span>{{addArray.CategoryName}}</p>
                                </div>
                                <div class="year">
                                    <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span class="manu-year">{{ addArray.Year }}</span></p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <!-- <div v-if="wine.isCorrect === false" class="wine-name-incorrect" @click="onWineNameChangeClick(wine.Id)">{{ wine.WineLiquor.DisplayName }}</div> -->
                                <p class="wine-name-display">{{ addArray.WineName }}</p>
                                
                            </div>
                            <div class="row text-start">
                                <div class="col-3">
                                    <label class="form-label">ประเทศที่ผลิต</label>
                                    <p style="margin-bottom: 0px;">{{ addArray.Country }}</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                    <p style="margin-bottom: 0px;">alc. {{ addArray.AVB }} % vol.</p>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                    <p style="margin-bottom: 0px;">{{ addArray.BottleSize }}</p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <div class="col-3">
                                    <label class="form-label">ภาษีสรรพสามิต</label>
                                    <p style="margin-bottom: 0px;">{{ addArray.ExciseTax }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ภาษีท้องถิ่น</label>
                                    <p style="margin-bottom: 0px;">{{ addArray.TotalTax}} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">เงินบำรุงกองทุน</label>
                                    <p style="margin-bottom: 0px;">{{ addArray.Fund }} บาท</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ภาษีศุลกากร</label>
                                    <p style="margin-bottom: 0px;">{{ addArray.CustomsDuty }} บาท</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 price-col text-end">
                            <label class="form-label bold">มูลค่าเบื้องต้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ addArray.InitialValue }} บาท</p>
                            <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                            <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ addArray.TotalTax }} บาท</p>
                            <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ addArray.WineLiquorTotal }} ขวด</p>
                            <!-- <div v-if="wine.isCorrect === true"> -->
                                <button class="btn-checked-correct">ตรวจสอบสุราเรียบร้อยแล้ว</button>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
        <div class="summary-card">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">ปริมาตรไวน์ในตะกร้า</p>
                <p class="text-end summary-value">2.25/10 ลิตร</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">รวมจำนวนไวน์นำเข้าทั้งหมด</p>
                <p class="text-end summary-value">3 ขวด</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">มูลค่าที่ใช้ในการคำนวนภาษี</p>
                <p class="text-end summary-value">67,013.00 บาท</p>
            </div>
            <hr class="divider-line">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label" style="font-weight: 700;">รวมภาษีและเงินกองทุนทั้งหมด</p>
                <p class="text-end summary-value">14,263.00 บาท</p>
            </div>
            <div style="padding: 0px 100px;">
                <div class="d-flex justify-content-center">
                    <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button>
                    <button class="btn-save" @click="onSaveClick">ยืนยัน</button>
                </div>
                <!-- <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button> -->
                <button class="btn-downloadQr" @click="onDownloadQRCodeClick">ดาวน์โหลดคิวอาร์โค้ดและแบบฟอร์ม</button>
            </div>
        </div>
    </div>
    </div>
    <div class="upload-modal" v-if="uploadModal === true">
        <div class="modal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div v-if="algoliaImageResults.length > 0">
                        <p class="form-label fw-bold text-start" style="margin-bottom: 10px;">ค้นหาด้วยรูปภาพ</p>
                        <div v-for="result in algoliaImageResults" :key="result.objectID">
                            <div class="image-search-results" @click="onImageResultClick(result.name, result.alcohol)">
                                <div class="result-name d-flex align-items-center">
                                    <img :src="result.image_label" alt="" class="bottle-image">
                                    <p class="wine-name" style="margin-bottom: 0px;">{{ result.name }}</p>
                                </div>
                                <div class="result-country">
                                    <p class="country-text">{{ result.country }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="upload-session">
                        <input type="file" class="image-input" id="image-input" accept="image/*" @change="onUploadClick($event)">
                        <label for="image-input" class="upload-label">
                            <img src="../assets/img/upload-icon.png" alt="" class="upload-icon">
                            <h3>ค้นหารูปภาพ</h3>
                            <p>วางไฟล์รูปตรงนี้ หรือ เลือกไฟล์รูป</p>
                        </label>
                    </div>
                    <div class="text-center" style="margin-top: 20px;">
                        <button class="btn-back" @click="onModalCancelClick">ปิด</button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCartItem, uploadWineSearchImage, getWineSearch, updateCart } from '@/api/getWineSearch'
import { getBottleSize } from '@/api/getWineSearch.js'
import { getEnumGroup } from '@/api/getMaster'
import algoliasearch from 'algoliasearch';

export default {
    setup() {
        const router = useRouter()

        const cartItems = ref([])
        const itemsArray = ref([])
        const importCartId = ref('')
        const token = ref('')
        // const bottleSize = ref('')
        const importPurposeList = ref([])
        const importPurpose = ref('')
        const checkpointList = ref([])
        const checkpoint = ref('')
        const importDate = ref('')
        const isChecked = ref(false)
        const isUploaded = ref(false)
        const uploadModal = ref(false)
        const wineImage = ref('')
        const wineNameFromImage = ref('')
        const algoliaImageResults = ref([])
        const wineSearch = ref([])
        const wineName = ref('')
        const bottleSize = ref('')
        const bottleSizes = ref([])
        const bottleCode = ref ('')
        const avb = ref('')
        const vintage = ref('')
        const location = ref('')
        const uid = ref('')
        const currencyCode = ref('THB')
        const addArray = ref([])
        const isNewWine = ref(false)

        const taxByPrice = ref(5)
        const taxByValue = ref(1000)
        // const taxByDuty = ref(0)
        const taxByFund = ref(1.175)
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

        const spinner = ref(false)

        const onScanClick = () => {
            uploadModal.value = true
            algoliaImageResults.value = []
        }

        const onUploadClick = async (event) => {
            spinner.value = true
            const selectedImage = event.target.files[0]
            wineImage.value = selectedImage
            console.log("Wine image to search :", wineImage.value)
            if (wineImage.value) {
                const uploadImage = await uploadWineSearchImage(wineImage.value)
                console.log("Uploading Image:", uploadImage.data)
                // autocompleteResults.value = uploadImage.data
                wineNameFromImage.value = uploadImage.data[0].wine_name_display
                console.log("Wine name from image search :", wineNameFromImage.value)
                if (wineNameFromImage.value) {
                    await algoliaSearch()
                }
            }
            spinner.value = false
        }

        const onModalCancelClick = () => {
            uploadModal.value = false
            algoliaImageResults.value = []
        }

        const algoliaSearch = async () => {
            if (wineNameFromImage.value) {
                const client = algoliasearch('Q3BB077ZJ4', 'e25233448e08e7b8babe79599f43c5c0');
                const index = client.initIndex('wine_index');
                const { hits } = await index.search(wineNameFromImage.value);
                algoliaImageResults.value = hits;
                console.log("Algolia search result:", algoliaImageResults.value);
                // imageSearchModal.value = true
            }
        };

        const onImageResultClick = async(name, alc) => {
            spinner.value = true
            wineName.value = name
            avb.value = alc
            const wineSearchData = await getWineSearch(wineName.value, vintage.value, location.value, avb.value, bottleSize.value, bottleCode.value, currencyCode.value, uid.value)
            console.log("Wine Search Data:", wineSearchData.data)
            if ( wineSearchData.code === 404) {
                spinner.value = false
                // notFoundAlert.value = true
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
                console.log("Updated wine search array:", wineSearch.value)
                spinner.value = false
                uploadModal.value = false
                isUploaded.value = true
            }
        }

        const onAddToCartClick = (WineLiquorId) => {
            const wine = wineSearch.value.find(w => w.Id === WineLiquorId);
            addArray.value = wine
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
                fAndI: formatNumber(calculatedValues.itemFAndI)
            });
            console.log("Add array:", addArray.value)
            isChecked.value = true
            isNewWine.value = true
        }

        const onPreviousClick = () => {
            router.push('/import-wine-list-in-cart')
        }

        const onSaveClick = async() => {
            const wineData = {
                Add : [{
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
                Remove :[ {
                    // Id: removeArray.value[0].Id,
                    // CartId: removeArray.value[0].CartId,
                    // WineLiquorId: removeArray.value[0].WineLiquorId,
                    // WineLiquorPicId: removeArray.value[0].WineLiquorPicId,
                    // WineLiquorTotal: removeArray.value[0].WineLiquorTotal,
                    // BottleSize: removeArray.value[0].BottleSize,
                    // ExciseTax: removeArray.value[0].ExciseTax,
                    // LocalTax: removeArray.value[0].LocalTax,
                    // Fund: removeArray.value[0].Fund,
                    // CustomsDuty: removeArray.value[0].CustomsDuty,
                    // InitialValue: removeArray.value[0].InitialValue,
                    // TotalTax: removeArray.value[0].TotalTax,
                    // IsStatus: '',
                }]
            }
            console.log("Wine Data :", wineData)
            const updateCartItem = await updateCart (wineData, importCartId.value, token.value)
            console.log("Updating cart :", updateCartItem.data)
            router.push('/import-wine-list')
        }

        const calculateValues = (item) => {
            if (!item.BottleSize) {
                throw new Error("BottleSize is not defined");
            }
            const bottleSizeToCalculate = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
            const itemExciseTaxByDuty = item.RecommendMinPrice * taxByPrice.value * 0.01;
            const itemExciseTaxByValue = (item.AVB / 100) * bottleSizeToCalculate * taxByValue.value;
            const itemCalTaxByDuty = (item.RecommendMinPrice + itemExciseTaxByDuty) * (taxByPrice.value / 100);
            const itemCalTaxByValue = itemExciseTaxByValue * taxByFund.value * (taxByPrice.value / 100);
            const itemCalTaxByFund = 1 - taxByFund.value * (taxByPrice.value / 100);
            const itemExciseTaxByPrice = (itemCalTaxByDuty + itemCalTaxByValue) / itemCalTaxByFund;
            const itemExciseTaxByTotal = itemExciseTaxByDuty + itemExciseTaxByPrice;
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

        const fetchCartItem = async () => {
            const getCartData = await getCartItem (importCartId.value, token.value)
            cartItems.value = getCartData.data
            console.log('Cart data :', cartItems.value)
            checkpoint.value = cartItems.value.ImportPurpose.Checkpoint
            importPurpose.value = cartItems.value.ImportPurpose.PurposeId
            importDate.value = formatDate(cartItems.value.ImportPurpose.PurposeDate)
            console.log("Import values :", importPurpose.value , checkpoint.value, importDate.value)
            itemsArray.value = cartItems.value.Items.map (item => {
                return {
                    ...item,
                    isChecked : isChecked.value
                }
            })
            console.log("Cart Items after map", itemsArray.value)
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

        const fetchBottleSizes = async () => {
            const enumGroup = 'BottleSize'
            const fetchSizes = await getBottleSize(enumGroup);
            bottleSizes.value = fetchSizes.data
            bottleSize.value = fetchSizes.data[0].EnumName
        }

        const formatDate = (data) => {
            const date = new Date(data);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
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

        onMounted(() => {
            importCartId.value = localStorage.getItem('importCartId')
            token.value = localStorage.getItem('token')
            // newAddedWine.value = []

            fetchCartItem()
            fetchBottleSizes()  
            fetchImportPurpose()
            fetchCheckpoint()
        })

        return {
            isChecked,
            isUploaded,
            cartItems,
            itemsArray,
            importPurposeList,
            importPurpose,
            checkpointList,
            checkpoint,
            importDate,
            onScanClick,
            uploadModal,
            onUploadClick,
            algoliaImageResults,
            onModalCancelClick,
            onImageResultClick,
            spinner,
            wineSearch,
            bottleSize,
            bottleSizes,
            vintage,
            onAddToCartClick,
            addArray,
            isNewWine,
            onPreviousClick,
            onSaveClick
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

.btn-scan {
    background-color: #2B476D;
    width: 100%;
    height: 44px;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
}

.btn-previous {
    background-color: #77818A;
    width: 50%;
    height: 44px;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-right: 3px;
}

.btn-save {
    width: 50%;
    height: 44px;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    margin-left: 3px;
}

.btn-downloadQr {
    width: 100%;
    height: 44px;
    background-color: #FFFFFF;
    color: #3D3E3E;
    border: 2px solid #3D3E3E;
    border-radius: 5px;
    margin-top: 10px;
}

.image-input {
    display: none;
    position: absolute;
    cursor: pointer;
    z-index: 1;
}

.upload-icon {
    width: 50px;
    height: auto;
    margin-bottom: 10px;
}

.upload-session h3 {
    color: #2B476D;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 20px;
}

.upload-session p {
    color: #2B476D;
    font-size: 14px;
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
    padding: 30px 40px;
    margin-top: 20%;
    border: none !important;
    width: 800px;
    text-align: center;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.search-input {
    width: 100%;
    border: 1px solid #2B476D;
    border-radius: 5px;
    height: 37px;
}

.btn-search {
    width: 100%;
    height: 37px;
    background-color: #2B476D;
    border-radius: 5px;
    border: none;
}

.upload-session {
    margin-top: 40px;
    margin-bottom: 20px;
}

.image-search-results {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    cursor: pointer;
}

.country-text {
    color: #77818A;
    font-size: 22px;
    margin-bottom: 0px !important;
}

.bottle-image {
  width: 50px;
  height: auto;
  margin-right: 10px;
  /* padding: 10px;
  box-shadow: 0px 3px 6px #00000065;
border-radius: 6px; */
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

.price-col {
    padding: 20px;
}

.wine-price {
    color: #2B476D;
    font-size: 18px;
    font-weight: 700;

}

/* .wine-name {
    color: #000000;
    font-size: 22px;
} */

.wine-detail-text {
    color: #000000;
    font-size: 18px;
}

.btn-add-to-cart {
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    font-size: 14px;
    width: 114px;
    height: 33px;
    border-radius: 5px;
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

</style>