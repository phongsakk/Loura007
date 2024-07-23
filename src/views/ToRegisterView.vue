<template>
    <div class="register-page">
        <div class="register-card text-start">
            <div class="sub-header text-center">ลงทะเบียนเพื่อเข้าใช้งาน</div>
            <label class="form-label text-start">สัญชาติผู้นำเข้า</label>
            <select id="idSelect" name="id" class="select" v-model="status">
                <option value="" disabled selected></option>
                <option v-for="option in statusList" :key="option.Id" :value="option.Id" class="option">
                    {{ option.EnumName }}
                </option>
            </select>
            <div v-if="status !== 4" class="text-start">
                <label class="form-label text-start">เลขบัตรประจำตัวประชาชน/เลขนิติบุคคล</label>
                <input type="text" class="form-input" onkeydown="return event.keyCode !== 69" maxlength="13"
                    v-model="idNumber" @input="onIdNumberInput($event)">
                <p v-if="validationMessage" class="error-text">{{ validationMessage }}</p>
                <label class="form-label text-start">ประเภทผู้นำเข้า</label>
                <input type="text" class="form-input input-grey" v-model="idLabel" disabled>

            </div>
            <div v-if="status === 4" class="text-start">
                <label class="form-label text-start">เลขที่พาสปอร์ต</label>
                <input type="text" class="form-input" v-model="passportNumber">
            </div>
            <!-- <div v-else class="text-start">onkeydown="return event.keyCode !== 69"
                        <label class="form-label text-start">Input yout id number</label>
                        <input type="text" class="form-input" v-model="idNumber" disabled>
                    </div> -->
            <div class="buttons">
                <button class="btn-back" @click="onCancelClick">ย้อนกลับ</button>
                <button class="btn-confirm" @click="onRegisterClick">ยืนยัน</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDbdData } from '@/api/getUserInfoById'
import { getEnumGroup } from '@/api/getMaster'

export default {
    setup() {
        const router = useRouter()

        const idNumber = ref('')
        const idLabel = ref('')
        const passportNumber = ref('')
        const validationMessage = ref('')

        const statusList = ref([])
        const status = ref('')

        const onCancelClick = () => {
            router.push('/login')
        }

        const onRegisterClick = async() => {
            if (idNumber.value) {
                if (idNumber.value.startsWith('0')){
                    const getDbd = await getDbdData(idNumber.value)
                    console.log("DBD data :", getDbd.data)
                    localStorage.setItem('dbdId',idNumber.value)
                    localStorage.removeItem('individualId')
                    localStorage.removeItem('passportId')
                }
                else {
                    localStorage.setItem('individualId',idNumber.value)
                    localStorage.removeItem('dbdId')
                    localStorage.removeItem('passportId')
                }
            }
            if (passportNumber.value) {
                localStorage.setItem('passportId', passportNumber.value)
                localStorage.removeItem('dbdId')
                localStorage.removeItem('individualId')
            }
            localStorage.setItem('status',status.value)
            router.push('/create-account')
        }

        const onIdNumberInput = (event) => {
            const number = event.target.value;
            idNumber.value = number.replace(/\D/g, '');
            idLabel.value = idNumber.value.startsWith('0') ? 'นิติบุคคล' : 'บุคคลธรรมดา';
            validationMessage.value = validateId(idNumber.value);
        }

        const validateEmpty = (value, text) => {
            return value ? null : text;
        };

        const validateType = (value, text) => {
            return !isNaN(value) ? null : text;
        };

        const validateId = (value) => {
            let result = null;

            if (value) {
                value = value.trim();

                result = validateEmpty(value, '* กรุณากรอกข้อมูล');
                result = result || validateType(value, '* กรอกข้อมูลไม่ถูกต้อง');

                if (value.length !== 13) {
                result = '* กรุณากรอกข้อมูลให้ครบ 13 หลัก';
                } else {
                let resultCheck = false;
                let idCard = parseFloat(value.trim()) || 0;
                if (idCard !== 0) {
                    let base = 1000000000000;
                    let basenow = -1;
                    let sum = 0;
                    for (let i = 13; i > 1; i--) {
                    basenow = Math.floor(idCard / base);
                    idCard = idCard - basenow * base;
                    sum += basenow * i;
                    base = base / 10;
                    }
                    let checkbit = (11 - (sum % 11)) % 10;

                    if (checkbit > 9) {
                    checkbit = parseInt(String(checkbit).slice(-1), 10);
                    }

                    let lastNum = parseInt(value.slice(-1), 10);
                    resultCheck = lastNum === checkbit; 
                }

                if (!resultCheck) {
                    result = 'กรอกข้อมูลไม่ถูกต้อง';
                }
                }
            }
            return result;
        };

        const fetchStatus = async () => {
            const enumGroup = 'IsStatus'
            const getStatus = await getEnumGroup (enumGroup)
            statusList.value = getStatus.data
        }

        onMounted ( async() => {
            await fetchStatus()
        })

        return {
            idNumber,
            idLabel,
            passportNumber,
            statusList,
            status,
            onCancelClick,
            onRegisterClick,
            onIdNumberInput
        }
    }
}
</script>

<style scoped>
.register-page {
    background-image: url(../assets/img/login-background-image.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-card {
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