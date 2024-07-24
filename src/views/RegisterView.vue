<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">ลงทะเบียนผู้นำเข้าสุรา</h1>
        </div>
        <form @submit.prevent="onConfirmClick">
            <div class="register-card text-start">
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">สัญชาติผู้นำเข้า</label>
                        <input type="text" class="form-input input-grey" v-model="nationality" disabled>
                    </div>
                    <div class="col-6">
                        <label class="form-label">ประเภทผู้นำเข้า</label>
                        <input type="text" class="form-input input-grey" v-model="importerType" disabled>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">เลขบัตรประจำตัวประชาชน</label>
                        <input type="text" class="form-input input-grey" v-if="dbdId" v-model="dbdId" disabled>
                        <input type="text" class="form-input input-grey" v-else-if="individualId" v-model="individualId" disabled>
                        <input type="text" class="form-input input-grey" v-else v-model="passportId" disabled>
                    </div>
                    <div class="col-6">
                        <div v-if="userType === 20">
                            <label for="" class="form-label">ชื่อบริษัท</label>
                            <input type="text" class="form-input input-grey" v-model="companyName">
                        </div>
                        <div v-if="userType === 19">
                            <label class="form-label">คำนำหน้าชื่อ <span class="required-text">*</span></label>
                            <select id="idSelect" name="id" class="select" v-model="title" required>
                                <option v-for="option in titleList" :key="option.Id" :value="option.Id"
                                    class="option">
                                    {{ option.FullTitleName }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div v-if="userType === 19" class="row">
                    <div class="col-6">
                        <label class="form-label">ชื่อผู้นำเข้า <span class="required-text">*</span></label>
                        <input type="text" class="form-input" v-model="firstName" required>
                    </div>
                    <div class="col-6">
                        <label class="form-label">นามสกุล <span class="required-text">*</span></label>
                        <input type="text" class="form-input" v-model="lastName" required>
                    </div>
                </div>
                <div v-if="userType === 20" class="row">
                    <div class="col-6">
                        <label class="form-label">สาขา</label>
                        <input type="text" class="form-input" v-model="branch">
                    </div>
                    <div class="col-6">
                        <label class="form-label">เลขทะเบียนสรรพสามิต(ถ้ามี)</label>
                        <input type="text" class="form-input" v-model="regNumber">
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">อีเมล <span class="required-text">*</span></label>
                        <input type="text" class="form-input" v-model="email" @input="()=>emailErrorText=''" required>
                        <p v-if="emailErrorText" class="error-text">{{ emailErrorText }}</p>
                    </div>
                    <div class="col-6">
                        <label class="form-label">เบอร์โทรศัพท์ <span class="required-text">*</span></label>
                        <input type="text" class="form-input" v-if="userType === 20" name="telephoneNumber" v-model="telephoneNumber.value" :ref="telephoneNumber.ref" onkeydown="return event.keyCode !== 69" maxlength="9" @input="restrictPhoneNumber($event)" required>
                        <input type="text" class="form-input" v-else name="mobileNumber" v-model="mobileNumber.value" :ref="mobileNumber.ref" onkeydown="return event.keyCode !== 69" maxlength="10" @input="restrictMobileNumber($event)" required>
                        <p class="error-text" v-if="telephoneNumber.error">{{ telephoneNumber.error.message }}</p>
                        <p class="error-text" v-if="mobileNumber.error">{{ mobileNumber.error.message }}</p>
                    </div>
                </div>
                <div v-if="userType === 19" class="row">
                    <div class="col-6">
                        <label class="form-label">เลขทะเบียนสรรพสามิต(ถ้ามี)</label>
                        <input type="text" class="form-input" v-model="regNumber">
                    </div>
                    <div class="col-6">
                        <label class="form-label">เลขที่พาสปอร์ต</label>
                        <input type="text" class="form-input" v-model="ppNumber">
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label class="form-label">ที่อยู่ <span class="required-text">*</span></label>
                        <input type="text" class="form-input" v-model="addressName" required>
                    </div>
                    <div class="col-3">
                        <label class="form-label">หมู่ที่</label>
                        <input type="text" class="form-input" v-model="village">
                    </div>
                    <div class="col-3">
                        <label class="form-label">ตรอก/ซอย</label>
                        <input type="text" class="form-input" v-model="alley">
                    </div>
                    <div class="col-3">
                        <label class="form-label">ถนน</label>
                        <input type="text" class="form-input" v-model="street">
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label class="form-label">จังหวัด <span class="required-text">*</span></label>
                        <select id="idSelect" name="id" class="select" v-model="province" required >
                            <option v-for="option in provinceList" :key="option.Id" :value="option.PvCode"
                                class="option">
                                {{ option.NameTh }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3">
                        <label class="form-label">อำเภอ/เขต <span class="required-text">*</span></label>
                        <select id="idSelect" name="id" class="select" v-model="district" required >
                            <option v-for="option in districtList" :key="option.Id" :value="option.DistCode"
                                class="option">
                                {{ option.NameTh }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3">
                        <label class="form-label">ตำบล/แขวง <span class="required-text">*</span></label>
                        <select id="idSelect" name="id" class="select" v-model="subDistrict" required>
                            <option v-for="option in subDistrictList" :key="option.Id" :value="option.SubdistCode"
                                class="option">
                                {{ option.NameTh }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3">
                        <label class="form-label">รหัสไปรษณีย์ <span class="required-text">*</span></label>
                        <input type="text" class="form-input" v-model="postelCode" onkeydown="return event.keyCode !== 69" maxlength="5" @input="restrictPostCode($event)" required >
                    </div>
                </div>
                <div class="buttons">
                    <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
                    <button type="submit" class="btn-confirm">ยืนยัน</button>
                </div>
            </div>
        </form>
    </div>
    <div v-if="spinner" class="overlay"></div>

    <div v-if="spinner" class="text-center-spinner">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vue-hooks-form'
import { getDbdData } from '@/api/getUserInfoById'
import { getTitle, getEnumGroup, getProvince, getDistrict, getSubDistrict } from '@/api/getMaster'
import { getRegisterData } from '@/api/getUserData'
 
export default {
    setup () {
        const router = useRouter()

        const status = ref('')
        const dbdId = ref('')
        const companyName = ref('')
        const branch = ref('')
        const individualId = ref('')
        const passportId = ref('')
        const userTypes = ref([])
        const importerType = ref('')
        const userType = ref()
        const nationality = ref('')
        const titleList = ref([])
        const title = ref('')
        const firstName = ref('')
        const lastName = ref('')
        const email = ref('')
        // const telephoneNumber = ref('')
        // const mobileNumber = ref('')
        const regNumber = ref('')
        const ppNumber = ref('')
        const addressName = ref('')
        const village = ref('')
        const alley = ref('')
        const street = ref('')
        const provinceList = ref([])
        const province = ref('')
        const districtList = ref([])
        const district = ref('')
        const subDistrictList = ref([])
        const subDistrict = ref('')
        const postelCode = ref('')
        const spinner = ref(false)
        const emailErrorText = ref('')

        const { useField } = useForm()
        const telephoneNumber = useField('telephoneNumber', { rule: [{ min: 9, message: "กรุณากรอกเบอร์ติดต่อให้ถูกต้อง" }] })
        const mobileNumber = useField('mobileNumber', { rule: [{ min: 10, message: "กรุณากรอกเบอร์ติดต่อให้ถูกต้อง" }] })

        const onConfirmClick = async() => {
            spinner.value = true
            if(dbdId.value) {
                const provinceLabel = provinceList.value.find((p) => p.PvCode == province.value);
                const districtLabel = districtList.value.find((d) => d.DistCode == district.value);
                const subdistrictLabel = subDistrictList.value.find((s) => s.SubdistCode == subDistrict.value);

                const userData = {
                    Email: email.value,
                    FtUserTypeId: userType.value,
                    CompanyName: companyName.value,
                    IDCard: dbdId.value,
                    Phone: telephoneNumber.value,
                    ExciseNo: regNumber.value,
                    Moo: alley.value,
                    Soi: street.value,
                    Province: provinceLabel.NameTh,
                    District: districtLabel.NameTh,
                    SubDistrict: subdistrictLabel.NameTh,
                    PostCode: postelCode.value,
                    IsStatus: parseInt(status.value),
                    IsActive: true
                }
                console.log("Dbd user data to register :", userData)
                localStorage.setItem('email',email.value)
                const getRegister = await getRegisterData (userData)
                console.log("Registeration success :", getRegister.data)
                localStorage.setItem('email',email.value)
                localStorage.setItem('token', getRegister.data.accessToken)
                router.push('/verify-email')
                spinner.value = false
            }
            else {
                const provinceLabel = provinceList.value.find((p) => p.PvCode == province.value);
                const districtLabel = districtList.value.find((d) => d.DistCode == district.value);
                const subdistrictLabel = subDistrictList.value.find((s) => s.SubdistCode == subDistrict.value);
                console.log("I am ordinary user", provinceLabel.NameTh, districtLabel.NameTh, subdistrictLabel.NameTh);
                // return false;

                const userData = {
                    Email: email.value,
                    FtUserTypeId: userType.value,
                    TitleId: title.value,
                    FirstName: firstName.value,
                    LastName: lastName.value,
                    IDCard: individualId.value,
                    Mobile: mobileNumber.value,
                    Passport: ppNumber.value,
                    ExciseNo: regNumber.value,
                    AddrNo: addressName.value,
                    Moo: village.value,
                    Soi: alley.value,
                    Street: street.value,
                    Province: provinceLabel.NameTh,
                    District: districtLabel.NameTh,
                    SubDistrict: subdistrictLabel.NameTh,
                    PostCode: postelCode.value,
                    IsStatus: parseInt(status.value),
                    IsActive: true
                }
                console.log("Individual user data to register :", userData)
                const getRegister = await getRegisterData (userData)
                console.log("Registeration success :", getRegister.data)
                if(getRegister.data.info === "'/Email' Invalid email address") {
                    emailErrorText.value = "กรุณาตรวจสอบรูปแบบอีเมล"
                    spinner.value = false
                }
                else if (getRegister.data.code === 409) {
                    emailErrorText.value = "อีเมลนี้ถูกใช้ไปแล้ว"
                    spinner.value = false
                }
                else {
                    localStorage.setItem('email',email.value)
                    localStorage.setItem('token', getRegister.data.accessToken)
                    router.push('/verify-email')
                    spinner.value = false
                }
            }
            
        }

        const onBackClick = () => {
            router.push('/your-cart')
        }

        const fetchDbdData = async() => {
            if (dbdId.value) {
                const dbdData = await getDbdData(dbdId.value)
                console.log('DBD data :',dbdData.data)
                companyName.value = dbdData.data.juristicNameTH
                // importerType.value = dbdData.data.
                // title.value = dbdData.data.
                // firstName.value = dbdData.data.
                // lastName.value = dbdData.data.
                // email.value = dbdData.data.
                // regNumber.value = dbdData.data.
                addressName.value = dbdData.data.addressName
                village.value = dbdData.data.villageName
                // alley.value = dbdData.data.
                // road.value = dbdData.data.
                province.value = dbdData.data.province_id
                district.value = dbdData.data.district_id
                subDistrict.value = dbdData.data.sub_district_id
                postelCode.value = dbdData.data.post_code
            }
        }

        const fetchUserType = async () => {
            const enumGroup = 'FtUserType'
            const getUserType = await getEnumGroup (enumGroup)
            userTypes.value = getUserType.data
        }

        const fetchTitle = async () => {
            const titleData = await getTitle()
            titleList.value = titleData.data
        }

        const fetchProvince = async() => {
            const provinceData = await getProvince()
            provinceList.value = provinceData.data
        }

        watch (province, async(selectedProvince) => {
            if (selectedProvince) {
                const getDistrictData = await getDistrict (selectedProvince)
                districtList.value = getDistrictData.data
            }
        })

        watch ([province,district], async([selectedProvince,selectedDistrict]) => {
            if (selectedProvince && selectedDistrict) {
                const getSubDistrictData = await getSubDistrict (selectedProvince, selectedDistrict)
                subDistrictList.value = getSubDistrictData.data
            }
        })

        const restrictPhoneNumber = (event) => {
            const number = event.target.value
            telephoneNumber.value = number.replace(/\D/g, '');
        }

        const restrictMobileNumber = (event) => {
            const number = event.target.value
            mobileNumber.value = number.replace(/\D/g, '');
        }

        const restrictPostCode = (event) => {
            const number = event.target.value
            postelCode.value = number.replace(/\D/g, '');
        }

        onMounted (() => {
            dbdId.value = localStorage.getItem('dbdId')
            individualId.value = localStorage.getItem('individualId')
            passportId.value = localStorage.getItem('passportId')
            status.value = localStorage.getItem('status')

            fetchUserType();
            fetchDbdData();
            fetchTitle();
            fetchProvince();
            
            if (dbdId.value) {
                importerType.value = 'นิติบุคคล'
                userType.value = 20
                nationality.value = 'คนไทย'
            }
            if (individualId.value) {
                importerType.value = 'บุคคลธรรมดา'
                userType.value = 19
                nationality.value = 'คนไทย'
            }
            if (passportId.value) {
                importerType.value = 'บุคคลธรรมดา'
                userType.value = 19
                nationality.value = 'คนต่างชาติ'
            }
            console.log("Usertype :", userType.value)
        })

        return {
            dbdId,
            individualId,
            passportId,
            userTypes,
            userType,
            importerType,
            nationality,
            companyName,
            branch,
            titleList,
            title,
            firstName,
            lastName,
            email,
            telephoneNumber,
            mobileNumber,
            regNumber,
            ppNumber,
            addressName,
            village,
            alley,
            street,
            provinceList,
            province,
            districtList,
            district,
            subDistrictList,
            subDistrict,
            postelCode,
            emailErrorText,
            spinner,
            onConfirmClick,
            onBackClick,
            restrictPhoneNumber,
            restrictMobileNumber,
            restrictPostCode
        }
    }
}
</script>

<style scoped>
.register-card {
    margin-top: 20px;
    padding: 40px 20%;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}


</style>