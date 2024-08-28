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
            <div v-if="wine.WineLiquorPic">
                <div class="product-card">
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
                                    <p class="category-name" style="margin-bottom: 0px;"><span
                                            class="category-icon"><img src="../assets/img/wine-img1.png"
                                                class="category-image"></span>{{
                                                    wine.WineLiquor?.CategoryLabel }}</p>
                                </div>
                                <div class="year">
                                    <p class="form-label" style="margin-bottom: 0px;">ปีที่ผลิต <span
                                            class="manu-year">{{
                                                wine.WineLiquorPic?.WineLiquorYear }}</span></p>
                                </div>
                            </div>
                            <div class="row text-start">
                                <p class="wine-name-display text-start">{{ wine.WineLiquor?.DisplayName }}</p>

                            </div>
                            <div class="row text-start">
                                <div class="col-3">
                                    <label class="form-label">ประเทศที่ผลิต</label>
                                    <p style="margin-bottom: 0px;">{{ wine.WineLiquorPic?.Country }}</p>
                                </div>
                                <div class="col-3">
                                    <label class="form-label">ปริมาณแอลกอฮอล์</label>
                                    <p style="margin-bottom: 0px;">alc. {{ wine.WineLiquorPic?.Alcohol }} % vol.</p>
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
                            <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.InitialValue) }} บาท
                            </p>
                            <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>
                            <label class="form-label bold">รวมภาษีทั้งสิ้น</label>
                            <p class="price-text" style="margin-bottom: 0px;">{{ formatNumber(wine.TotalTax) }} บาท</p>
                            <p class="form-label" style="margin-bottom: 0px;">จำนวน {{ wine.WineLiquorTotal }} ขวด
                            </p>
                            <div v-if="wine.QRCode">
                                <button class="btn-success">
                                    Success
                                </button>
                            </div>
                            <div v-else>
                                <button class="btn-scan" @click="onScanClick(wine.Id)"><img
                                        src="../assets/img/scan-icon.png" alt="" class="scan-icon">สแกนแสตมป์</button>
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
    <div class="upload-modal" v-if="uploadModal === true">
        <div class="modal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="image-search-list">
                        <div class="upload-session">
                            <qrcode-capture id="image-input" class="image-input"
                                @detect="onUploadClick"></qrcode-capture>

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
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCartItem, getStampList } from '@/api/getWineSearch'
import QRCode from 'qrcode';
import Toast from '@/js/Toast';
import { setPairStampBottle } from '@/api/getQRData';

export default {
    setup() {
        const router = useRouter()

        const importCartId = ref('')
        const token = ref('')

        const BottleId = ref(null);

        const cartItems = ref([])
        const importCheckpoint = ref('')
        const importPurpose = ref('')
        const importDate = ref('')
        const uploadModal = ref(false)

        const spinner = ref(false)

        const onScanClick = (wineId) => {
            BottleId.value = wineId;
            uploadModal.value = true;
            window.scrollTo(0, 0);
        }

        const onUploadClick = async (event) => {
            spinner.value = true;
            const SNNO = event[0]?.rawValue;
            if (SNNO) {
                console.log(cartItems.value.find((_i) => _i.Id === BottleId.value));
                await setPairStampBottle(BottleId.value, SNNO, token.value).then((response) => {
                    const tar = cartItems.value.find((_i) => _i.Id === BottleId.value);
                    tar.QRCode = SNNO;

                    console.log({ tar, response });

                    Toast.fire({ icon: "success", title: "สำเร็จ", text: "บันทึกแล้ว"})
                }).catch((err) => {
                    Toast.fire({ icon: "error", title: "แจ้งเตือน", text: err.message });
                });
                BottleId.value = null;
            } else {
                Toast.fire({ icon: "error", title: "แจ้งเตือน", text: "OrCode ไม่ถูกต้อง" })
            }
            uploadModal.value = false;
            spinner.value = false;
        }

        const onBackToHomeClick = () => {
            router.push('/import-wine-list')
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
            spinner.value = true
            const getCartData = await getCartItem(importCartId.value, token.value)
            importCheckpoint.value = getCartData.data.ImportPurpose.CheckpointLabel
            importPurpose.value = getCartData.data.ImportPurpose.PurposeLabel
            importDate.value = formatDate(getCartData.data.ImportPurpose.PurposeDate)
            cartItems.value = cartItems.value.map((cartItem) => {
                const filtered = getCartData.data.Items.find((_item) => _item.Id === cartItem.CartItemId);
                return {
                    ...filtered,
                    ...cartItem,
                }
            });
            spinner.value = false
        }

        const fetchStampList = async () => {
            const getStamps = await getStampList(importCartId.value, token.value)
            cartItems.value = getStamps.data

        }

        const totalLiters = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => {
                if (!item.BottleSize) {
                    return sum + 0;
                }
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
                return sum + (bottleSize * item.WineLiquorTotal);
            }, 0);
        });

        const totalQuantity = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => {
                if (!item.WineLiquorTotal) { return sum + 0 }
                return sum + (item.WineLiquorTotal)
            }, 0);
        });

        const totalInitialPrice = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => {
                if (!item.InitialValue) { return sum + 0 }
                return sum + ((item.InitialValue || 0) * (item.WineLiquorTotal || 0))
            }, 0);
        });

        const totalTaxAmount = computed(() => {
            return (cartItems.value || []).reduce((sum, item) => {
                if (!item.TotalTax) { return sum + 0 }
                return sum + ((item.TotalTax || 0) * (item.WineLiquorTotal || 0))
            }, 0);
        });

        const formatDate = (data) => {
            const date = new Date(data);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
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

        const onModalCancelClick = () => {
            uploadModal.value = false;
            BottleId.value = null;
        }

        onMounted(() => {
            importCartId.value = localStorage.getItem('importCartId')
            token.value = localStorage.getItem('token')
            fetchStampList().then(() => {
                fetchCartItem();
            });
        })

        return {
            cartItems,
            importCheckpoint,
            importPurpose,
            importDate,
            spinner,
            formatNumber,
            totalLiters,
            totalQuantity,
            totalInitialPrice,
            totalTaxAmount,
            uploadModal,
            onScanClick,
            onUploadClick,
            onBackToHomeClick,
            onDownloadQRCodeClick,
            onModalCancelClick
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

.scan-icon {
    width: auto;
    height: 15px;
    margin-right: 10px;
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
</style>