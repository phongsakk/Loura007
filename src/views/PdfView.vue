<template>
  <div class="pdf-container">
    <div>
      <div class="pdf-file" id="pdf-content">
        <p class="pdf-header fw-bold">แบบแจ้งข้อมูลการนำเข้าสินค้า</p>
        <p class="pdf-text text-end">วันที่.........................................</p>
        <p class="pdf-text text-start text-fit">ชื่อผู้นำเข้า...........................................................................................................................................................</p>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox" id="userType19" v-model="userType19">
          <label for="userType19" class="pdf-text" style="margin-right: 10px;">บุคคลธรรมดา</label>
          <input type="checkbox" class="pdf-checkbox" id="userType20" v-model="userType20">
          <label for="userType20" class="pdf-text" style="margin-right: 10px;">นิติบุคคล</label>
          <input type="checkbox" class="pdf-checkbox">
          <label for="" class="pdf-text" style="margin-right: 10px;">คณะบุคคล</label>
          <input type="checkbox" class="pdf-checkbox">
          <label for="" class="pdf-text" style="margin-right: 10px;">หน่วยงานราชการ</label>
        </div>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox" id="userTypeOther">
          <label for="userTypeOther" class="pdf-text">อื่นๆ (ระบุ )</label>
        </div>
        <div class="d-flex">
          <p class="pdf-text">เลขประจำตัวประชาชน/ทะเบียนนิต บ ิ ุคคล</p>
          <div class="blocks-container">
            <div class="block" v-for="(digit, index) in importerId" :key="index">{{ digit }}</div>
          </div>
        </div>
        <div class="d-flex">
          <p class="pdf-text">เลขทะเบียนสรรพสามิต (ถ้ามี )</p>
          <div class="blocks-container">
            <div class="block" v-for="(digit, index) in exciseId" :key="index">{{ digit }}</div>
          </div>
        </div>
        <p class="pdf-text text-start">เลขที่พาสปอร์ต..................................</p>
        <p class="pdf-text text-start text-fit">ที่อยู่เลขท.................................................หมู่ที่..............................ตรอก/ซอย.....................................................</p>
        <p class="pdf-text text-start text-fit">ถนน.................................................ตำบล/แขวง....................................อำเภอ/เขต...........................................</p>
        <p class="pdf-text text-start text-fit">จังหวัด................................................รหัสไปรษณีย์....................................โทรศัพท์...........................................</p>
        <p class="pdf-text text-start">ได้นำ เข้าสินค้าที่ไม่ได้จำแนกประเภทไว้ในภาคที ว ่ ่าด้วยของที ไ ่ ด้รับยกเว้นอากรตามกฎหมายว่าด้วยพิกัดอัตราศุลกากร</p>
        <p class="pdf-text text-start">เพื่อวัตถุประสงค</p>
        <div class="d-flex" >
          <input type="checkbox" class="pdf-checkbox">
          <label for="" class="pdf-text">นำ สินค้าติดตัวเข้ามา</label>
        </div>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox">
          <label for="" class="pdf-text">นำ สินค้าเข้ามาเพื่อเป็นตัวอย่างสินค้า</label>
        </div>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox">
          <label for="" class="pdf-text">นำ สินค้าเข้ามาโดยมิใช่เพื่อการค้า</label>
        </div>
        <p class="pdf-text text-start">ดังต่อไปน</p>
        <table class="pdf-table">
          <tr>
            <th>ลำดับท<br>(1)</th>
            <th>ประเภท<br>สินค้า<br>(2)</th>
            <th>ชื่อสินค้า<br>(3)</th>
            <th>แบบ/รุ่น<br>(4)</th>
            <th>ดีกรี /<br>ปริมาณน้ำตาล/<br>CO 2 /<br>น้ำหนัก /มวน<br>(5)</th>
            <th>ขนาด<br>(6)</th>
            <th>ปริมาณ<br>ท<br>นำเข้า<br>(7)</th>
            <th>ราคาที่ใช<br>เป็นฐาน<br>หมายเหต<br>ในการ<br>คำนวณภาษ<br>(8)</th>
            <th>หมายเหต<br>(9)</th>
          </tr>
          <tr>

          </tr>
        </table>
        <p class="pdf-text">ข้าพเจ้าขอรับรองว่าข้อความดังกล่าวข้างต้นเป็นจริงและถูกต้องทุกประการ</p>
        <div class="">
          <p class="pdf-text text-center">(ลงชื่อ).........................</p>
          <p class="pdf-text text-center">(...........................)</p>
          <p class="pdf-text text-center">ผู้นำเข้า</p>
        </div>
        
      </div>
    </div>
    <div class="button-session">
      <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
      <button class="btn-next" @click="onConfirmClick">ยืนยันแบบฟอร์ม</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { PDFDocument } from 'pdf-lib'
