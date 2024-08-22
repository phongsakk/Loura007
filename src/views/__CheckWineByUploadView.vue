<template>
    <div class="custom-container position-relative">
        <div class="header-card">
            <h1 class="text-start">รายการสุราในตระกร้า</h1>
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

        <div v-for="wine in cartItems" :key="wine.Id">
            <div v-if="wine.isChecked === false">
                <div class="product-card">
                    <div class="row ">
                        <div class="col-lg-2 d-flex align-items-center justify-content-center">
                            <div class="wine-image-card">
                                <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.data.WineLiquorPic.Path}`"
                                    alt="" class="card-image">
                            </div>
                        </div>
                        <div class="col-lg-7 horizontal-divider">
                            <div class="d-flex justify-content-between" style="padding-top: 10px;">
                                <div class="category">
                                    <p class="category-name" style="margin-bottom: 0px;"><span
                                            class="category-icon"><img src="../assets/img/wine-img1.png"
                                                class="category-image"></span>{{ wine.data.WineLiquor.CategoryLabel }}</p>
                                </div>
                                <div class="year">
                                    <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span
                                            class="manu-year">{{ wine.data.WineLiquorPic.WineLiquorYear }}</span></p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <p class="wine-name-display text-start">{{ wine.data.WineLiquor.DisplayName }}</p>

                            </div>
                            <div class="row text-start">
                                <div class="col-3">
                                    <label class="form-label">ประเทศที่ผลิต</label>
                                    <p style="margin-bottom: 0px;">{{ wine.data.WineLiquor.Country }}</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                    <p style="margin-bottom: 0px;">alc. {{ wine.data.WineLiquorPic.Alcohol }} % vol.</p>
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
                                    <p style="margin-bottom: 0px;">{{ formatNumber(wine.TotalTax) }} บาท</p>
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
                            <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.InitialValue) }} บาท
                            </p>
                            <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                            <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.TotalTax) }} บาท</p>
                            <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ wine.WineLiquorTotal }} ขวด
                            </p>
                            <button class="btn-scan" @click="onScanClick(wine.Id)"><img
                                src="../assets/img/scan-icon.png" alt="" class="scan-icon">สแกนฉลาก</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-if="wine.isUploaded === false">
                    <div class="product-card">
                        <div class="row ">
                            <div class="col-lg-2 d-flex align-items-center justify-content-center">
                                <div class="wine-image-card">
                                    <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.WineLiquorPic.Path}`"
                                        alt="" class="card-image">
                                </div>
                            </div>
                            <div class="col-lg-7 horizontal-divider">
                                <div class="d-flex justify-content-between" style="padding-top: 10px;">
                                    <div class="category">
                                        <p class="category-name" style="margin-bottom: 0px;"><span
                                                class="category-icon"><img src="../assets/img/wine-img1.png"
                                                    class="category-image"></span>{{ wine.WineLiquor.CategoryLabel }}
                                        </p>
                                    </div>
                                    <div class="year">
                                        <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span
                                                class="manu-year">{{ wine.WineLiquorPic.WineLiquorYear }}</span></p>
                                    </div>
                                </div>
                                <div class="row text-start">
                                    <p class="wine-name-display text-start">{{ wine.WineLiquor.DisplayName }}</p>

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
                                        <p style="margin-bottom: 0px;">{{ formatNumber(wine.TotalTax) }} บาท</p>
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
                                <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.InitialValue) }}
                                    บาท</p>
                                <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                                <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                                <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.TotalTax) }} บาท
                                </p>
                                <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ wine.WineLiquorTotal }} ขวด
                                </p>
                                <div v-if="isChecked === false">
                                    <button class="btn-scan" @click="onScanClick(wine.Id)"><img
                                            src="../assets/img/scan-icon.png" alt="" class="scan-icon">สแกนฉลาก</button>
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
                <div v-if="wine.isUploaded === true">
                    <div v-if="wine.isNewWine">
                        <div class="product-card">
                            <div class="row ">
                                <div class="col-lg-2 d-flex align-items-center justify-content-center">
                                    <div class="wine-image-card">
                                        <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.Path}`"
                                            alt="" class="card-image">
                                    </div>
                                </div>
                                <div class="col-lg-7 horizontal-divider">
                                    <div class="d-flex justify-content-between" style="padding-top: 10px;">
                                        <div class="category">
                                            <p class="category-name" style="margin-bottom: 0px;"><span
                                                    class="category-icon"><img src="../assets/img/wine-img1.png"
                                                        class="category-image"></span>{{ wine.CategoryName }}</p>
                                        </div>
                                        <div class="year">
                                            <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span
                                                    class="manu-year">{{ wine.Year }}</span></p>
                                        </div>
                                    </div>
                                    <div class="row text-start">
                                        <p class="wine-name-display text-start">{{ wine.WineName }}</p>

                                    </div>
                                    <div class="row text-start">
                                        <div class="col-3">
                                            <label class="form-label">ประเทศที่ผลิต</label>
                                            <p style="margin-bottom: 0px;">{{ wine.Country }}</p>
                                        </div>
                                        <div class="col-3">
                                            <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                            <p style="margin-bottom: 0px;">alc. {{ wine.AVB }} % vol.</p>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                            <p style="margin-bottom: 0px;">{{ wine.BottleSize }}</p>
                                        </div>
                                    </div>
                                    <div class="row text-start">
                                        <div class="col-3">
                                            <label class="form-label">ภาษีสรรพสามิต</label>
                                            <p style="margin-bottom: 0px;">{{ wine.exciseTaxByTotal }} บาท</p>
                                        </div>
                                        <div class="col-3">
                                            <label class="form-label">ภาษีท้องถิ่น</label>
                                            <p style="margin-bottom: 0px;">{{ wine.externalLocal }} บาท</p>
                                        </div>
                                        <div class="col-3">
                                            <label class="form-label">เงินบำรุงกองทุน</label>
                                            <p style="margin-bottom: 0px;">{{ wine.externalFund }} บาท</p>
                                        </div>
                                        <div class="col-3">
                                            <label class="form-label">ภาษีศุลกากร</label>
                                            <p style="margin-bottom: 0px;">{{ wine.exciseTaxByDuty }} บาท</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 price-col text-end">
                                    <label class="form-label bold">มูลค่าเบื้องต้น</label>
                                    <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.RecommendMinPrice) }} บาท
                                    </p>
                                    <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                                    <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                                    <p class="price-text" style="margin-bottom: 0px;">{{ wine.externalTotal }} บาท</p>
                                    <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ wine.quantity }} ขวด
                                    </p>
                                    <div v-if="wine.isCheckedCorrect === true">
                                        <button class="btn-checked-correct">ตรวจสอบสุราเรียบร้อยแล้ว</button>
                                    </div>
                                    <div v-else>
                                        <button class="btn-checked-incorrect">ไม่พบไวน์ในระบบ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
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
                                                <p class="wine-price">{{ formatNumber(wine.RecommendMinPrice) }} บาท</p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <label class="form-label">ปริมาตรสุราทั้งหมด(ลิตร)</label>
                                                <p class="wine-price">{{ wine.wineLiter }}ลิตร</p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <label class="form-label">จำนวนขวด</label>
                                                <div class="quantity-count">
                                                    <button class="btn-count"
                                                        @click="decreaseQuantity(wine.Id)">-</button>
                                                    <input type="text" class="quantity-input text-center"
                                                        v-model="wine.quantity" disabled>
                                                    <button class="btn-count"
                                                        @click="increaseQuantity(wine.Id)">+</button>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-end" style="margin-top: 20px;">
                                                <button class="btn-add-to-cart"
                                                    @click="onAddToCartClick(wine.Id)">ตรวจสอบไวน์</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="summary-card">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">ปริมาตรไวน์ในตะกร้า</p>
                <p class="text-end summary-value">{{ totalLiter }} /10 ลิตร</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">รวมจำนวนไวน์นำเข้าทั้งหมด</p>
                <p class="text-end summary-value">{{ totalQty }} ขวด</p>
            </div>
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label">มูลค่าที่ใช้ในการคำนวนภาษี</p>
                <p class="text-end summary-value">{{ formatNumber(totalInitialValue) }} บาท</p>
            </div>
            <hr class="divider-line">
            <div class="d-flex justify-content-between">
                <p class="text-start summary-label" style="font-weight: 700;">รวมภาษีและเงินกองทุนทั้งหมด</p>
                <p class="text-end summary-value">{{ formatNumber(totalTaxAll) }} บาท</p>
            </div>
            <div style="padding: 10px 100px;">
                <div class="d-flex justify-content-center">
                    <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button>
                    <button class="btn-save" @click="onSaveClick">ยืนยัน</button>
                </div>
                <!-- <button class="btn-previous" @click="onPreviousClick">ย้อนกลับ</button> -->
                <button class="btn-downloadQr" @click="onDownloadQRCodeClick">ดาวน์โหลดคิวอาร์โค้ดและแบบฟอร์ม</button>
            </div>
        </div>
    </div>
    <div class="upload-modal" v-if="uploadModal === true">
        <div class="modal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="image-search-list">
                        <div v-if="algoliaImageResults.length > 0">
                            <p class="form-label fw-bold text-start" style="margin-bottom: 10px;">ค้นหาด้วยรูปภาพ</p>
                            <div v-for="result in algoliaImageResults" :key="result.objectID">
                                <div class="image-search-results"
                                    @click="onImageResultClick(result.name, result.alcohol)">
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
                            <input type="file" class="image-input" id="image-input" accept="image/*"
                                @change="onUploadClick($event)">
                            <label for="image-input" class="upload-label">
                                <img src="../assets/img/upload-icon.png" alt="" class="upload-icon">
                                <h3>ค้นหารูปภาพ</h3>
                                <p>วางไฟล์รูปตรงนี้ หรือ เลือกไฟล์รูป</p>
                            </label>
                        </div>
                    </div>
                    <div class="text-center" style="margin-top: 20px;">
                        <button class="btn-back" @click="onModalCancelClick">ปิด</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="notFoundAlert" class="d-flex justify-content-center">
        <div class="not-found-alert">
            <div class="alert alert-primary" role="alert">
                <p style="margin-bottom: 0px;">ไม่พบข้อมูลไวน์ที่ต้องการค้นหา</p>
            </div>
        </div>
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { getCartItem } from '@/api/getWineSearch';
import { getBottleSize } from '@/api/getWineSearch.js';
import { getEnumGroup } from '@/api/getMaster';
import dayjs from 'dayjs';
// import dayjs from 'dayjs';

export default {
    setup() {
        // setting
        const token = ref(null);
        const cartId = ref(null);
        const spinner = ref(false);

        // master
        const bottleSize = ref(null);
        const bottleSizeList = ref([]);
        const importPurpose = ref(null);
        const importPurposeList = ref([]);
        const checkpoint = ref(null);
        const checkpointList = ref([]);
        const importDate = ref(null);
        const years = ref([]);
        const totalLiter = ref(0);
        const totalQty = ref(0);
        const totalInitialValue = ref(0);
        const totalTaxAll = ref(0);

        // main content
        const cartInfo = ref({});
        const cartItems = ref([]);

        // updater
        const addItems = ref([]);
        const removeItems = ref([]);
        const updateItems = ref([]);

        // event handlers
        const handlePass = async (item) => {
            item.isChecked = true;
            item.checkAs = true;
            item.data.IsStatus = 2;
            updateItems.value.push(item.data);
        }

        const handleFail = async (item) => {
            item.isChecked = true;
            item.checkAs = false;
            item.data.IsStatus = 2;

            // search 
            removeItems.value.push(item.data);
            addItems.value.push(item.data);
        }

        const handleSubmit = async () => {
            console.log({
                cartId: cartId.value,
                IsStatus: cartItems.value.every((item) => item.data.IsStatus == 2) ? 2 : 1,
                Add: addItems.value,
                Remove: removeItems.value,
                Update: updateItems.value
            })
        }

        // utils
        const _generateYearsArray = () => {
            const currentYear = new Date().getFullYear();
            years.value.push('NV');
            for (let year = currentYear; year >= currentYear - 200; year--) {
                years.value.push(year);
            }
            return years;
        }

        const formatNumber = (value) => {
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

        // settings
        const _fetchCartItem = async () => {
            spinner.value = true;

            try {
                const getCartData = await getCartItem(cartId.value, token.value)

                cartInfo.value = getCartData.data;

                console.log(cartInfo.value, cartInfo.value.ImportPurpose.PurposeDate, dayjs(cartInfo.value.ImportPurpose.PurposeDate).format("YYYY-MM-DD"));
                
                importPurpose.value = cartInfo.value.ImportPurpose.PurposeId;
                checkpoint.value = cartInfo.value.ImportPurpose.Checkpoint;
                importDate.value = dayjs(cartInfo.value.ImportPurpose.PurposeDate).format("YYYY-MM-DD");

                cartItems.value = cartInfo.value.Items.map((item) => ({
                    isChecked: false,
                    checkAs: true,
                    data: item,
                    show: {
                        
                    }
                }));
            } catch (error) {
                console.error(error);
            } finally {
                spinner.value = false;
            }
        }

        const _fetchBottleSizes = async () => {
            const enumGroup = 'BottleSize'
            const fetchSizes = await getBottleSize(enumGroup);
            bottleSizeList.value = fetchSizes.data
            bottleSizeList.value = fetchSizes.data[0].EnumName
        }

        const _fetchImportPurpose = async () => {
            const enumGroup = 'FtImportPurpose'
            const importPurposeData = await getEnumGroup(enumGroup)
            importPurposeList.value = importPurposeData.data
        }

        const _fetchCheckpoint = async () => {
            const enumGroup = 'FtCheckPoint'
            const checkpointData = await getEnumGroup(enumGroup)
            checkpointList.value = checkpointData.data
        }

        onMounted(() => {
            cartId.value = localStorage.getItem('importCartId');
            token.value = localStorage.getItem('token');

            _fetchCartItem();
            _fetchBottleSizes();
            _fetchImportPurpose();
            _fetchCheckpoint();
            _generateYearsArray();
        });

        watch(cartItems, async (newCartItems) => {
            totalLiter.value = newCartItems?.reduce((acc, current) => {
                const cur = current.data;
                const q = cur.WineLiquorTotal || cur.quantity;
                return acc + (q * (cur.BottleSize === 'Bottle (750ml)' || cur.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(cur.BottleSize) / 1000 : extractBottleSizeL(cur.BottleSize)));
            }, 0)
            totalQty.value = newCartItems?.reduce((acc, current) => {
                const cur = current.data;
                const q = cur.WineLiquorTotal || cur.quantity;
                return acc + q;
            }, 0);
            totalInitialValue.value = newCartItems?.reduce((acc, current) => {
                const cur = current.data;
                const q = cur.WineLiquorTotal || cur.quantity;
                const value = cur.InitialValue || cur.RecommendMinPrice;
                return acc + (q * value)
            }, 0);
            totalTaxAll.value = newCartItems?.reduce((acc, current) => {
                const cur = current.data;
                const q = cur.WineLiquorTotal || cur.quantity;
                const t = cur.TotalTax || parseFloat(cur.externalTotal.replace(/,/g, ""));
                return acc + (q * t)
            }, 0);
        });

        return {
            spinner,
            cartItems,
            addItems,
            removeItems,
            updateItems,
            handlePass,
            handleFail,
            handleSubmit,
            formatNumber,
            importPurpose,
            importPurposeList,
            checkpoint,
            checkpointList,
            importDate,
            years,
            bottleSize,
            bottleSizeList,
            totalLiter,
            totalQty,
            totalInitialValue,
            totalTaxAll
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
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    background-color: #2B476D;
    width: 100%;
    height: 44px;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
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
    font-family: "Prompt", sans-serif;
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

.scan-icon {
    width: auto;
    height: 15px;
    margin-right: 10px;
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

.image-search-list {
    max-height: 500px;
    overflow-y: auto
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
</style>