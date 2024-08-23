<template>
    <div class="custom-container" @click="handleClickOutside">
        <div class="header-card">
            <h1 class="text-start">ค้นหาชื่อและมูลค่าของไวน์</h1>
        </div>
        <div class="search-card">
            <div class="row">
                <div class="col-7 text-start position-relative">
                    <label class="form-label">ค้นหาด้วยชื่อ</label>
                    <input type="text" class="search-input" placeholder="ชื่อไวน์" v-model="wineName"
                        @input="onWineNameSearch($event)">
                    <div style="padding-right: 20px;">
                        <ul class="autocomplete-results" v-if="algoliaResults.length">
                            <li v-for="(result, index) in algoliaResults" :key="index" @click="selectWine(result.name)">
                                <img :src="result.image_bottle" alt="Bottle Image" class="bottle-image" />{{ result.name
                                }}
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="col-1 text-start">
                    <label class="form-label">ปีที่ผลิต</label>
                    <select id="idSelect" name="years" class="search-input" v-model="vintage">
                        <option value="" disabled selected>ไม่เลือกปีที่ผลิต</option>
                        <option v-for="option in years" :key="option" :value="option" class="option">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div class="col-3 text-start">
                    <label class="form-label">ขนาดบรรจุภัณฑ์</label>
                    <select id="idSelect" name="id" class="search-input" v-model="bottleSize">
                        <option v-for="option in bottleSizes" :key="option.Id" :value="option.EnumName" class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                </div>
                <div class="col-1">
                    <!-- <label for="" class="form-label"></label> -->
                    <div class="search-button">
                        <button class="btn-search" @click="onSearchClick">ค้นหา</button>
                    </div>
                </div>
            </div>
            <div class="upload-card text-center">
                <input type="file" class="image-input" id="image-input" accept="image/*"
                    @change="onImageSearch($event)">
                <label for="image-input" class="upload-label">
                    <img src="../assets/img/upload-icon.png" alt="" class="upload-icon">
                    <h3>ค้นหาโดยใช้รูป</h3>
                    <p>วางไฟล์รูปตรงนี้ หรือ เลือกไฟล์รูป *** ขนาดไม่น้อยกว่า640x640 พิกเซล ***</p>
                </label>

            </div>
        </div>
        <div class="list-header-card" v-if="wineSearch.length > 0">
            <p class="list-header">รายการไวน์</p>
            <div class="list-icons">
                <img src="../assets/img/list-icon.png" alt="" @click="setViewMode('list')"
                    :class="{ active: viewMode === 'list' }" style="margin-right: 10px;">
                <img src="../assets/img/grid-icon.png" alt="" @click="setViewMode('grid')"
                    :class="{ active: viewMode === 'grid' }">
            </div>
        </div>
        <div class="search-result-session" v-if="wineSearch.length > 0">
            <div v-if="viewMode === 'list'">
                <div v-for="wine in wineSearch" :key="wine.id" class="wine-detail-card">
                    <div class="row">
                        <div class="col-lg-2 d-flex justify-content-center align-items-center">
                            <div class="search-image-card">
                                <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.Path}`" alt=""
                                    class="search-image">
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
                            <p class="form-label">ประเทศที่ผลิต</p>
                            <p class="wine-detail-text">{{ wine.Country }}</p>
                            <p class="form-label">มาตรฐาน</p>
                            <p class="wine-detail-text">{{ wine.ClassDescription }}</p>
                        </div>
                        <div class="col-lg-3">
                            <div class="price-col">
                                <div class="d-flex justify-content-between">
                                    <label class="form-label text-start"
                                        style="margin-bottom: 0px;">มูลค่าเบื้องต้น</label>
                                    <div v-if="wine.RecommendMinPrice === 0">
                                        <p v-if="isEdit === false" class="red-text text-end"
                                            style="font-size: 18px; font-weight: 700; margin: 10px 0px 0px 0px;">
                                            ไม่พบราคาในระบบ
                                            <img src="../assets/img/price-edit-icon.png" alt="" class="price-edit-icon"
                                                style="cursor: pointer;" @click="onEditPriceClick(wine.Id)">
                                        </p>
                                        <div v-else>
                                            <input type="text" class="price-input text-end" v-model="wine.newPrice">
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p class="wine-price text-end" style="margin-top: 10px; margin-bottom: 0px;">{{
                                            formatNumber(wine.RecommendMinPrice) }} บาท</p>
                                        <p class="tax-text text-end" style="margin-bottom: 0px;">Excl. 7% sales tax</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label class="form-label text-start">ปริมาตรสุราทั้งหมด(ลิตร)</label>
                                    <p class="wine-price text-end" style="margin: 10px 0px;">{{ wine.wineLiter }}ลิตร
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label class="form-label text-start">จำนวนขวด</label>
                                    <div class="quantity-count">
                                        <button class="btn-count" @click="decreaseQuantity(wine.Id)">-</button>
                                        <input type="text" class="quantity-input text-center" v-model="wine.quantity"
                                            disabled>
                                        <button class="btn-count" @click="increaseQuantity(wine.Id)"
                                            :disabled="wine.wineLiter >= 10">+</button>
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
                            <input type="file" class="image-input" id="file-input" accept="application/pdf,image/*"
                                @change="uploadWineFile($event, wine.Id)">
                            <label for="file-input" class="upload-label" style="cursor: pointer;">
                                <div v-if="wine.fileName">
                                    <img v-if="wine.fileType === 'application/pdf'" src="../assets/img/pdf-icon.png"
                                        alt="" class="after-upload-image">
                                    <img v-else src="../assets/img/after-upload-icon.png" alt=""
                                        class="after-upload-image">
                                    <p v-if="wine.fileType === 'application/pdf'" class="upload-header">อัพโหลดไฟล์แล้ว
                                    </p>
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
            <div v-if="viewMode === 'grid'">
                <div v-for="group in groupedWineSearch" :key="group[0].id" class="row" style="margin-bottom: 20px;">
                    <div v-for="wine in group" :key="wine.id" class="col-4">
                        <div class="wine-grid-card">
                            <div class="row">
                                <div class="col-5 d-flex justify-content-center align-items-center">
                                    <div class="search-image-card">
                                        <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.Path}`"
                                            alt="" class="search-image">
                                    </div>
                                </div>
                                <div class="col-7" style="margin-top: 20px;">
                                    <div class="category text-start">
                                        <p class="category-name"><span class="category-icon"><img
                                                    src="../assets/img/wine-img1.png" class="category-image"></span>{{
                                            wine.CategoryName }}</p>
                                    </div>
                                    <div class="year text-start">
                                        <p class="form-label">ปีที่ผลิต <span class="wine-detail-text">{{ wine.Year
                                                }}</span></p>
                                    </div>
                                    <div class="wine-name text-start">{{ wine.WineName }}</div>
                                </div>
                            </div>
                            <div style="margin: 0px 20px 20px 20px;">
                                <div class="row">
                                    <div class="col-5 text-start">
                                        <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                        <p class="wine-detail-text">{{ wine.AVB }} %</p>
                                    </div>
                                    <div class="col-7 text-start">
                                        <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                                        <p class="wine-detail-text">{{ wine.BottleSize }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-5 text-start">
                                        <p class="form-label">ประเทศที่ผลิต</p>
                                        <p class="wine-detail-text">{{ wine.Country }}</p>
                                    </div>
                                    <div class="col-7 text-start">
                                        <p class="form-label">มาตรฐาน</p>
                                        <p class="wine-detail-text">{{ wine.ClassDescription }}</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label class="form-label text-start"
                                        style="margin-right: 30px;">มูลค่าเบื้องต้น</label>
                                    <div>
                                        <div v-if="wine.RecommendMinPrice === 0">
                                            <p v-if="isEdit === false" class="red-text"
                                                style="font-size: 18px; font-weight: 700;">ไม่พบราคาในระบบ</p>
                                            <div v-else>
                                                <input type="text" class="price-input" v-model="wine.newPrice">
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p class="wine-price" style="margin-top: 10px; margin-bottom: 0px;">{{
                                                formatNumber(wine.RecommendMinPrice) }} บาท</p>
                                            <p class="tax-text text-end">Excl. 7% sales tax</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label class="form-label text-start"
                                        style="margin: 0px 0px 16px 0px; ">ปริมาตรสุราทั้งหมด(ลิตร)</label>
                                    <p class="wine-price">{{ wine.wineLiter }}ลิตร</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <label class="form-label text-start">จำนวนขวด</label>
                                    <div class="quantity-count">
                                        <button class="btn-count" @click="decreaseQuantity(wine.Id)">-</button>
                                        <input type="text" class="quantity-input text-center" v-model="wine.quantity"
                                            disabled>
                                        <button class="btn-count" @click="increaseQuantity(wine.Id)">+</button>
                                    </div>
                                    <!-- <div class="d-flex justify-content-end"> -->
                                    <button class="btn-add-to-cart" @click="onAddToCartClick(wine.Id)"
                                        :disabled="totalLiters + wine.wineLiter > 10">เพิ่มเข้าตะกร้า</button>
                                    <!-- </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
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
        <div v-if="imageSearchModal" class="image-search-modal">
            <div class="modal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <p class="form-label fw-bold text-start" style="margin-bottom: 10px;">ค้นหาด้วยรูปภาพ</p>
                        <div class="image-search-list">
                            <div v-if="algoliaImageResults.length > 0">
                                <div v-for="result in algoliaImageResults" :key="result.objectID">
                                    <div class="image-search-results"
                                        @click="onImageResultClick(result.name, result.alcohol)">
                                        <div class="result-name d-flex align-items-center">
                                            <img :src="result.image_label" alt="" class="bottle-image">
                                            <p class="wine-name text-start" style="margin-bottom: 0px;">{{ result.name
                                                }}</p>
                                        </div>
                                        <div class="result-country">
                                            <p class="country-text">{{ result.country }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <button class="btn-back" @click="onModalCancelClick">ปิด</button>
                        </div>
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
import { ref, onMounted, computed, watch } from 'vue'
// import slider from 'vue3-slider'
// import 'vue-slider-component/theme/default.css'
import algoliasearch from 'algoliasearch';
import { BroadcastChannel } from 'broadcast-channel';
import { getWineSearch, getBottleSize, uploadWineSearchImage } from '@/api/getWineSearch.js'
import { uploadFileV4 } from '@/api/uploadFile.js';
import router from '@/router/router';

export default {
    // components: {
    //     slider
    // },

    setup() {
        const wineName = ref('')
        const vintage = ref('')
        const location = ref('')
        const avb = ref('')
        const bottleSize = ref('')
        const bottleCode = ref('')
        const currencyCode = ref('THB')
        const uid = ref('')
        const wineSearch = ref([])
        const wineQuantity = ref(1)
        // const wineLiter = ref(0)
        const viewMode = ref('list')

        // const query = ref('');
        const hits = ref([]);
        const enumGroup = ref('BottleSize')
        const bottleSizes = ref([])
        const searchObject = ref('')
        const wineImage = ref('')
        const autocompleteResults = ref([])
        const algoliaResults = ref([])
        const isEdit = ref(false)
        // const fileType = ref('')
        // const fileUrl = ref('')
        const years = ref([])

        const spinner = ref(false)
        const notFoundAlert = ref(false)
        const addedCartItems = ref([])
        const totalLiters = ref(0)
        const wineNameFromImage = ref('')
        const algoliaImageResults = ref([])
        const imageSearchModal = ref(false)
        const token = ref('')

        const cartChannel = new BroadcastChannel('cart_channel');

        const channel = new BroadcastChannel("cart_channel");
        channel.onmessage = (event) => {
            console.log(event.data)
            addedCartItems.value = JSON.parse(localStorage.getItem('cartItems'))

            totalLiters.value = addedCartItems.value.reduce((sum, item) => {
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)'
                    ? extractBottleSizeMl(item.BottleSize) / 1000
                    : extractBottleSizeL(item.BottleSize);
                return sum + (bottleSize * item.quantity);
            }, 0);

            console.log(`Total Liters: ${totalLiters.value}`);
        }

        const setViewMode = (mode) => {
            viewMode.value = mode
        }

        const onWineNameSearch = async (event) => {
            if (event) {
                wineName.value = event.target.value;
                imageSearchModal.value = false
                wineImage.value = ''
                wineNameFromImage.value = ''
            }
            if (wineName.value) {
                await algoliaSearch();
            } else {
                algoliaResults.value = [];
            }
        };

        const algoliaSearch = async () => {
            if (wineName.value) {
                const client = algoliasearch('Q3BB077ZJ4', 'e25233448e08e7b8babe79599f43c5c0');
                const index = client.initIndex('wine_index');
                const { hits } = await index.search(wineName.value);
                algoliaResults.value = hits;
                console.log("Algolia search result:", algoliaResults.value);
            }
            if (wineNameFromImage.value) {
                const client = algoliasearch('Q3BB077ZJ4', 'e25233448e08e7b8babe79599f43c5c0');
                const index = client.initIndex('wine_index');
                // const keyword = extractKeyword(wineNameFromImage.value);
                const { hits } = await index.search(wineNameFromImage.value);
                algoliaImageResults.value = hits;
                console.log("Algolia search result:", algoliaImageResults.value);
                if (algoliaImageResults.value.length === 0) {
                    await showNotFoundAlert()
                }
                else {
                    imageSearchModal.value = true
                }
            }
        };

        const selectWine = (value) => {
            wineName.value = value
            autocompleteResults.value = []
            algoliaResults.value = []
            wineImage.value = ''
        };

        watch(bottleSize, (selectedBottleSize) => {
            if (selectedBottleSize) {
                const selected = bottleSizes.value.find(option => option.EnumName === bottleSize.value);
                bottleCode.value = selected ? selected.EnumCode : ''
                console.log("Bottle Code :", bottleCode.value)
                algoliaResults.value = []
            }
        })

        const onSearchClick = async () => {
            spinner.value = true
            const wineSearchData = await getWineSearch(wineName.value, vintage.value, location.value, avb.value, bottleSize.value, bottleCode.value, currencyCode.value, uid.value)
            console.log("Wine Search Data:", wineSearchData)
            if (wineSearchData.code === 404) {
                spinner.value = false
                await showNotFoundAlert()
            }
            else if (wineSearchData.statusCode === 500) {
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
                console.log("Updated wine search array:", wineSearch.value)
                spinner.value = false
            }
        }

        const onImageSearch = async (event) => {
            algoliaResults.value = []
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

        const onImageResultClick = async (name, alc) => {
            imageSearchModal.value = false
            spinner.value = true
            wineName.value = name
            avb.value = alc
            // const bottle = ''
            // const bCode = ''
            const wineSearchData = await getWineSearch(wineName.value, vintage.value, location.value, avb.value, bottleSize.value, bottleCode.value, currencyCode.value, uid.value)
            console.log("Wine Search Data:", wineSearchData)
            if (wineSearchData === 500) {
                console.log("This is code 500!!!!!!!!!")
                spinner.value = false
                await showNotFoundAlert()
            }
            else if (wineSearchData.code === 404) {
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
                console.log("Updated wine search array:", wineSearch.value)
                spinner.value = false
            }
        }

        const onModalCancelClick = () => {
            algoliaImageResults.value = []
            imageSearchModal.value = false
        }

        const showNotFoundAlert = async () => {
            notFoundAlert.value = true;
            setTimeout(() => {
                notFoundAlert.value = false;
            }, 5000);
        };

        const decreaseQuantity = (wineId) => {
            console.log("Wine id to decrease:", wineId)
            const wine = wineSearch.value.find(w => w.Id === wineId);
            console.log("Decrease wine:", wine)
            if (wine && wine.quantity > 1) {
                wine.quantity--;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
            }
            // cartChannel.postMessage ("It's new item adding to cart")
        }

        const increaseQuantity = (wineId) => {
            console.log("Wine id to increase:", wineId)
            const wine = wineSearch.value.find(w => w.Id === wineId);
            console.log("Increase wine:", wine)
            if (wine) {
                if (totalLiters.value + wine.wineLiter <= 10) {
                    wine.quantity++;
                    wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;

                }
            }
            // cartChannel.postMessage ("It's new item adding to cart")
        }

        const onEditPriceClick = (wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            isEdit.value = true

            return { ...wine, newPrice: 0, uploadFile: '', fileType: '' };
        }

        const onFileUpload = (event, wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            wine.uploadFile = event.target.files[0]
            wine.fileType = event.target.files[0].type
            console.log("Uploaded file:", wine.uploadFile)
        }


        const onPriceConfirmClick = (wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            wine.RecommendMinPrice = wine.newPrice
            console.log("Wine after confirm price :", wine)
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
                console.log('File uploaded successfully:', data);
                wine.uploadFile = data.data.publicURL;
                wine.fileType = data.data.contentType;
                wine.fileName = file.name; // Store the file name
            } catch (error) {
                console.error('Error uploading file:', error);
            }
            spinner.value = false;
        };

        const onAddToCartClick = async (wineId) => {

            const newObject = wineSearch.value.find(w => w.Id === wineId);
            console.log("508", totalLiters.value, newObject.wineLiter);
            if (totalLiters.value + newObject.wineLiter < 10) {
                console.log("New object:", newObject)
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                console.log("Cart items to save to localstorage :", localStorage.getItem('cartItems'))
                const existingItemIndex = cartItems.findIndex(item => item.Id === newObject.Id);

                // const existingItem = itemsArray.value.find(i => 
                //     i.Id === newObject.Id &&
                //     i.InitialValue === newObject.RecommendMinPrice &&
                //     i.WineLiquor.Country === newObject.Country &&
                //     i.WineLiquor.DisplayName === newObject.WineName &&
                //     i.WineLiquorPic.WineLiquorYear === item.Year
                // );

                if (existingItemIndex !== -1) {
                    cartItems[existingItemIndex].quantity += newObject.quantity;
                } else {
                    cartItems.push(newObject);
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                localStorage.setItem('totalLitersToShow', totalLiters.value)

                cartChannel.postMessage("It's new item adding to cart")
            }
            else {
                console.log("Cannot add more than 10 liters")
            }
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

        const fetchBottleSizes = async () => {
            const fetchSizes = await getBottleSize(enumGroup.value);
            bottleSizes.value = fetchSizes.data
            bottleSize.value = fetchSizes.data[0].EnumName
            console.log("BottleSize :", bottleSize.value)
        }

        const groupedWineSearch = computed(() => {
            const groups = [];
            for (let i = 0; i < wineSearch.value.length; i += 3) {
                groups.push(wineSearch.value.slice(i, i + 3));
            }
            return groups;
        })

        const handleClickOutside = () => {
            algoliaResults.value = [];
            autocompleteResults.value = [];
        };

        const onOkayClick = () => {
            notFoundAlert.value = false
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

        // const extractKeyword = (wineName) => {
        //     const words = wineName.split(' ');
        //     // return wineName.split(' ')[0]; // Extract the first word
        //     return words.slice(0, 2).join(' '); // Extract the first two words
        // };

        onMounted(() => {
            fetchBottleSizes();
            generateYearsArray();

            token.value = localStorage.getItem('token')

            addedCartItems.value = JSON.parse(localStorage.getItem('cartItems'))
            if (addedCartItems.value && addedCartItems.value.length > 0) {
                totalLiters.value = addedCartItems.value.reduce((sum, item) => {
                    const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)'
                        ? extractBottleSizeMl(item.BottleSize) / 1000
                        : extractBottleSizeL(item.BottleSize);
                    return sum + (bottleSize * item.quantity);
                }, 0);
            }
        })

        watch(
            () => router.currentRoute.value.query.sessionExpired
            , (newValue) => {
                console.log(newValue);
                if (newValue) {
                    alert("เซสชั่นหมดอายุ");
                    router.push("/");
                    // You can also trigger any other action here
                }
            });

        return {
            wineSearch,
            wineName,
            vintage,
            bottleSize,
            bottleSizes,
            wineQuantity,
            hits,
            searchObject,
            wineImage,
            autocompleteResults,
            algoliaResults,
            viewMode,
            groupedWineSearch,
            isEdit,
            spinner,
            years,
            totalLiters,
            notFoundAlert,
            imageSearchModal,
            algoliaImageResults,
            setViewMode,
            onWineNameSearch,
            selectWine,
            onSearchClick,
            decreaseQuantity,
            increaseQuantity,
            onEditPriceClick,
            onFileUpload,
            uploadWineFile,
            onPriceConfirmClick,
            onAddToCartClick,
            onImageSearch,
            handleClickOutside,
            formatNumber,
            onOkayClick,
            onModalCancelClick,
            onImageResultClick
        }
    }
}
</script>

<style scoped>
.custom-container {
    padding: 15px 40px;
}

.search-card {
    margin-top: 20px;
    width: 100%;
    height: auto;
    padding: 30px 70px;
    box-shadow: 0px 3px 6px #00000080;
    border-radius: 14px;
}

.upload-card {
    margin: 25px 0px;
    padding: 20px;
    border: 1px dashed #2B476D;
    border-radius: 7px;
    cursor: pointer;
}

.upload-card h3 {
    color: #2B476D;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 20px;
}

.upload-card p {
    color: #2B476D;
    font-size: 14px;
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

.price-range {
    /* display: flex; */
    margin-top: 15px;
    /* vertical-align: middle; */
}

.price-range label {
    color: #2B476D;
    font-size: 18px;
    font-weight: 700;
}

.price-range input {
    width: 155px;
    height: 38px;
    border: 1px solid #2B476D;
    border-radius: 5px;
    margin: 0px 10px;
}

.wine-image-session {
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
}

.wine-image {

    margin: 5px;
    box-shadow: 0px 3px 6px #00000080;
    border-radius: 11px;
}

.search-button {
    display: flex;
    justify-content: flex-end;
    /* align-items: baseline; */
    padding-top: 32px;
}

.btn-search {
    font-family: "Prompt", sans-serif;
    width: 145px;
    height: 45px;
    background: #2B476D 0% 0% no-repeat padding-box;
    color: #FFFFFF;
    border: none;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
}

.list-header-card {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    background-color: #2B476D;
    width: 100%;
    height: 80px;
    box-shadow: 0px 3px 6px #00000080;
    border-radius: 14px;
    margin-top: 20px;
    padding: 20px 30px;
}

.list-header {
    font-family: "Prompt", sans-serif;
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 700;
    margin-top: 4px;
}

.list-icons {
    display: flex;
}

.wine-detail-card {
    width: 100%;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
    margin: 20px 0px;
}

.wine-grid-card {
    padding: 20px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.grid-view {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.search-result-session {
    margin-top: 20px;
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
    z-index: 90;
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

.bottle-image {
    width: 50px;
    height: auto;
    margin-right: 10px;
    /* padding: 10px;
  box-shadow: 0px 3px 6px #00000065;
border-radius: 6px; */
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
    padding: 30px 50px;
    margin-top: 20%;
    border: none !important;
    width: 850px;
    text-align: center;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
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

.image-search-list {
    max-height: 500px;
    overflow-y: auto
}
</style>