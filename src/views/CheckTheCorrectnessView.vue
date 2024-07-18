<template>
    <div class="custom-container">
        <div class="header-card">
            <h1 class="text-start">ตรวจสอบความถูกต้องของการปิดแสตมป์</h1>
        </div>
        <div class="product-card">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" class="table-header blue-text">ลำดับ</th>
                        <th scope="col" class="table-header blue-text">วันที่ประมาณนำเข้า</th>
                        <th scope="col" class="table-header blue-text text-start">วัตถุประสงค์ในการนำเข้า</th>
                        <th scope="col" class="table-header blue-text">พิกัดนำเข้า</th>
                        <th scope="col" class="table-header blue-text">ขนาด</th>
                        <th scope="col" class="table-header blue-text">ปริมาณ ที่นำเข้า</th>
                        <th scope="col" class="table-header blue-text">ราคาที่ใช้เป็นฐาน ในการคำนานภาษี</th>
                        <th scope="col" class="table-header blue-text">สถานะ</th>
                        <th scope="col" class="table-header blue-text">สถานะการ ชำระภาษี</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="(wine, index) in paginatedItems" :key="wine.Id">
                        <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                        <td style="text-decoration: underline; cursor: pointer;">{{ wine.ImportPurpose && wine.ImportPurpose.PurposeDate ? formatDate(wine.ImportPurpose.PurposeDate) : ''}}</td>
                        <td class="text-start" style="text-decoration: underline; cursor: pointer;" @click="onImportWineClick(wine.Id, wine.IsStatus)">{{ wine.ImportPurpose && wine.ImportPurpose.PurposeLabel ? wine.ImportPurpose.PurposeLabel : ''}}</td>
                        <td>{{ wine.ImportPurpose && wine.ImportPurpose.CheckpointLabel ? wine.ImportPurpose.CheckpointLabel : '' }}</td>
                        <td>{{ calculateTotalQuantity(wine.Items) }}  ขวด</td>
                        <td>{{ formatNumber(calculateTotalPrice(wine.Items)) }} บาท</td>
                        <td>
                            <span v-if="wine.IsStatus === 0" class="red-text" >ไวน์ยังไม่ถูกนำเข้า</span>
                            <span v-else class="blue-text">ไวน์ถูกนำเข้าแล้ว</span>
                        </td>
                        <td>
                            <span v-if="wine.IsStatus !== 2" class="red-text">ยังไม่ชำระภาษี</span>
                            <span v-else class="blue-text">ชำระภาษีแล้ว</span>
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    }
}
</script>