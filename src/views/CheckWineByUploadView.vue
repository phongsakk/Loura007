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

        <div v-for="wine in itemsArray" :key="wine.Id">
            <div v-if="wine.IsStatus !== -1">
                <div v-if="checkingWine?.Id === wine.Id && wineSearch.length > 0">
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
                                                <button class="btn-count" @click="decreaseQuantity(wine.Id)">-</button>
                                                <input type="text" class="quantity-input text-center"
                                                    v-model="wine.quantity" disabled>
                                                <button class="btn-count" @click="increaseQuantity(wine.Id)">+</button>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-end" style="margin-top: 20px;">
                                            <button class="btn-add-to-cart"
                                                @click="onAddToCartClick(wine)">ตรวจสอบไวน์</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
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
                                                    class="category-image"></span>{{ wine.WineLiquor.CategoryLabel
                                            }}
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
                                        <p style="margin-bottom: 0px;">alc. {{ wine.WineLiquorPic.Alcohol === 0 ?
                                            wine.Avb : wine.WineLiquorPic.Alcohol }} % vol.</p>
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
                                <p class="price-text" style="margin-bottom: 0px;">
                                    {{ formatNumber(wine.InitialValue) }} บาท
                                </p>

                                <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                                <label class="form-label bold">
                                    รวมภาษีทั้งสิ้น
                                </label>
                                <p class="price-text" style="margin-bottom: 0px;">
                                    {{ formatNumber(wine.TotalTax) }} บาท
                                </p>
                                <p class="form-label" style="margin-bottom: 0px;">
                                    จำนวน {{ wine.WineLiquorTotal }} ขวด
                                </p>
                                <div v-if="wine.IsStatus === 2">
                                    <button v-if="wine.isIncorrectWine || wine.CartItemIdRef" class="btn-checked-incorrect">ไม่พบไวน์ในระบบ</button>
                                    <button v-else class="btn-checked-correct">ตรวจสอบสุราเรียบร้อยแล้ว</button>
                                </div>
                                <div v-else>
                                    <button class="btn-scan" @click="onScanClick(wine)"><img
                                            src="../assets/img/scan-icon.png" alt="" class="scan-icon">สแกนฉลาก</button>
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
                                <div class="image-search-results" @click="onImageResultClick(result)">
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getCartItem, uploadWineSearchImage, getWineSearch, updateCart, getWineInfo } from '@/api/getWineSearch'
import { getBottleSize } from '@/api/getWineSearch.js'
import { getEnumGroup } from '@/api/getMaster'
import algoliasearch from 'algoliasearch';
import QRCode from 'qrcode';
import Toast from '@/js/Toast'

