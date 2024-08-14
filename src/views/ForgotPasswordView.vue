<template>
    <div class="forgot-password">
        <div class="forgot-password-card">
            <div class="sub-header text-center">Forgot Password</div>
            <div>
                <label class="form-label text-start">Enter your email</label>
                <input type="text" class="form-input" v-model="emailAddress">
            </div>
            <div class="buttons">
                <button class="btn-back" @click="onCancelClick">ย้อนกลับ</button>
                <button class="btn-confirm" @click="onConfirmClick">ยืนยัน</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { forgotPassword } from '@/api/getUserData'

export default {
    setup() {
        const router = useRouter()
        const emailAddress = ref('')

        const onConfirmClick = async () => {
            const currentUrl = window.location.href;
            const userData = {
                email: emailAddress.value,
                callbackUrl: currentUrl
            };
            const getForgotPassword = await forgotPassword(userData)
            console.log(getForgotPassword.value)
        }

        const onCancelClick = () => {
            router.push ('/login')
        }

        onMounted ( () => {

        })

        return {
            emailAddress,
            onConfirmClick,
            onCancelClick
        }
    }
}
</script>

<style scoped>
.forgot-password {
    background-image: url(../assets/img/login-background-image.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.forgot-password-card {
    background-color: #FFFFFF;
    padding: 70px;
    border: none !important;
    width: 550px;
    text-align: center;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    border-radius: 14px;
}

.buttons {
 margin-top: 30px;
}
</style>