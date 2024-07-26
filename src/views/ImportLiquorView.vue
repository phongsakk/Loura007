<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">รายการสุราในตระกร้า</h1>
        </div>
        <div class="import-liquor-card">
            <form @submit.prevent="onConfirmClick">
                <div class="text-start" style="width: 400px;">
                    <label class="form-label">วัตถุประสงค์ในการนำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="importPurpose" required>
                        <!-- <option value="" disabled selected>Select....</option> -->
                        <option v-for="option in importPurposeList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <label class="form-label">ด่านนำเข้า</label>
                    <select id="idSelect" name="id" class="select" v-model="checkpoint" required>
                        <!-- <option value="" disabled selected>Select....</option> -->
                        <option v-for="option in checkpointList" :key="option.Id" :value="option.Id"
                            class="option">
                            {{ option.EnumName }}
                        </option>
                    </select>
                    <label class="form-label">วันที่ประมาณนำเข้า</label>
                    <input type="date" class="form-input" :min="minDate" v-model="importDate" required>
                </div>
                <div class="buttons">
                    <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getEnumGroup } from '@/api/getMaster'
import { getImportLiquor } from '@/api/getImportLiquor'

export default {
    setup() {
        const router = useRouter()

        const spinner = ref(false)
        const cartId = ref('')
        const token = ref('')
        const importPurposeList = ref([])
        const importPurpose = ref('')
        const checkpointList = ref([])
        const checkpoint = ref('')
        const currentDate = new Date();
        const importDate = ref(currentDate.getFullYear() + '-' + ((currentDate.getMonth() > 8) ? (currentDate.getMonth() + 1) : ('0' + (currentDate.getMonth() + 1))) + '-' + ((currentDate.getDate() > 9) ? currentDate.getDate() : ('0' + currentDate.getDate())))

        const onBackClick = () => {
            router.push('/your-cart')
        }

        const fetchImportPurpose = async () => {
            const enumGroup = 'FtImportPurpose' 
            const importPurposeData = await getEnumGroup (enumGroup)
            importPurposeList.value = importPurposeData.data
        }

        const fetchCheckpoint = async () => {
            const enumGroup = 'FtCheckPoint'
            const checkpointData = await getEnumGroup (enumGroup)
            checkpointList.value = checkpointData.data
        }

        const onConfirmClick = async() => {
            spinner.value = true
            const liquorData = {
                CartId: parseInt(cartId.value),
                PurposeId: importPurpose.value,
                Checkpoint: checkpoint.value,
                PurposeDate: importDate.value
            }
            console.log("Liquor data to save :", liquorData)
            const importLiquor = await getImportLiquor (liquorData, token.value)
            console.log("importing liquor :", importLiquor.data)
            router.push('/wine-list-in-cart')
            spinner.value = false
        }

        const minDate = computed ( () => {
            const today = new Date().toISOString().split('T')[0];
            return today;
        })

        onMounted (() => {
            localStorage.removeItem('password')
            cartId.value = localStorage.getItem('cartId')
            token.value = localStorage.getItem('token')
            fetchImportPurpose();
            fetchCheckpoint();
        })

        return {
            importPurposeList,
            importPurpose,
            checkpointList,
            checkpoint,
            importDate,
            spinner,
            minDate,
            onBackClick,
            onConfirmClick
        }
    }
}
</script>

<style scoped>
.import-liquor-card {
    margin-top: 30px;
    padding: 50px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}
</style>