export default {
    setup() {
        const router = useRouter()

        const cartItems = ref([])
        const itemsArray = ref([])
        const importCartId = ref('')
        const token = ref('')

        const importPurposeList = ref([])
        const importPurpose = ref('')
        const checkpointList = ref([])
        const checkpoint = ref('')
        const importDate = ref('')
        const uploadModal = ref(false)
        const wineImage = ref('')
        const wineNameFromImage = ref('')
        const algoliaImageResults = ref([])
        const wineSearch = ref([])
        const bottleSizes = ref([])
        const bottleSize = ref('')
        const bottleCode = ref('')

        // const currencyCode = ref('THB')
        const years = ref([])

        const addArray = ref([]);
        const updateArray = ref([]);
        const removeArray = ref([]);

        const spinner = ref(false)
        const notFoundAlert = ref(false)

        const totalLiter = ref(0)
        const totalQty = ref(0)
        const totalInitialValue = ref(0)
        const totalTaxAll = ref(0)

        const checkingWine = ref(null);

        watch(cartItems, () => {
            calculateSummary(cartItems.value.Items.filter((item) => (item.IsStatus !== -1)));
        });

        const onScanClick = (wine) => {
            checkingWine.value = wine;
            uploadModal.value = true
            algoliaImageResults.value = []
            window.scrollTo(0, 0)
        }

        const onUploadClick = async (event) => {
            spinner.value = true
            const selectedImage = event.target.files[0]
            wineImage.value = selectedImage
            if (wineImage.value) {
                const uploadImage = await uploadWineSearchImage(wineImage.value)
                wineNameFromImage.value = uploadImage.data[0].wine_name_display
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
            const client = algoliasearch('Q3BB077ZJ4', 'e25233448e08e7b8babe79599f43c5c0');
            const index = client.initIndex('wine_index');
            const { hits } = await index.search(wineNameFromImage.value);
            algoliaImageResults.value = hits;

            if (algoliaImageResults.value.length === 0) {
                uploadModal.value = false
                await showNotFoundAlert()
                checkingWine.value = null;
            }
        };

        const onImageResultClick = async (result) => {
            spinner.value = true;
            const wineSearchData = await getWineSearch(result.name, "", "", result.alcohol, bottleSize.value, bottleCode.value, "THB", "")
            if (wineSearchData.code === 404) {
                spinner.value = false;
            } else {
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
                spinner.value = false
                uploadModal.value = false
            }

            console.log({ check: checkingWine.value, items: itemsArray.value, search: wineSearch.value.length });
        }

        const decreaseQuantity = (wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            if (wine && wine.quantity > 1) {
                wine.quantity--;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
            }
        }

        const increaseQuantity = (wineId) => {
            const wine = wineSearch.value.find(w => w.Id === wineId);
            if (wine) {
                wine.quantity++;
                wine.wineLiter = wine.BottleSize === 'Bottle (750ml)' || wine.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(wine.BottleSize) / 1000) * wine.quantity : extractBottleSizeL(wine.BottleSize) * wine.quantity;
            }
        }

        const onAddToCartClick = (selectingWine) => {
            const check = checkingWine.value;
            const select = selectingWine;

            const sameName = check.WineLiquor.DisplayName == select.WineName;
            const sameYear = check.WineLiquorPic.WineLiquorYear == select.Year
            const sameAvb = check.Avb == select.AVB;
            const sameSize = check.BottleSize == select.BottleSize;
            const sameContry = check.WineLiquor.Country == select.Country;
            algoliaImageResults.value = [];
            wineSearch.value = [];
            const checkingId = checkingWine.value.Id
            checkingWine.value = null;

            if (sameName && sameYear && sameAvb && sameSize && sameContry) {
                check.IsStatus = 2;


                updateArray.value.push(check);
            } else {
                check.IsStatus = -1;


                const removedItem = { ...check };

                const changes = itemsArray.value.find(item => item.Id === check.Id);

                changes.Id = undefined;
                changes.WineLiquorId = select.WineLiquorId;
                changes.Year = select.Year;
                changes.WineLiquorTotal = select.quantity;
                changes.BottleSize = select.BottleSize;
                changes.RecommendMinPrice = select.RecommendMinPrice;
                changes.quantity = select.quantity;
                changes.AVB = select.AVB;
                changes.CartItemIdRef = checkingId

                const {
                    itemExciseTaxByTotal, itemExternalLocal,
                    itemExternalFund, itemExciseTaxByDuty,
                    itemExternalTotal
                } = calculateValues(changes);
                changes.ExciseTax = itemExciseTaxByTotal;
                changes.LocalTax = itemExternalLocal;
                changes.Fund = itemExternalFund;
                changes.CustomsDuty = itemExciseTaxByDuty;
                changes.InitialValue = select.RecommendMinPrice;
                changes.TotalTax = itemExternalTotal

                changes.IsStatus = 2;
                changes.isIncorrectWine = true
                changes.WineLiquorPic = {
                    Path: select.Path,
                    WineLiquorYear: select.Year,
                    Alcohol: select.AVB
                }
                changes.WineLiquor = {
                    CategoryLabel: select.Color,
                    DisplayName: select.WineName,
                    Country: select.Country,
                }

                addArray.value.push(changes);

                itemsArray.value.push(removedItem);
                removeArray.value.push(removedItem);
            }
        }

        const onPreviousClick = () => {
            router.push({ name: 'import-wine-list-in-cart', params: { cartId: importCartId } })
        }

        const onSaveClick = async () => {
            spinner.value = true;
            const haveToAdd = addArray.value.length > 0;
            const haveToRemove = removeArray.value.length > 0;
            const haveToUpdate = updateArray.value.length > 0;
            if (haveToAdd || haveToRemove || haveToUpdate) {
                const UpdateBody = {
                    IsStatus: 1,
                    Remove: undefined,
                    Add: undefined,
                    Update: undefined,
                }

                if (haveToAdd) {
                    UpdateBody.Add = addArray.value;
                }

                if (haveToRemove) {
                    UpdateBody.Remove = removeArray.value;
                }

                if (haveToUpdate) {
                    UpdateBody.Update = updateArray.value;
                }

                const AllSets = itemsArray.value.every((item) => item.IsStatus === 2 || item.IsStatus === -1);
                if (AllSets) {
                    UpdateBody.IsStatus = 2;
                }

                try {
                    await updateCart(UpdateBody, importCartId.value, token.value);
                    Toast.fire({
                        icon: "success",
                        title: 'แจ้งเตือน',
                        text: 'บันทึกการเปลี่ยนแปลงสำเร็จ'
                    })
                    router.push('/import-wine-list');
                } catch (error) {
                    console.error("Error updating cart:", error);
                    Toast.fire({
                        icon: "error",
                        title: 'ผิดพลาด',
                        text: 'เกิดข้อผิดพลาดระหว่างบันทึกการเปลี่ยนแปลง'
                    })
                }

                console.log("UpdateBody:", UpdateBody);
            } else {
                Toast.fire({ icon: "warning", title: "Warning", text: "ไม่มีการเปลี่ยนแปลงที่ต้องบันทึก" });
                return;
            }

            spinner.value = false;
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

        const calculateValues = (item) => {
            const taxByPrice = 5;
            const taxByValue = 1000;
            const taxByFund = 1.175;

            const bottleSizeToCalculate = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
            const itemExciseTaxByDuty = item.RecommendMinPrice * 0 * 0.01;
            const itemExciseTaxByValue = (item.AVB / 100) * bottleSizeToCalculate * taxByValue;
            const itemCalTaxByDuty = (item.RecommendMinPrice + itemExciseTaxByDuty) * (taxByPrice / 100);
            const itemCalTaxByValue = itemExciseTaxByValue * taxByFund * (taxByPrice / 100);
            const itemCalTaxByFund = 1 - taxByFund * (taxByPrice / 100);
            // console.log({ bottleSizeToCalculate, itemExciseTaxByValue, itemCalTaxByDuty, itemCalTaxByValue, itemCalTaxByFund })
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

        const calculateSummary = (Items) => {
            // console.log("Calculate summary:", Items);
            totalLiter.value = Items?.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                return acc + (q * (cur.BottleSize === 'Bottle (750ml)' || cur.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(cur.BottleSize) / 1000 : extractBottleSizeL(cur.BottleSize)));
            }, 0)
            totalQty.value = Items?.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                return acc + q;
            }, 0);
            totalInitialValue.value = Items?.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                const value = cur.InitialValue || cur.RecommendMinPrice;
                return acc + (q * value)
            }, 0);
            totalTaxAll.value = Items?.reduce((acc, cur) => {
                const q = cur.WineLiquorTotal || cur.quantity;
                const t = cur.TotalTax || parseFloat(cur.externalTotal.replace(/,/g, ""));
                return acc + (q * t)
            }, 0);
        };

        const generateYearsArray = () => {
            const currentYear = new Date().getFullYear();
            years.value.push('NV');
            for (let year = currentYear; year >= currentYear - 200; year--) {
                years.value.push(year);
            }
            // years.value.reverse()
            return years;
        }

        const fetchCartItem = async () => {
            spinner.value = true
            const getCartData = await getCartItem(importCartId.value, token.value)
            const wg = [];
            for (const item of getCartData.data.Items) {
                wg.push(getWineInfo(item.WineLiquorId, item.WineLiquorPic.WineLiquorYear).then((wineInfo) => {
                    item.Avb = wineInfo.data.AVB;
                }));
            }
            await Promise.all(wg);
            cartItems.value = getCartData.data
            checkpoint.value = cartItems.value.ImportPurpose.Checkpoint
            importPurpose.value = cartItems.value.ImportPurpose.PurposeId
            importDate.value = new Date(cartItems.value.ImportPurpose.PurposeDate).toISOString().slice(0, 10)
            itemsArray.value = cartItems.value.Items;
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

        const fetchBottleSizes = async () => {
            const enumGroup = 'BottleSize'
            const fetchSizes = await getBottleSize(enumGroup);
            bottleSizes.value = fetchSizes.data
            bottleSize.value = fetchSizes.data[0].EnumName
            bottleCode.value = fetchSizes.data[0].EnumCode
        }

        const extractBottleSizeMl = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const extractBottleSizeL = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const formatNumber = (value) => {
            const floatValue = parseFloat(value);
            return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
            checkingWine,
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
            notFoundAlert,
            wineSearch,
            bottleSizes,
            years,
            totalLiter,
            totalQty,
            totalInitialValue,
            totalTaxAll,
            onAddToCartClick,
            addArray,
            onPreviousClick,
            onSaveClick,
            onDownloadQRCodeClick,
            formatNumber,
            decreaseQuantity,
            increaseQuantity
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