<template>
    <div>
        <nav class="navbar">
            <a class="navbar-brand" href="#" @click="onLogoClick">
                <img src="../assets/img/excise-logo.png" alt="" class="exise-logo" >
            </a>
            <div class="navbar-nav">
                <div class="d-flex align-items-center">
                    <div class="nav-item" v-if="userTypeId !== '21'">
                        <p class="cart-list">ปริมาณสุราในตะกร้า {{ totalLiters ? totalLiters : '0' }} /10 ลิตร</p>
                    </div>
                    <div class="nav-item menu-icon" v-if="userTypeId !== '21'">
                        <a class="cart-icon text-reset dropdown-toggle hidden-arrow" href="#" id="cartDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="../assets/img/cart-logo.png" alt="" class="nav-image">
                            <div v-if="cartItems && cartItems.length > 0">
                                <span class="badge">{{ cartItems ? cartItems.reduce( (sum, item) => sum + item.quantity, 0) : 0 }}</span>
                            </div>
                        </a>
                        <ul v-if="cartItems && cartItems.length > 0" class="dropdown-menu dropdown-menu-end" aria-labelledby="cartDropdown" style="width: 500px; max-height: 650px; overflow-y: auto; overflow-x: hidden; right: -100px; padding: 20px 10px;">
                            <li v-for="item in cartItems" :key="item.Id">
                                <div class="row" style="padding: 10px 20px;">
                                    <div class="col-4">
                                        <div class="cart-image text-center">
                                            <img :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${item.Path}`" alt="" class="wine-image">
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <p class="wine-name text-start">{{ item.WineName }}</p>
                                        <div class="d-flex justify-content-between">
                                            <p class="cart-label text-start">จำนวนขวด</p>
                                            <div class="quantity-count">
                                                <button class="btn-count" @click.stop="decreaseQuantity(item.Id)" :disabled="item.quantity <= 1">-</button>
                                                <input type="text" class="quantity-input text-center" v-model="item.quantity" disabled>
                                                <button class="btn-count" @click.stop="increaseQuantity(item.Id)" :disabled="totalLiters + (item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? (extractBottleSizeMl(item.BottleSize) / 1000) : extractBottleSizeL(item.BottleSize)) > 10.00">+</button>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <p class="cart-label text-start" style="margin-bottom: 5px;">มูลค่าเบื้องต้น</p>
                                            <p class="cart-label fw-bold text-end" style="margin-bottom: 5px;">{{ formatNumber(item.RecommendMinPrice) }} บาท</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <div style="padding:0px 20px;">
                                <hr class="divider-line">
                            </div>
                            <li >
                                <p class="view-all-cart-item text-center" @click="onCartClick">รายการไวน์ในตระกร้าทั้งหมด</p>
                            </li>
                        </ul>
                    </div>
                    <div class="nav-item menu-icon">
                        <a class="text-reset dropdown-toggle hidden-arrow" href="#" id="menuDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="margin-left: 10px; margin-right: 10px;">
                            <img src="../assets/img/menu-logo.png" alt="" class="nav-image">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
                            <li v-if="userTypeId === '21'">
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#" @click="onStampClosingClick">ตรวจสอบความถูกต้องของการปิดแสตมป์</a>
                            </li>
                            <li v-if="isLoggedIn && userTypeId !== '21'">
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#" @click="onImportLiquorListClick">รายการการนำเข้าสุรา</a>
                            </li>
                            <li>
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#">ตั้งค่าการแจ้งเตือน</a>
                            </li>
                            <li>
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#">ข้อกําหนดในการใช้งาน</a>
                            </li>
                            <li v-if="isLoggedIn">
                                <a class="dropdown-item dropdown-list menu-dropdown-item red-text" href="#" @click="onLogoutClick">ออกจากระบบ</a>
                            </li>
                            <li v-else>
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#" @click="onLoginClick">เข้าสู่ระบบ</a>
                            </li>
                        </ul>
                    </div>
                    <div class="nav-item menu-icon">
                        <a v-if="isLoggedIn" class="text-reset dropdown-toggle hidden-arrow" href="#" id="userProfileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="margin-right: 15px;">
                            <img src="../assets/img/userprofile-logo.png" alt="" class="nav-image">
                        </a>
                        <a v-else class="text-reset dropdown-toggle hidden-arrow" href="#" id="userProfileDropdown" role="button" aria-expanded="false" style="margin-right: 15px;">
                            <img src="../assets/img/userprofile-logo.png" alt="" class="nav-image">
                        </a>
                        <ul v-if="isLoggedIn" class="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileDropdown">
                            <li>
                                <div class="dropdown-item dropdown-list menu-dropdown-item d-flex justify-content-center">
                                    <div class="user-image">
                                        <img src="../assets/img/userprofile-icon-blue.webp" alt="" class="user-image-icon">
                                    </div>
                                    <div class="user-data">
                                        <p class="user-name text-start">{{ userName }}</p>
                                        <p class="email text-start"><img src="../assets/img/email-icon.png" alt="" class="nav-menu-icon">{{ emailAddress }}</p>
                                        <p class="email text-start"><img src="../assets/img/phone-icon.png" alt="" class="nav-menu-icon">{{ phoneNumber }}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUserProfile } from '@/api/getUserData'

export default {
    name: 'nav-bar',
    setup() {
        const router = useRouter()

        const cartItems = ref([])
        const totalLitersToShow = ref('')
        const userTypeId = ref('')
        const token = ref('')
        const userData = ref([])
        const userName = ref('')
        const emailAddress = ref('')
        const phoneNumber = ref('')
        const isLoggedIn = ref('')

        const onCartClick = () => {
            console.log("clicked");
            router.push('./your-cart')
        }

        const onLogoClick = () => {
            if ( userTypeId.value === '21') {
                router.push('/import-wine-list')
            }
            else {
                router.push('/')
            }
        }

        const onStampClosingClick = () => {
            router.push('/import-wine-list/check-the-correctness')
        }

        const onImportLiquorListClick = () => {
            router.push('/your-import-wine-list')
        }

        const onLogoutClick = () => {
            localStorage.clear()
            router.push('/login')
        }
       
        const onLoginClick = () => {
            localStorage.clear()
            router.push('/login')
        }

        const decreaseQuantity = (wineId) => {
            const index = cartItems.value.findIndex(item => item.Id === wineId);
            if (index !== -1 && cartItems.value[index].quantity > 1) {
                cartItems.value[index].quantity--;
                updateLocalStorage();
                cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
                // updateBroadcastChannel();
            }
        };

        const increaseQuantity = (wineId) => {
            const index = cartItems.value.findIndex(item => item.Id === wineId);
            if (index !== -1) {
                // const item = cartItems.value[index];
                // const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
                // const newTotalLiters = totalLiters.value + (bottleSize * item.quantity);
                // if (newTotalLiters <= 10) {
                    cartItems.value[index].quantity++;
                    updateLocalStorage();
                    cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
                    // updateBroadcastChannel();
                // }
            }
        };

        const updateLocalStorage = () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
            const totalLitersValue = cartItems.value.reduce((sum, item) => {
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
                return sum + (bottleSize * item.quantity);
            }, 0);
            localStorage.setItem('totalLitersToShow', totalLitersValue);
            totalLiters.value = totalLitersValue;
        };

        // const updateBroadcastChannel = () => {
        //     // const channel = new BroadcastChannel("cart_channel");
        //     channel.postMessage({ type: 'UPDATE_CART', cartItems: cartItems.value, totalLiters: totalLiters.value });
        // };

        const channel = new BroadcastChannel("cart_channel");
        channel.onmessage = (event) => {
            console.log(event.data)
            cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
            totalLitersToShow.value = localStorage.getItem('totalLitersToShow')
            // cartItems.value = event.data.cartItems;
            // totalLitersToShow.value = event.data.totalLiters;
        }

        const totalLiters = computed(() => {
            if (!cartItems.value || cartItems.value.length === 0) {
                return 0;
            }
            return cartItems.value.reduce((sum, item) => {
                const bottleSize = item.BottleSize === 'Bottle (750ml)' || item.BottleSize === 'Half Bottle (375ml)' ? extractBottleSizeMl(item.BottleSize) / 1000 : extractBottleSizeL(item.BottleSize);
                return sum + (bottleSize * item.quantity);
            }, 0);
        });

        const extractBottleSizeMl = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const extractBottleSizeL = (bottleSize) => {
            const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
            return match ? parseFloat(match[1]) : 0;
        }

        const fetchUserProfile = async () => {
            if (!token.value) {
                router.push('/login')
            }
            const getUserData = await getUserProfile(token.value)
            userData.value = getUserData.data
            console.log("User data :", getUserData.data.code)
            userName.value = userData.value.FirstName + ' ' + userData.value.LastName
            emailAddress.value = userData.value.Email
            phoneNumber.value = userData.value.Phone ? userData.value.Phone : userData.value.Mobile
        }

        const formatNumber = (value) =>{
            const floatValue = parseFloat(value);
            return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        onMounted ( async () => {
            userTypeId.value = localStorage.getItem('userTypeId')
            cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
            totalLitersToShow.value = localStorage.getItem('totalLitersToShow')
            token.value = localStorage.getItem('token')
            isLoggedIn.value = localStorage.getItem('isLoggedIn')

            await fetchUserProfile()
        })

        return {
            userTypeId,
            cartItems,
            totalLiters,
            totalLitersToShow,
            userName,
            emailAddress,
            phoneNumber,
            isLoggedIn,
            onLogoClick,
            onCartClick,
            onStampClosingClick,
            onImportLiquorListClick,
            onLogoutClick,
            onLoginClick,
            extractBottleSizeL,
            extractBottleSizeMl,
            formatNumber,
            decreaseQuantity,
            increaseQuantity
        }
    }
}
</script>

<style scoped>
.navbar {
    background-image: url('../assets/img/navbar-bg-image.png') ;
    background-size: 100% 100%;
    background-position: center;
    box-shadow: 0px 3px 6px #00000029;
    position: fixed;
    width: 100%;
    height: 100px !important;
    z-index: 990;
    padding-right: 50px;
}

.navbar-brand {
    padding-left: 30px;
    display: flex;
    align-items: center;
}

.exise-logo {
    height: 75px;
    width: auto;
}

.nav-image {
    width: 50px;
    height: auto;
}

.menu-icon {
    position: relative;
}

.navbar-nav .dropdown-menu {
    position: absolute;
    width: 400px;
    top: 50px;
    right: 0px;
    box-shadow: 0px 3px 6px #0000004D;
    border-radius: 10px;
}

.cart-icon {
    position: relative !important;
}

.badge {
    position: absolute;
    right: -10px !important;
    top: -12px !important;
    min-width: 20px;
    min-height: 10px;
    line-height: 10px;
    padding: 5px;
    color: #fff;
    background-color: #ED1C24;
    font-size: 10px;
    text-align: center;
    vertical-align: middle;
    border-radius: 15px;
}

.dropdown-item {
    color: #2B476D;
    font-size: 14px;
    font-weight: 700;
    padding: 20px;
}

.menu-dropdown-item:not(:last-child)::after {
    content: "";
    position: absolute;
    /* padding: 5px 0px; */
    left: 10px;
    right: 10px;
    border-bottom: 2px solid #A7A7A7 !important;
}

.hidden-arrow::after {
    display: none !important;
}

.cart-list {
    font-family: "Prompt", sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0px 20px;
}

.user-image {
    /* padding: 0px 20px; */
    margin-right: 30px;
}

.user-image-icon {
    width: 90px;
    height: 90px;
    margin-top: 10px;
}

.nav-menu-icon {
    width: 20px;
    height: auto;
    margin-right: 10px;
}

.user-name {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
}

.email {
    font-size: 12px;
    font-weight: 500;
    color: #898989;
}

.wine-name {
    font-size: 20px;
    color: #000000;
}

.cart-image {
    width: 125px;
    height: 125px;
    margin-right: 10px;
    box-shadow: 0px 3px 6px #00000065;
    border-radius: 6px;
    padding: 10px;

}

.wine-image {
    width: auto;
    height: 100%;
}

.cart-label {
    font-size: 16px;
    color: #2B476D;
}

.view-all-cart-item {
    font-size: 16px;
    font-weight: 700;
    color: #2B476D;
    text-decoration: underline;
    cursor: pointer;
    margin: 5px;
}

</style>