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
        <div class="product-card">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" class="table-header blue-text">ลำดับ</th>
                        <th scope="col" class="table-header blue-text text-start">ประเภทสินค้า</th>
                        <th scope="col" class="table-header blue-text text-start">ชื่อสินค้า</th>
                        <th scope="col" class="table-header blue-text">แบบ/รุ่น</th>
                        <th scope="col" class="table-header blue-text">ดีกรี/ปริมาณน้ำตาล CO2/น้ำหนัก/มวล</th>
                        <th scope="col" class="table-header blue-text">ขนาด</th>
                        <th scope="col" class="table-header blue-text">ปริมาณที่นำเข้า</th>
                        <th scope="col" class="table-header blue-text">ราคาที่ใช้เป็นฐาน ในการคำนานภาษี</th>
                        <!-- <th scope="col" class="table-header blue-text">หมายเหตุ</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(wine, index) in paginatedItems" :key="wine.Id">
                        <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                        <td class="text-start">{{ wine.WineLiquor.CategoryLabel }}</td>
                        <td class="text-start">{{ wine.WineLiquor.DisplayName }}</td>
                        <td>{{ wine.WineLiquorPic.WineLiquorYear }}</td>
                        <td>{{ wine.WineLiquorPic.Alcohol }}</td>
                        <td>{{ wine.BottleSize }}</td>
                        <td>{{ wine.WineLiquorTotal }} ขวด</td>
                        <td>{{ formatNumber(wine.InitialValue) }} บาท</td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination-session">
                <div class="items">
                    <span class="total-items">{{ totalItems }} รายการ</span>
                </div>
                <div class="pagination">
                    <div @click="firstPage" :disabled="currentPage <= 1" class="pagination-icon">
                        <img src="../assets/img/pagination-first-icon.png" alt="" class="action-icon">
                    </div>
                    <div @click="prevPage" :disabled="currentPage <= 1" class="pagination-icon">
                        <img src="../assets/img/pagination-previous-icon.png" alt="" class="action-icon">
                    </div>

                    <div v-for="page in pagesToShow" :key="page">
                        <span @click="goToPage(page)" :class="page === currentPage ? 'current-page' : 'not-current-page'">{{ page }}</span>
                    </div>
                    <div @click="nextPage" :disabled="currentPage * itemsPerPage >= cartItems.length" class="pagination-icon">
                        <img src="../assets/img/pagination-next-icon.png" alt="" class="action-icon">
                    </div>
                    <div @click="lastPage" :disabled="currentPage * itemsPerPage >= cartItems.length" class="pagination-icon">
                        <img src="../assets/img/pagination-last-icon.png" alt="" class="action-icon">
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCartItem } from '@/api/getWineSearch'

export default {
    setup() {
        const router = useRouter()

        const importCartId = ref('')
        const token = ref('')

        const cartItems = ref([])
        const importCheckpoint = ref('')
        const importPurpose = ref('')
        const importDate = ref('')

        const spinner = ref(false)

        const onBackToHomeClick = () => {
            router.push('/import-wine-list')
        }

        const fetchCartItem = async () => {
            spinner.value = true
            console.log("ImportCardId", importCartId.value)
            const getCartData = await getCartItem (importCartId.value, token.value)
            cartItems.value = getCartData.data.Items
            console.log('Cart data :', cartItems.value)
            importCheckpoint.value = getCartData.data.ImportPurpose.CheckpointLabel
            importPurpose.value = getCartData.data.ImportPurpose.PurposeLabel
            importDate.value = formatDate(getCartData.data.ImportPurpose.PurposeDate)
            spinner.value = false
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

        // const calculateTotalQuantity = (items) => {
        //     return items?.reduce((sum, item) => sum + item.WineLiquorTotal, 0);
        // };

        // const calculateTotalPrice = (items) => {
        //     return items?.reduce((sum, item) => sum + item.InitialValue * item.WineLiquorTotal, 0);
        // };

        const currentPage = ref(1);
        const itemsPerPage = ref(10);
        const totalItems = computed(() => cartItems.value.length);

        const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
        const endIndex = computed(() => startIndex.value + itemsPerPage.value);

        const paginatedItems = computed(() => {
            return cartItems.value.slice(startIndex.value, endIndex.value);
        });

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value * itemsPerPage.value < cartItems.value.length) {
                currentPage.value++;
            }
        };

        const firstPage = () => {
            if (currentPage.value > 1) {
                currentPage.value = 1;
            }
        }

        const lastPage = () => {
            if (currentPage.value * itemsPerPage.value < cartItems.value.length) {
                const totalPages = Math.ceil(cartItems.value.length / itemsPerPage.value);
                currentPage.value = totalPages;
            }
        }

        const pagesToShow = computed(() => {
            const totalPages = Math.ceil(cartItems.value.length / itemsPerPage.value);
            const currentPageNumber = currentPage.value;

            const pages = [currentPageNumber];

            if (currentPageNumber > 1) {
                pages.unshift(currentPageNumber - 1);
            }

            if (currentPageNumber < totalPages) {
                pages.push(currentPageNumber + 1);
            }

            return pages;
        });

        const goToPage = (page) => {
            currentPage.value = page;
        };

        onMounted (() => {
            importCartId.value = localStorage.getItem('importCartId')
            token.value = localStorage.getItem('token')

            fetchCartItem ();
        })

        return {
            cartItems,
            importCheckpoint,
            importPurpose,
            importDate,
            paginatedItems,
            itemsPerPage,
            prevPage,
            nextPage,
            firstPage,
            lastPage,
            currentPage,
            totalItems,
            pagesToShow,
            goToPage,
            spinner,
            formatNumber,
            totalLiters,
            totalQuantity,
            totalInitialPrice,
            totalTaxAmount,
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