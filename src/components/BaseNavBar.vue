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
                    <div class="nav-item" v-if="userTypeId !== '21'">
                        <a class="cart-icon" href="#" role="button">
                            <img src="../assets/img/cart-logo.png" alt="" class="nav-image" @click="onCartClick">
                            <div v-if="cartItems && cartItems.length > 0">
                                <span class="badge">{{ cartItems ? cartItems.reduce( (sum, item) => sum + item.quantity, 0) : 0 }}</span>
                            </div>
                            <!-- <span class="badge" v-else>0</span> -->
                        </a>
                    </div>
                    <div class="nav-item menu-icon">
                        <a class="text-reset dropdown-toggle hidden-arrow" href="#" id="menuDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="margin-left: 10px; margin-right: 10px;">
                            <img src="../assets/img/menu-logo.png" alt="" class="nav-image">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
                            <li>
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#" @click="onImportLiquorListClick">รายการการนำเข้าสุรา</a>
                            </li>
                            <li>
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#">ตั้งค่าการแจ้งเตือน</a>
                            </li>
                            <li>
                                <a class="dropdown-item dropdown-list menu-dropdown-item" href="#">ข้อกําหนดในการใช้งาน</a>
                            </li>
                            <li>
                                <a class="dropdown-item dropdown-list menu-dropdown-item red-text" href="#" @click="onLogoutClick">ออกจากระบบ</a>
                            </li>
                        </ul>
                    </div>
                    <div class="nav-item">
                        <a class="" href="#" role="button" style="margin-right: 15px;">
                            <img src="../assets/img/userprofile-logo.png" alt="" class="nav-image">
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'nav-bar',
    setup() {
        const router = useRouter()

        const cartItems = ref([])
        const totalLitersToShow = ref('')
        const userTypeId = ref('')

        const onCartClick = () => {
            router.push('./your-cart')
        }

        const onLogoClick = () => {
            router.push('./')
        }

        const onImportLiquorListClick = () => {
            router.push('/import-wine-list')
        }

        const onLogoutClick = () => {
            localStorage.clear()
            router.push('/login')
        }

        const channel = new BroadcastChannel("cart_channel");
        channel.onmessage = (event) => {
            console.log(event.data)
            cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
            totalLitersToShow.value = localStorage.getItem('totalLitersToShow')
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

        onMounted (() => {
            userTypeId.value = localStorage.getItem('userTypeId')
            cartItems.value = JSON.parse(localStorage.getItem('cartItems'))
            totalLitersToShow.value = localStorage.getItem('totalLitersToShow')
        })

        return {
            userTypeId,
            cartItems,
            totalLiters,
            totalLitersToShow,
            onLogoClick,
            onCartClick,
            onImportLiquorListClick,
            onLogoutClick
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
</style>