<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">ลงทะเบียนผู้นำเข้าสุรา</h1>
        </div>
        <div v-if="showVerifyEmailCard" class="verify-email-card text-center">
            <h1 class="fw-bold">ยืนยันตัวตน</h1>
            <p class="email-text">กรุณากรอกรหัสยืนยันตัวตนของคุณ<br/>ที่ถูกส่งไปที่อีเมล {{ email }}</p>
            <input type="text" class="form-input" style="width: 370px;" v-model="verificationCode" onkeydown="return event.keyCode !== 69" maxlength="6" @input="restrictVerificationCode($event)">
            <p v-if="codeErrorText" class="error-text">{{ codeErrorText }}</p>
            <div>
                <button class="btn-resend" @click="onEmailResendClick">ส่งรหัสอีกครั้ง</button>
            </div>
            <div class="buttons">
                <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
                <button class="btn-confirm" @click="onConfirmClick">ยืนยัน</button>
            </div>
        </div>
        <div v-else class="verify-successful-card text-center">
            <h1><span><img src="../assets/img/success-icon.png" alt="" class="success-icon"></span>ยืนยันตัวตนสำเร็จ</h1>
            <p class="email-text" style="margin-bottom: 30px;">คุณได้ลงทะเบียนเพื่อเข้าใช้งานระบบสำเร็จแล้ว<br/>รหัสผ่านในการเข้าใช้งานของคุณคือ</p>
            <p class="result-text fw-bold">เลขประจำตัวผู้นำเข้า</p>
            <p class="result-text">{{ exciseIdNumber }}</p>
            <p class="result-text fw-bold">รหัสผ่าน</p>
            <p class="result-text">{{ password }}</p>
            <div class="buttons" style="padding-top: 10px;">
                <button class="btn-confirm" @click="onNextClick">ถัดไป</button>
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
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { verifyEmail, resendEmail } from '@/api/getUserData'

export default {
    setup () {
        const router = useRouter()

        const email = ref('')
        const token = ref('')
        const verificationCode = ref('')
        const showVerifyEmailCard = ref(true)
        const exciseIdNumber = ref('')
        const password = ref('')
        const codeErrorText = ref('')
        const emailSendSuccess = ref(false)
        const spinner = ref(false)

        const restrictVerificationCode = (event) => {
            const number = event.target.value
            verificationCode.value = number.replace(/\D/g, '');
            codeErrorText.value = ''
        }

        const onConfirmClick = async() => {
            spinner.value = true
            if (verificationCode.value) {
                const getVerifyEmail = await verifyEmail(verificationCode.value, token.value)
                console.log("Verifying email :", getVerifyEmail.data)
                if (getVerifyEmail.data.code === 404) {
                    spinner.value = false
                    codeErrorText.value = 'ข้อมูลไม่ถูกต้อง'
                }
                else {
                    exciseIdNumber.value = getVerifyEmail.data.id_no
                    password.value = getVerifyEmail.data.password
                    showVerifyEmailCard.value = false
                }
            }
            else {
                codeErrorText.value = 'กรุณากรอกรหัสยืนยันตัวตนของคุณ'
            }
            spinner.value = false
        }

        const onEmailResendClick = async() => {
            spinner.value = true
            const emailAddress = {
                email : email.value
            }
            const emailResend = await resendEmail(emailAddress, token.value)
            emailSendSuccess.value = true
            console.log("Resending email :", emailResend.data)
            spinner.value = false
        }

        const onOkayClick = () => {
            emailSendSuccess.value = false
        }

        const onBackClick = () => {
            router.push('/your-cart')
        }
        
        const onNextClick = () => {
            router.push('/import-liquor')
        }

        onMounted (() => {
            email.value = localStorage.getItem('email')
            token.value = localStorage.getItem('token')
        })

        return {
            email,
            verificationCode,
            showVerifyEmailCard,
            exciseIdNumber,
            password,
            codeErrorText,
            emailSendSuccess,
            spinner,
            restrictVerificationCode,
            onConfirmClick,
            onBackClick,
            onNextClick,
            onEmailResendClick,
            onOkayClick
        }
    }
}
</script>

<style scoped>
.verify-email-card {
    /* position: relative; */
    margin-top: 30px;
    padding: 50px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
    /* align-content: center; */
}

.verify-email-card h1 {
    font-size: 32px;
    color: #000000;
}

.email-text {
    color: #3D3E3E;
    font-size: 18px;
    margin: 20px;
}

.result-text {
    color: #3D3E3E;
    font-size: 18px;
    /* font-weight: 700; */
    margin: 10px;
}

.btn-resend {
    margin-top: 30px;
    color: #2B476D;
    font-size: 18px;
    font-weight: 700;
    text-decoration: underline;
    border: none !important;
    background-color: transparent;
}

.verify-successful-card {
    margin-top: 30px;
    padding: 50px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.verify-successful-card h1 {
    font-size: 32px;
    font-weight: 700;
    color: #5ED15E;
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

.success-icon {
    width: 55px;
    height: auto;
    margin-bottom: 5px;
    margin-right: 10px;

}
</style>