<template> 
    <div class="login-page">
        <div class="login-card">
            <img src="../assets/img/excise-logo.png" alt="" class="img-fluid">
            <div class="text-start p-3">
                <h3 class="login-header">ลงชื่อเข้าใช้</h3>
                <hr class="login-divider-line">
                <label class="login-label" for="">อีเมล</label>
                <input type="text" class="login-input" v-model="email" @input="() => emailErrorText = ''">
                <p class="error-text" v-if="emailErrorText">{{ emailErrorText }}</p>
                <label class="login-label" for="">รหัสผ่าน</label>
                <input type="password" class="login-input" v-model="password" @input="() => passwordErrorText = ''">
                <p class="error-text" v-if="passwordErrorText">{{ passwordErrorText }}</p>
            </div>
            <div class="login-buttons">
                <button class="btn-cancel">สร้างบัญชี</button>
                <button class="btn-login" @click="onLoginClick">ลงชื่อเข้าใช้</button>
            </div>
            <div class="forgot-password">
                <button class="btn-forgot-password" @click="onForgotPasswordClick">ลืมรหัสผ่าน</button>
            </div>
        </div>
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLonginUser } from '@/api/getUserData'

export default {
    setup () {
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const isLoggedIn = ref(false)
        const spinner = ref(false)
        const emailErrorText = ref('')
        const passwordErrorText = ref('')

        const onLoginClick = async () => {
            spinner.value = true;
            const getLogin = await getLonginUser(email.value, password.value);
            console.log("Logging in :", getLogin);
            if (getLogin.code === 400) {
                if (getLogin.data.info === "'/Email' Invalid email address") {
                    emailErrorText.value = 'อีเมลไม่ถูกต้อง';
                }
                if (getLogin.message === 'Invalid email or password') {
                    passwordErrorText.value = 'รหัสผ่านไม่ถูกต้อง'
                }
                spinner.value = false
            }
            else {
                isLoggedIn.value = true;
                localStorage.setItem('token', getLogin.data.accessToken);
                localStorage.setItem('isLoggedIn', isLoggedIn.value);
                localStorage.setItem('userTypeId', getLogin.data.FtUserTypeId);
                if (getLogin.data.FtUserTypeId === 21) {
                    router.push('/import-wine-list');
                } else {
                    router.push('/');
                }
                spinner.value = false;
            }
        };

        const onForgotPasswordClick = async() => {

        }

        return {
            email,
            password,
            spinner,
            emailErrorText,
            passwordErrorText,
            onLoginClick,
            onForgotPasswordClick,
        }
    }
}
</script>

<style scoped>
.login-page {
    background-image: url(../assets/img/login-background-image.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-card {
    width: 415px;
}

.login-header {
    font-size: 22px;
    color: #FFFFFF;
    font-weight: 700;
}

.login-label {
    font-size: 22px;
    color: #FFFFFF;
}

.login-input {
    width: 100%;
    height: 42px;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 3px #00000029;
    border: none;
    border-radius: 3px;
    padding: 10px 10px 12px;
}

.login-buttons {
    display: flex;
    justify-content: center;
    padding: 30px;
}

.btn-cancel {
    font-family: "Prompt", sans-serif;
    width: 155px;
    height: 48px;
    background-color: #77818A;
    color: #FFFFFF;
    border: none;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 9px;
    margin-right: 5px;
}

.btn-login {
    font-family: "Prompt", sans-serif;
    width: 155px;
    height: 48px;
    background-color: #162848;
    color: #FFFFFF;
    border: none;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 9px;
    margin-left: 5px;
}

.login-divider-line {
    border-top: 2px solid #FFFFFF;
    margin-top: 20px;
}

.forgot-password {
    margin-top: 30px;
}

.btn-forgot-password {
    font-size: 18px;
    color: #FFFFFF;
    border: none;
    background: none;
    text-decoration: underline;
}
</style>