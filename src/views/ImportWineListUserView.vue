<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการการนำเข้าไวน์</h1>
        </div>
        <div class="product-card">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" class="table-header blue-text">ลำดับ</th>
                        <th scope="col" class="table-header blue-text">วันที่ประมาณนำเข้า</th>
                        <th scope="col" class="table-header blue-text text-start">วัตถุประสงค์ในการนำเข้า</th>
                        <th scope="col" class="table-header blue-text">พิกัดนำเข้า</th>
                        <th scope="col" class="table-header blue-text">ปริมาณที่นำเข้า</th>
                        <th scope="col" class="table-header blue-text">ราคาที่ใช้เป็นฐาน ในการคำนานภาษี</th>
                        <th scope="col" class="table-header blue-text">สถานะ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(wine, index) in paginatedItems" :key="wine.Id">
                        <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                        <td style="text-decoration: underline; cursor: pointer;">{{ wine.ImportPurpose && wine.ImportPurpose.PurposeDate ? formatDate(wine.ImportPurpose.PurposeDate) : ''}}</td>
                        <td class="text-start" style="text-decoration: underline; cursor: pointer;">{{ wine.ImportPurpose && wine.ImportPurpose.PurposeLabel ? wine.ImportPurpose.PurposeLabel : ''}}</td>
                        <td>{{ wine.ImportPurpose && wine.ImportPurpose.CheckpointLabel ? wine.ImportPurpose.CheckpointLabel : '' }}</td>
                        <td>{{ calculateTotalQuantity(wine.WineLiquorTotal) }}  ขวด</td>
                        <td>{{ formatNumber(calculateTotalPrice(wine.InitialValue)) }} บาท</td>
                        <td>
                            <span v-if="wine.IsStatus === 0" class="red-text" >สุรายังไม่ถูกนำเข้า</span>
                            <span v-else class="blue-text">สุราถูกนำเข้าแล้ว</span>
                        </td>
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
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { getCartItem } from '@/api/getWineSearch'

export default {
    setup () {
        const cartId = ref('')
        const token = ref('')
        const cartItems = ref([])
        const items = ref([])

        const fetchCartItems = async() => {
            const getCartData = await getCartItem (cartId.value, token.value)
            cartItems.value = getCartData.data
            items.value = cartItems.value.Items
            console.log('Cart data :', items.value)
        }

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

        const calculateTotalQuantity = (items) => {
            return items?.reduce((sum, item) => sum + item.WineLiquorTotal, 0);
        };

        const calculateTotalPrice = (items) => {
            return items?.reduce((sum, item) => sum + item.InitialValue * item.WineLiquorTotal, 0);
        };

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

        onMounted ( async() => {
            // cartId.value = localStorage.getItem('cartId')
            token.value = localStorage.getItem('token')

            await fetchCartItems();
            console.log("CArt DAta ", cartItems.value)
        })

        return {
            cartItems,
            items,
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
            formatDate,
            formatNumber,
            calculateTotalQuantity,
            calculateTotalPrice
        }
    }
}
</script>