// import { PDFDocument, rgb } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';

import { getUserProfile } from '@/api/getUserData'

export default {
  setup() {
    const router = useRouter();
    const token = ref('')
    const pdfUrl = ref('');
    const cartItems = ref([]);
    const importedDate = ref('');
    const wineData = ref([])
    // let sarabunFont = null;
    const pdfBase64 = ref('')
    const userData = ref([])

    

    const onConfirmClick = async() => {
      const pdfContent = document.getElementById('pdf-content');
      const canvas = await html2canvas(pdfContent);
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdfBase64.value = doc.output('datauristring');
      localStorage.setItem('generatedPdf', pdfBase64.value);

      router.push('/scan-qr');
    };

    const onBackClick = () => {
      router.push('/wine-list-in-cart');
    };

    const fetchUserProfile = async () => {
      const getUserData = await getUserProfile(token.value)
      console.log("User Data :", getUserData.data)
      userData.value = getUserData.data
    }

    const formatNumber = (value) => {
      const floatValue = parseFloat(value);
      return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    onMounted(async () => {
      cartItems.value = JSON.parse(localStorage.getItem('cartItemsToScan'));
      token.value = localStorage.getItem('token')

      await fetchUserProfile()

      wineData.value = cartItems.value.Items
      console.log("WineData:", wineData.value)
     
    });

    return {
      pdfUrl,
      cartItems,
      importedDate,
      onBackClick,
      onConfirmClick,
      formatNumber
    };
  },
};
</script>



<style scoped>
.pdf-container {
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #3D3E3E;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
}

.pdf-file {
  width: 750px;
  height: 100%;
  padding: 70px;
  background-color: #FFFFFF;
  color: #000000;
}

.button-session {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px;
  background-color: #212121;
  border-radius: 13px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* width: calc(100% - 40px); Adjust width based on padding */
  box-sizing: border-box; /* Ensure padding is included in width calculation */
}

.button-session .btn-back {
  width: 186px;
  height: 44px;
  background-color: #5F5F5F;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.button-session .btn-next {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 700;
  width: 186px;
  height: 44px;
  background-color: #383838;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
}

#pspdfkit {
  width: 100%;
  height: 100%;
}

.pdf-text {
  font-size: 14px;
  margin-bottom: 5px;
}

.pdf-checkbox {
  margin-right: 5px;
  margin-bottom: 5px;
}

input[type="checkbox" i] {
    background-color: initial;
    cursor: default;
    appearance: auto;
    box-sizing: border-box;
    /* margin: 3px 3px 3px 4px; */
    padding: initial;
    border: initial;
}

.text-fit {
  width: fit-content;
  word-break: break-word;
}

.pdf-table {
  width: 100%;
  border-collapse: collapse;
  /* margin-top: 20px; */
}

.pdf-table th,
.pdf-table td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
}

.blocks-container {
  display: flex;
  gap: 2px;
  margin-left: 10px;
}

.block {
  width: 20px;
  height: 30px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px; /* Adjust text size */
  line-height: 1;
}
</style>