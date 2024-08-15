<template>
    <div class="forgot-password">
        <div class="forgot-password-card">
            <div class="sub-header text-center">รีเซตรหัสผ่าน</div>
            <form @submit.prevent="onConfirmClick">
            <div class="text-start">
                <label class="form-label mb-10">รหัสผ่านใหม่ <span class="required-text">*</span></label>
                <input type="password" class="form-input" v-model="newPassword" @input="() => errorText = ''" required>
                <label class="form-label mb-10">ยืนยันรหัสผ่านใหม่ <span class="required-text">*</span></label>
                <input type="password" class="form-input" v-model="confirmPassword"  @input="() => errorText = ''" required>
                <p v-if="errorText" class="error-text">{{ errorText }}</p>
            </div>
            <div class="buttons">
                <!-- <button class="btn-back" @click="onCancelClick">ยกเลิก</button> -->
                <button type="submit" class="btn-confirm">ยืนยัน</button>
            </div>
            </form>
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
import { resetPassword } from '@/api/getUserData'

export default {
    setup() {
        const router = useRouter()
        const newPassword = ref('')
        const confirmPassword = ref('')
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const errorText = ref('')
        const spinner = ref(false)

        const onConfirmClick = async() => {
            spinner.value = true
            const userData = {
                code : code,
                password : newPassword.value,
                password2 : confirmPassword.value
            }
            const getResetPassword = await resetPassword (userData)
            console.log("Reset Password :", getResetPassword.data);
            if ( getResetPassword.code === 400) {
                errorText.value = 'รหัสผ่านไม่เหมือนกัน'
                spinner.value = false
            }
            else {
                router.push('/login')
                spinner.value = false
            }
        }

        onMounted (() => {

        })

        return {
            newPassword,
            confirmPassword,
            errorText,
            spinner,
            onConfirmClick
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

.mb-10 {
    margin-bottom: 10px !important;
}
</style>