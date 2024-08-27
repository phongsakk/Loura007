<template>
  <div class="pdf-container">
    <div v-if="itemsArray.length < 4">
      <div class="pdf-file" id="pdf-content-page-1">
        <p class="pdf-header fw-bold">แบบแจ้งข้อมูลการนำเข้าสินค้า</p>
        <p class="pdf-text text-end">วันที่.........................................<span class="pdf-result-text" style="right: 40px;">{{ importedDate }}</span></p>
        <p class="pdf-text text-start text-fit">ชื่อผู้นำเข้า........................................................................................................................................................................<span class="pdf-result-text" style="left: 80px;">{{ importerName }}</span></p>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox" id="userType19" :checked="userType === 19"  disabled>
          <label for="userType19" class="pdf-text" style="margin-right: 10px;">บุคคลธรรมดา</label>
          <input type="checkbox" class="pdf-checkbox" id="userType20" :checked="userType === 20"  disabled>
          <label for="userType20" class="pdf-text" style="margin-right: 10px;">นิติบุคคล</label>
          <input type="checkbox" class="pdf-checkbox"  disabled>
          <label for="" class="pdf-text" style="margin-right: 10px;">คณะบุคคล</label>
          <input type="checkbox" class="pdf-checkbox"  disabled>
          <label for="" class="pdf-text" style="margin-right: 10px;">หน่วยงานราชการ</label>
        </div>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox" id="userTypeOther"  disabled>
          <label for="userTypeOther" class="pdf-text">อื่นๆ (ระบุ)</label>
        </div>
        <div class="d-flex">
          <p class="pdf-text" style="margin-right: 5px;">เลขประจำตัวประชาชน/ทะเบียนนิติบุคคล</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[0] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox"  disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[1] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox"  disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[2] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox"  disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[3] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox"  disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[4] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[5] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[6] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[7] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[8] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[9] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[10] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[11] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[12] }}</span>
          </div>

        </div>
        <div class="d-flex">
          <p class="pdf-text" style="margin-right: 5px;">เลขทะเบียนสรรพสามิต (ถ้ามี)</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[0] ? exciseNumberArray[0] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[1] ? exciseNumberArray[1] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[2] ? exciseNumberArray[2] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[3] ? exciseNumberArray[3] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[4] ? exciseNumberArray[4] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[5] ? exciseNumberArray[5] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[6] ? exciseNumberArray[6] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[7] ? exciseNumberArray[7] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[8] ? exciseNumberArray[8] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[9] ? exciseNumberArray[9] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[10] ? exciseNumberArray[10] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[11] ? exciseNumberArray[11] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[12] ? exciseNumberArray[12] : '' }}</span>
          </div>
          <p class="pdf-text" style="margin-right: 3px;">-</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[13] ? exciseNumberArray[13] : '' }}</span>
          </div>
          <p class="pdf-text" style="margin-right: 3px;">-</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[14] ? exciseNumberArray[14] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[15] ? exciseNumberArray[15] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[16] ? exciseNumberArray[16] : '' }}</span>
          </div>
        </div>
        <p class="pdf-text text-start">เลขที่พาสปอร์ต........................................<span class="pdf-result-text" style="left: 100px;">{{ passportNumber }}</span></p>
        <p class="pdf-text text-start text-fit">ที่อยู่เลขที่.....................................................หมู่ที่....................................ตรอก/ซอย.......................................................
          <span class="pdf-result-text" style="left: 80px;">{{ addressName }}</span>
          <span class="pdf-result-text" style="left: 280px;">{{ moo }}</span>
          <span class="pdf-result-text" style="left: 470px;">{{ soi }}</span>
        </p>
        <p class="pdf-text text-start text-fit">ถนน.................................................ตำบล/แขวง.......................................อำเภอ/เขต....................................................
          <span class="pdf-result-text" style="left: 80px;">{{ road }}</span>
          <span class="pdf-result-text" style="left: 280px;">{{ subDistrict }}</span>
          <span class="pdf-result-text" style="left: 480px;">{{ district }}</span>
        </p>
        <p class="pdf-text text-start text-fit">จังหวัด................................................รหัสไปรษณีย์.......................................โทรศัพท์....................................................
          <span class="pdf-result-text" style="left: 80px;">{{ province }}</span>
          <span class="pdf-result-text" style="left: 300px;">{{ postCode }}</span>
          <span class="pdf-result-text" style="right: 50px;">{{ contactNumber }}</span>
        </p>
        <p class="pdf-text text-start">ได้นำเข้าสินค้าที่ไม่ได้จำแนกประเภทไว้ในภาคที่ว่าด้วยของที่ได้รับยกเว้นอากรตามกฎหมายว่าด้วยพิกัดอัตราศุลกากร</p>
        <p class="pdf-text text-start">เพื่อวัตถุประสงค์</p>
        <div class="d-flex" style="margin-left: 60px;">
          <input type="checkbox" class="pdf-checkbox" :checked="importPurpose === 22" disabled>
          <label for="" class="pdf-text">นำสินค้าติดตัวเข้ามา</label>
        </div>
        <div class="d-flex" style="margin-left: 60px;">
          <input type="checkbox" class="pdf-checkbox" :checked="importPurpose === 23" disabled>
          <label for="" class="pdf-text">นำสินค้าเข้ามาเพื่อเป็นตัวอย่างสินค้า</label>
        </div>
        <div class="d-flex" style="margin-left: 60px;">
          <input type="checkbox" class="pdf-checkbox" :checked="importPurpose === 24" disabled>
          <label for="" class="pdf-text">นำสินค้าเข้ามาโดยมิใช่เพื่อการค้า</label>
        </div>
        <p class="pdf-text text-start">ดังต่อไปนี้</p>
        <table class="pdf-table">
          <tr>
            <th>ลำดับที่<br><span class="th-number">(1)</span></th>
            <th>ประเภท<br>สินค้า<br><span class="th-number">(2)</span></th>
            <th>ชื่อสินค้า<br><span class="th-number">(3)</span></th>
            <th>แบบ/รุ่น<br><span class="th-number">(4)</span></th>
            <th>ดีกรี/<br>ปริมาณน้ำตาล/<br>CO 2 /<br>น้ำหนัก /มวน<br><span class="th-number">(5)</span></th>
            <th>ขนาด<br><span class="th-number">(6)</span></th>
            <th>ปริมาณ<br>ที่<br>นำเข้า<br><span class="th-number">(7)</span></th>
            <th>ราคาที่ใช้<br>เป็นฐาน<br>หมายเหตุ<br>ในการ<br>คำนวณภาษี<br><span class="th-number">(8)</span></th>
            <th>หมายเหตุ<br><span class="th-number">(9)</span></th>
          </tr>
          <tr v-for="(wine, index) in itemsArray" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ wine.WineLiquor.CategoryLabel }}</td>
            <td>{{ wine.WineLiquor.DisplayName }}</td>
            <td>{{ wine.WineLiquorPic.WineLiquorYear }}</td>
            <td>{{ wine.WineLiquorPic.Alcohol === 0 ? wine.Avb : wine.WineLiquorPic.Alcohol }}%</td>
            <td>{{ wine.BottleSize }}</td>
            <td>{{ wine.WineLiquorTotal }}</td>
            <td>{{ formatNumber(wine.InitialValue) }}</td>
            <td></td>
          </tr>
        </table>
        <p class="pdf-text">ข้าพเจ้าขอรับรองว่าข้อความดังกล่าวข้างต้นเป็นจริงและถูกต้องทุกประการ</p>
        <div class="sign-session">
          <p class="pdf-text text-center" style="margin-left: 130px;">(ลงชื่อ).........................</p>
          <p class="pdf-text text-center" style="margin-left: 130px;">(...........................)</p>
          <p class="pdf-text text-center" style="margin-left: 130px;">ผู้นำเข้า</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pdf-file" id="pdf-content-page-1">
        <p class="pdf-header fw-bold">แบบแจ้งข้อมูลการนำเข้าสินค้า</p>
        <p class="pdf-text text-end">วันที่.........................................<span class="pdf-result-text" style="right: 40px;">{{ importedDate }}</span></p>
        <p class="pdf-text text-start text-fit">ชื่อผู้นำเข้า........................................................................................................................................................................<span class="pdf-result-text" style="left: 80px;">{{ importerName }}</span></p>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox" id="userType19" :checked="userType === 19" disabled>
          <label for="userType19" class="pdf-text" style="margin-right: 10px;">บุคคลธรรมดา</label>
          <input type="checkbox" class="pdf-checkbox" id="userType20" :checked="userType === 20" disabled>
          <label for="userType20" class="pdf-text" style="margin-right: 10px;">นิติบุคคล</label>
          <input type="checkbox" class="pdf-checkbox" disabled>
          <label for="" class="pdf-text" style="margin-right: 10px;">คณะบุคคล</label>
          <input type="checkbox" class="pdf-checkbox" disabled>
          <label for="" class="pdf-text" style="margin-right: 10px;">หน่วยงานราชการ</label>
        </div>
        <div class="d-flex">
          <input type="checkbox" class="pdf-checkbox" id="userTypeOther" disabled>
          <label for="userTypeOther" class="pdf-text">อื่นๆ (ระบุ)</label>
        </div>
        <div class="d-flex">
          <p class="pdf-text" style="margin-right: 5px;">เลขประจำตัวประชาชน/ทะเบียนนิติบุคคล</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[0] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[1] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[2] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[3] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[4] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[5] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[6] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[7] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[8] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[9] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[10] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[11] }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ idNumberArray[12] }}</span>
          </div>

        </div>
        <div class="d-flex">
          <p class="pdf-text" style="margin-right: 5px;">เลขทะเบียนสรรพสามิต (ถ้ามี)</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[0] ? exciseNumberArray[0] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[1] ? exciseNumberArray[1] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[2] ? exciseNumberArray[2] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[3] ? exciseNumberArray[3] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[4] ? exciseNumberArray[4] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[5] ? exciseNumberArray[5] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[6] ? exciseNumberArray[6] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[7] ? exciseNumberArray[7] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[8] ? exciseNumberArray[8] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[9] ? exciseNumberArray[9] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[10] ? exciseNumberArray[10] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[11] ? exciseNumberArray[11] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[12] ? exciseNumberArray[12] : '' }}</span>
          </div>
          <p class="pdf-text" style="margin-right: 3px;">-</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[13] ? exciseNumberArray[13] : '' }}</span>
          </div>
          <p class="pdf-text" style="margin-right: 3px;">-</p>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[14] ? exciseNumberArray[14] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[15] ? exciseNumberArray[15] : '' }}</span>
          </div>
          <div class="position-relative">
            <input type="checkbox" class="pdf-checkbox" disabled>
            <span class="pdf-result-text" style="left: 3px; bottom: 5px;">{{ exciseNumberArray[16] ? exciseNumberArray[16] : '' }}</span>
          </div>
        </div>
        <p class="pdf-text text-start">เลขที่พาสปอร์ต........................................<span class="pdf-result-text" style="left: 100px;">{{ passportNumber }}</span></p>
        <p class="pdf-text text-start text-fit">ที่อยู่เลขที่.....................................................หมู่ที่....................................ตรอก/ซอย.......................................................
          <span class="pdf-result-text" style="left: 80px;">{{ addressName }}</span>
          <span class="pdf-result-text" style="left: 280px;">{{ moo }}</span>
          <span class="pdf-result-text" style="left: 470px;">{{ soi }}</span>
        </p>
        <p class="pdf-text text-start text-fit">ถนน.................................................ตำบล/แขวง.......................................อำเภอ/เขต....................................................
          <span class="pdf-result-text" style="left: 80px;">{{ road }}</span>
          <span class="pdf-result-text" style="left: 280px;">{{ subDistrict }}</span>
          <span class="pdf-result-text" style="left: 480px;">{{ district }}</span>
        </p>
        <p class="pdf-text text-start text-fit">จังหวัด................................................รหัสไปรษณีย์.......................................โทรศัพท์....................................................
          <span class="pdf-result-text" style="left: 80px;">{{ province }}</span>
          <span class="pdf-result-text" style="left: 300px;">{{ postCode }}</span>
          <span class="pdf-result-text" style="right: 50px;">{{ contactNumber }}</span>
        </p>
        <p class="pdf-text text-start">ได้นำเข้าสินค้าที่ไม่ได้จำแนกประเภทไว้ในภาคที่ว่าด้วยของที่ได้รับยกเว้นอากรตามกฎหมายว่าด้วยพิกัดอัตราศุลกากร</p>
        <p class="pdf-text text-start">เพื่อวัตถุประสงค์</p>
        <div class="d-flex" style="margin-left: 60px;">
          <input type="checkbox" class="pdf-checkbox" :checked="importPurpose === 22" disabled>
          <label for="" class="pdf-text">นำสินค้าติดตัวเข้ามา</label>
        </div>
        <div class="d-flex" style="margin-left: 60px;">
          <input type="checkbox" class="pdf-checkbox" :checked="importPurpose === 23" disabled>
          <label for="" class="pdf-text">นำสินค้าเข้ามาเพื่อเป็นตัวอย่างสินค้า</label>
        </div>
        <div class="d-flex" style="margin-left: 60px;">
          <input type="checkbox" class="pdf-checkbox" :checked="importPurpose === 24" disabled>
          <label for="" class="pdf-text">นำสินค้าเข้ามาโดยมิใช่เพื่อการค้า</label>
        </div>
        <p class="pdf-text text-start">ดังต่อไปนี้</p>
        <table class="pdf-table">
          <tr>
            <th>ลำดับที่<br><span class="th-number">(1)</span></th>
            <th>ประเภท<br>สินค้า<br><span class="th-number">(2)</span></th>
            <th>ชื่อสินค้า<br><span class="th-number">(3)</span></th>
            <th>แบบ/รุ่น<br><span class="th-number">(4)</span></th>
            <th>ดีกรี/<br>ปริมาณน้ำตาล/<br>CO 2 /<br>น้ำหนัก /มวน<br><span class="th-number">(5)</span></th>
            <th>ขนาด<br><span class="th-number">(6)</span></th>
            <th>ปริมาณ<br>ที่<br>นำเข้า<br><span class="th-number">(7)</span></th>
            <th>ราคาที่ใช้<br>เป็นฐาน<br>หมายเหตุ<br>ในการ<br>คำนวณภาษี<br><span class="th-number">(8)</span></th>
            <th>หมายเหตุ<br><span class="th-number">(9)</span></th>
          </tr>
          <tr v-for="(wine, index) in firstArray" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ wine.WineLiquor.CategoryLabel }}</td>
            <td>{{ wine.WineLiquor.DisplayName }}</td>
            <td>{{ wine.WineLiquorPic.WineLiquorYear }}</td>
            <td>{{ wine.WineLiquorPic.Alcohol === 0 ? wine.Avb : wine.WineLiquorPic.Alcohol }}%</td>
            <td>{{ wine.BottleSize }}</td>
            <td>{{ wine.WineLiquorTotal }}</td>
            <td>{{ formatNumber(wine.InitialValue) }}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="pdf-file" id="pdf-content-page-2" style="margin-top: 20px;">
        <table class="pdf-table">
          <tr>
            <th>ลำดับที่<br><span class="th-number">(1)</span></th>
            <th>ประเภท<br>สินค้า<br><span class="th-number">(2)</span></th>
            <th>ชื่อสินค้า<br><span class="th-number">(3)</span></th>
            <th>แบบ/รุ่น<br><span class="th-number">(4)</span></th>
            <th>ดีกรี/<br>ปริมาณน้ำตาล/<br>CO 2 /<br>น้ำหนัก /มวน<br><span class="th-number">(5)</span></th>
            <th>ขนาด<br><span class="th-number">(6)</span></th>
            <th>ปริมาณ<br>ที่<br>นำเข้า<br><span class="th-number">(7)</span></th>
            <th>ราคาที่ใช้<br>เป็นฐาน<br>หมายเหตุ<br>ในการ<br>คำนวณภาษี<br><span class="th-number">(8)</span></th>
            <th>หมายเหตุ<br><span class="th-number">(9)</span></th>
          </tr>
          <tr v-for="(wine, index) in secondArray" :key="index">
            <td>{{ index + 6 }}</td>
            <td>{{ wine.WineLiquor.CategoryLabel }}</td>
            <td>{{ wine.WineLiquor.DisplayName }}</td>
            <td>{{ wine.WineLiquorPic.WineLiquorYear }}</td>
            <td>{{ wine.WineLiquorPic.Alcohol === 0 ? wine.Avb : wine.WineLiquorPic.Alcohol }}%</td>
            <td>{{ wine.BottleSize }}</td>
            <td>{{ wine.WineLiquorTotal }}</td>
            <td>{{ formatNumber(wine.InitialValue) }}</td>
            <td></td>
          </tr>
        </table>
        <p class="pdf-text">ข้าพเจ้าขอรับรองว่าข้อความดังกล่าวข้างต้นเป็นจริงและถูกต้องทุกประการ</p>
        <div class="sign-session">
          <p class="pdf-text text-center" style="margin-left: 130px;">(ลงชื่อ).........................</p>
          <p class="pdf-text text-center" style="margin-left: 130px;">(...........................)</p>
          <p class="pdf-text text-center" style="margin-left: 130px;">ผู้นำเข้า</p>
        </div>
      </div>
    </div>
    <div class="button-session">
      <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
      <button class="btn-next" @click="onConfirmClick">ยืนยันแบบฟอร์ม</button>
    </div>
    
  </div>
  <div v-if="spinner" class="overlay"></div>

  <div v-if="spinner" class="text-center-spinner">
    <div class="spinner-border" role="status"></div>
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
    // const pdfBase64 = ref('')
    const userData = ref([])

    const importerName = ref('')
    const userType = ref()
    const idNumber = ref('')
    const idNumberArray = ref([])
    const exciseNumber = ref('')
    const exciseNumberArray = ref([])
    const passportNumber = ref('')
    const addressName = ref('')
    const moo = ref('')
    const soi = ref('')
    const road = ref('')
    const subDistrict = ref('')
    const district = ref('')
    const province = ref('')
    const postCode = ref('')
    const contactNumber = ref('')
    const importPurpose = ref()
    const itemsArray = ref([])
    const firstArray = ref([])
    const secondArray = ref([])
    // const importPurpose = ref()

    const spinner = ref(false)
    

    const onConfirmClick = async () => {
      spinner.value = true;
      const pdfContentPage1 = document.getElementById('pdf-content-page-1');
      const canvasPage1 = await html2canvas(pdfContentPage1, {
        scale: 2, // Increase the scale for better clarity
        useCORS: true // Ensure cross-origin images are loaded
      });
      const imgDataPage1 = canvasPage1.toDataURL('image/png');

      const doc = new jsPDF();
      doc.addImage(imgDataPage1, 'PNG', 10, 10, 190, 0);

      const pdfContentPage2 = document.getElementById('pdf-content-page-2');
      console.log("It's second page", pdfContentPage2);
      if (pdfContentPage2) {
        const canvasPage2 = await html2canvas(pdfContentPage2, {
          scale: 2,
          useCORS: true
        });
        const imgDataPage2 = canvasPage2.toDataURL('image/png');

        doc.addPage();
        doc.addImage(imgDataPage2, 'PNG', 10, 10, 190, 0);
      }
      

      const pdfBlob = doc.output('blob');

      // Create a Blob URL
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Save the Blob URL in localStorage
      localStorage.setItem('generatedPdfUrl', pdfUrl);

      router.push('/scan-qr');
      spinner.value = false;
    };


    const onBackClick = () => {
      router.push('/wine-list-in-cart');
    };

    const fetchUserProfile = async () => {
      spinner.value = true
      const getUserData = await getUserProfile(token.value)
      console.log("User Data :", getUserData.data)
      userData.value = getUserData.data
      importerName.value = userData.value.FirstName + userData.value.LastName
      idNumber.value = userData.value.IDCard
      idNumberArray.value = userData.value.IDCard.split('')
      console.log("Id number array :", idNumberArray.value);
      exciseNumber.value = userData.value.ExciseNo
      exciseNumberArray.value = userData.value.ExciseNo ? userData.value.ExciseNo.split('') : ''
      userType.value = userData.value.FtUserTypeId
      passportNumber.value = userData.value.Passport ? userData.value.Passport : ''
      addressName.value = userData.value.AddrNo,
      moo.value = userData.value.Moo ? userData.value.Moo : ''
      soi.value = userData.value.Soi ? userData.value.Soi : ''
      road.value = userData.value.Street ? userData.value.Street : ''
      subDistrict.value = userData.value.SubDistrict ? userData.value.SubDistrict : ''
      district.value = userData.value.District ? userData.value.District : ''
      province.value = userData.value.Province ? userData.value.Province : ''
      postCode.value = userData.value.PostCode ? userData.value.PostCode : ''
      contactNumber.value = userData.value.Mobile ? userData.value.Mobile : userData.value.Phone
      spinner.value = false
    }

    const formatNumber = (value) => {
      const floatValue = parseFloat(value);
      return floatValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const formatDate = (data) => {
      const date = new Date(data);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    onMounted(async () => {
      cartItems.value = JSON.parse(localStorage.getItem('cartItemsToScan'));
      console.log('Cart Items:', cartItems.value);
      itemsArray.value = cartItems.value.Items
      if (itemsArray.value.length > 4) {
        firstArray.value = itemsArray.value.slice(0, 5);
        secondArray.value = itemsArray.value.slice(5);
      }
      importedDate.value = formatDate(cartItems.value.ImportPurpose.PurposeDate)
      importPurpose.value = cartItems.value.ImportPurpose.PurposeId
      token.value = localStorage.getItem('token')

      await fetchUserProfile()

      wineData.value = cartItems.value.Items
      console.log("WineData:", wineData.value)
     
    });

    return {
      pdfUrl,
      cartItems,
      importedDate,
      importerName,
      userType,
      idNumber,
      idNumberArray,
      exciseNumber,
      exciseNumberArray,
      passportNumber,
      addressName,
      moo,
      soi,
      road,
      subDistrict,
      district,
      province,
      postCode,
      contactNumber,
      importPurpose,
      itemsArray,
      firstArray,
      secondArray,
      spinner,
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
  width: 210mm; /* A4 width */
  min-height: 297mm; /* A4 height */
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
  position: relative;
}

.pdf-result-text {
  position: absolute;
  bottom: 3px;
}

.pdf-checkbox {
  margin-right: 5px;
  /* margin-bottom: 5px; */
}

input[type="checkbox" i] {
    appearance: none;
    width: 17px;
    height: 17px;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    /* cursor: pointer; */
    position: relative;
}

input[type="checkbox"]:checked {
    background-color: white; /* White background */
    border: 1px solid black;  /* Black border */
}

input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    /* top: 2px; */
    bottom: 1px;
    left: 4px;
    width: 7px;
    height: 15px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.text-fit {
  width: fit-content;
  word-break: break-word;
}

.pdf-table {
  width: 100%;
  border-collapse: collapse;
  /* margin-top: 20px; */
  margin-bottom: 10px
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

.sign-session {
 margin-top: 20px;
}

.th-number {
  align-self: flex-end;
}

@media print {
  .pdf-file {
        width: 210mm;
        height: 297mm;
        margin: 0;
        border: none; /* Remove border for printing */
        page-break-after: always; /* Ensure the content breaks correctly across pages */
    }

  input[type="checkbox" i] {
    appearance: none !important;
    width: 17px;
    height: 17px;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    /* cursor: pointer; */
    position: relative;
  }

  input[type="checkbox"]:checked {
      background-color: white; /* White background */
      border: 1px solid black;  /* Black border */
  }

  input[type="checkbox"]:checked::after {
      content: '';
      position: absolute;
      /* top: 2px; */
      bottom: 1px;
      left: 4px;
      width: 7px;
      height: 15px;
      border: solid black;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
  }
}
</style>