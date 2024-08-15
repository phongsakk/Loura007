<template>
    <div class="forgot-password">
        <div class="forgot-password-card">
            <div class="sub-header text-center">ลืมรหัสผ่าน</div>
            <div>
                <label class="form-label mb-10">กรอกอีเมลของคุณเพื่อให้<br>ทางระบบส่งรหัสผ่านใหม่ไปให้</label>
                <input type="text" class="form-input" v-model="emailAddress">
            </div>
            <p v-if="emailErrorText" class="error-text text-start">{{ emailErrorText }}</p>
            <div class="buttons">
                <button class="btn-back" @click="onCancelClick">ยกเลิก</button>
                <button class="btn-confirm" @click="onConfirmClick">ยืนยัน</button>
            </div>
        </div>
    </div>
    <div v-if="emailSendSuccess" class="d-flex justify-content-center">
            <div class="email-success-alert">
                <div class="alert alert-primary" role="alert">
                    <p>ส่งอีเมลเรียบร้อยแล้ว</p>
                    <button @click="onOkayClick()" type="button">Ok</button>
                </div>
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
import { forgotPassword } from '@/api/getUserData'

export default {
    setup() {
        const router = useRouter()
        const emailAddress = ref('')
        const emailErrorText = ref('')
        const spinner = ref(false)
        const emailSendSuccess = ref(false)

        const onConfirmClick = async () => {
            spinner.value = true
            const currentUrl = window.location.origin + "/reset-password";
            const userData = {
                Email: emailAddress.value,
                CallbackUrl: currentUrl
            };

            const getForgotPassword = await forgotPassword(userData)
            console.log(getForgotPassword.value)
            if ( getForgotPassword.code === 400) {
                emailErrorText.value = 'ไม่พบข้อมูลอีเมลผู้ใช้งานนี้'
                spinner.value = false
            }
            else {
                spinner.value = false
                emailSendSuccess.value = true
            }
        }

        const onOkayClick = () => {
            emailSendSuccess.value = false
            router.push ('/login')
        }

        const onCancelClick = () => {
            router.push ('/login')
        }

        onMounted ( () => {

        })

        return {
            emailAddress,
            emailErrorText,
            spinner,
            emailSendSuccess,
            onConfirmClick,
            onCancelClick,
            onOkayClick
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

.email-success-alert {
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
</style>