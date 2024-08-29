<template>
  <div class="custom-container">
    <div class="header-card">
      <h1 class="text-start">รายการไวน์ในตระกร้า</h1>
    </div>
    <div class="import-card">
      <div class="row text-start">
        <div class="col-4 horizontal-divider-before">
          <p class="import-header">พิกัดนำเข้า</p>
          <p class="import-text">{{ importCheckpoint }}</p>
        </div>
        <div class="col-4 horizontal-divider-before">
          <p class="import-header">วัตถุประสงค์ในการนำเข้า</p>
          <p class="import-text">{{ importPurpose }}</p>
        </div>
        <div class="col-4 horizontal-divider-before">
          <p class="import-header">วันที่นำเข้าโดยประมาณ</p>
          <p class="import-text">{{ importDate }}</p>
        </div>
      </div>
    </div>
    <div v-for="wine in itemsArray" :key="wine.Id">
      <div class="product-card">
        <div class="row">
          <div
            class="col-lg-2 d-flex align-items-center justify-content-center"
          >
            <div class="wine-image-card">
              <img
                :src="`https://storage.googleapis.com/tbit-excise.appspot.com/${wine.WineLiquorPic?.Path}`"
                alt=""
                class="card-image"
              />
            </div>
          </div>
          <div class="col-lg-7 horizontal-divider">
            <div
              class="d-flex justify-content-between"
              style="padding-top: 10px"
            >
              <div class="category">
                <p class="category-name" style="margin-bottom: 0px">
                  <span class="category-icon"
                    ><img
                      src="../assets/img/wine-img1.png"
                      class="category-image" /></span
                  >{{ wine.WineLiquor?.CategoryLabel }}
                </p>
              </div>
              <div class="year">
                <p class="form-label" style="margin-bottom: 0px">
                  ปีที่ผลิต
                  <span class="manu-year">{{
                    wine.WineLiquorPic?.WineLiquorYear
                  }}</span>
                </p>
              </div>
            </div>
            <div class="row text-start">
              <p class="wine-name-display text-start">
                {{ wine.WineLiquor?.DisplayName }}
              </p>
            </div>
            <div class="row text-start">
              <div class="col-3">
                <label class="form-label">ประเทศที่ผลิต</label>
                <p style="margin-bottom: 0px">{{ wine.WineLiquor?.Country }}</p>
              </div>
              <div class="col-3">
                <label class="form-label">ปริมาณแอลกอฮอล์</label>
                <p style="margin-bottom: 0px">
                  alc. {{ wine.WineLiquorPic?.Alcohol }} % vol.
                </p>
              </div>
              <div class="col-6">
                <label class="form-label">ขนาดภาชนะ (มิลลิลิตร)</label>
                <p style="margin-bottom: 0px">{{ wine.BottleSize }}</p>
              </div>
            </div>
            <div class="row text-start">
              <div class="col-3">
                <label class="form-label">ภาษีสรรพสามิต</label>
                <p style="margin-bottom: 0px">
                  {{ formatNumber(wine.ExciseTax) }} บาท
                </p>
              </div>
              <div class="col-3">
                <label class="form-label">ภาษีท้องถิ่น</label>
                <p style="margin-bottom: 0px">
                  {{ formatNumber(wine.TotalTax) }} บาท
                </p>
              </div>
              <div class="col-3">
                <label class="form-label">เงินบำรุงกองทุน</label>
                <p style="margin-bottom: 0px">
                  {{ formatNumber(wine.Fund) }} บาท
                </p>
              </div>
              <div class="col-3">
                <label class="form-label">ภาษีศุลกากร</label>
                <p style="margin-bottom: 0px">
                  {{ formatNumber(wine.CustomsDuty) }} บาท
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 price-col text-end">
            <label class="form-label bold">มูลค่าเบื้องต้น</label>
            <p class="price-text" style="margin-bottom: 0px">
              {{ formatNumber(wine.InitialValue) }} บาท
            </p>
            <p for="" class="form-label bold">รวมภาษีและเงินกองทุนทั้งหมด</p>            
            <p class="price-text" style="margin-bottom: 0px">
              {{ formatNumber(wine.TotalTax) }} บาท
            </p>
            <p class="form-label" style="margin-bottom: 0px">
              จำนวน 1 ขวด
            </p>
            <button
              class="btn-scan"
              :class="{ 'verify-success': wine.isVerified || isQRCodeVerified(wine.Id) }"
              @click="handleScanClick(wine.Id)"
              :disabled="wine.isVerified || isQRCodeVerified(wine.Id)"
            >
              <img
                v-if="!wine.isVerified && !isQRCodeVerified(wine.Id)"
                src="../assets/img/scan-icon.png"
                alt=""
                class="scan-icon"
              />
              {{ wine.isVerified || isQRCodeVerified(wine.Id) ? "ตรวจสอบแสตมป์ไวน์เรียบร้อยแล้ว" : "สแกนแสตมป์" }}
            </button>
            <transition name="fade">
              <div v-if="isPopupVisible" class="overlay" @click="hidePopup"></div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="summary-card">
      <div class="d-flex justify-content-between">
        <p class="text-start summary-label">ปริมาตรไวน์ในตะกร้า</p>
        <p class="text-end summary-value">{{ totalLiter }} /10 ลิตร</p>
      </div>
      <div class="d-flex justify-content-between">
        <p class="text-start summary-label">รวมจำนวนไวน์นำเข้าทั้งหมด</p>
        <p class="text-end summary-value">{{ totalQty }} ขวด</p>
      </div>
      <div class="d-flex justify-content-between">
        <p class="text-start summary-label">มูลค่าที่ใช้ในการคำนวนภาษี</p>
        <p class="text-end summary-value">
          {{ formatNumber(totalInitialValue) }} บาท
        </p>
      </div>
      <hr class="divider-line" />
      <div class="d-flex justify-content-between">
        <p class="text-start summary-label" style="font-weight: 700">
          รวมภาษีและเงินกองทุนทั้งหมด
        </p>
        <p class="text-end summary-value">
          {{ formatNumber(totalTaxAll) }} บาท
        </p>
      </div>
      <div style="padding: 10px 100px">
        <button class="btn-downloadQr" @click="handleScanClick2">
          <img
            src="../assets/img/after-upload-icon.png"
            alt=""
            class="upload-button"                        
          />เพิ่มรูปภาพฉลาก
        </button>
        <div class="d-flex justify-content-center">
          <button class="btn-previous" @click="onPreviousClick">
            ย้อนกลับ
          </button>
          <button class="btn-save" @click="onPreviousClick">ยืนยัน</button>
        </div>
        <transition name="fade">
              <div v-if="isPopupVisible2" class="overlay" @click="hidePopup2"></div>
        </transition>
      </div>
    </div>
  </div>
  <div id="app">
    <transition name="fade">
      <div v-if="isPopupVisible" class="popup">
        <p>ค้นหาด้วยชื่อ</p>
        <div class="search-bar">
          <input type="text" placeholder="ชื่อไวน์" />
          <button>ค้นหา</button>
        </div>
        <div class="box-upload-image">
          <input
            type="file"
            class="image-input"
            id="image-input"
            accept="image/*"
            @change="onUploadPreview"
          />
          <div v-if="imageUrl">
            <img :src="imageUrl" class="img-preview" alt="Image Preview" />
          </div>
          <div v-else>
            <label for="image-input" class="upload-label">
              <img
                src="../assets/img/upload-icon.png"
                alt=""
                class="upload-image"
              />
              <p>ค้นหารูปภาพ</p>
              <p>วางไฟล์รูปตรงนี้ หรือ เลือกไฟล์รูป</p>
            </label>
          </div>
          <canvas ref="canvas" style="display: none"></canvas>
        </div>      
        <div class="button-container-popup">
          <button @click="hidePopup" class="button-popup-1">ย้อนหลัง</button>
          <button @click="confirmUpload" class="button-popup-2">ยืนยัน</button>
        </div>
      </div>
    </transition>
  </div>
  <div id="app">
    <transition name="fade">
      <div v-if="isPopupVisible2" class="popup">        
        <div class="box-upload-image">
          <input
            type="file"
            class="image-input"
            id="image-input"
            accept="image/*"
            @change="onUploadPreview"            
          />
          <div v-if="imageUrl">
            <img :src="imageUrl" class="img-preview" alt="Image Preview" />
          </div>
          <div v-else>
            <label for="image-input" class="upload-label">
              <img
                src="../assets/img/upload-icon.png"
                alt=""
                class="upload-image"
              />
              <p>ค้นหารูปภาพ</p>
              <p>วางไฟล์รูปตรงนี้ หรือ เลือกไฟล์รูป</p>
            </label>
          </div>
          <canvas ref="canvas" style="display: none"></canvas>
        </div>      
        <div class="button-container-popup">
          <button @click="hidePopup2" class="button-popup-1">ย้อนหลัง</button>
          <button class="button-popup-2" @click="onSaveImage">ยืนยัน</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getCartItem,    
} from "@/api/getWineSearch";
import { getBottleSize } from "@/api/getWineSearch.js";
import { getEnumGroup } from "@/api/getMaster";
import { getQRCode, getScanQRCodeStampOfficer } from "@/api/getQRData";
import QrCode from "qrcode-reader";


export default {
  setup() {
    const router = useRouter();
    const cartItems = ref([]);
    const QRItems = ref([]);
    const itemsArray = ref([]);
    const importCartId = ref("");
    const token = ref("");
    const importPurposeList = ref([]);
    const importPurpose = ref("");
    const importCheckpoint = ref("");
    const checkpointList = ref([]);
    const checkpoint = ref("");
    const importDate = ref("");
    const isChecked = ref(false);
    const isUploaded = ref(false);
    const uploadModal = ref(false);    
    const algoliaImageResults = ref([]);
    const wineSearch = ref([]);    
    const bottleSize = ref("");
    const bottleSizes = ref([]);    
    const vintage = ref("");    
    const addArray = ref([]);
    const isNewWine = ref(false);    
    const years = ref([]);
    const taxByPrice = ref(5);
    const taxByValue = ref(1000);
    const taxByFund = ref(1.175);
    const spinner = ref(false);
    const notFoundAlert = ref(false);
    const totalLiter = ref(0);
    const totalQty = ref(0);
    const totalInitialValue = ref(0);
    const totalTaxAll = ref(0);
    const isPopupVisible = ref(false);
    const isPopupVisible2 = ref(false);
    const imageUrl = ref(null);
    const base64String = ref("");
    const isVerified = ref(false);
    const qrData = ref("");
    const selectedWineId = ref(null);
    const isFromScanClick = ref(false);

    const showPopup = () => {
      isPopupVisible.value = true;
      isFromScanClick.value = false; 
    };

    const hidePopup = () => {
      isPopupVisible.value = false;
      imageUrl.value = null;
    };

    const handleScanClick = (wineId) => {
      selectedWineId.value = wineId;
      showPopup();
    };

    const isQRCodeVerified = (wineId) => {      
      const matchedItem = itemsArray.value.find((item) => item.Id === wineId);        
      return matchedItem && matchedItem.QRCode !== null;
    };

    const showPopup2 = () => {
      isPopupVisible2.value = true;
      isFromScanClick.value = true; 
    };

    const hidePopup2 = () => {
      isPopupVisible2.value = false;
      imageUrl.value = null;
    };

    const handleScanClick2 = () => {
      showPopup2();
    };

    const onUploadPreview = (event) => {
      const file = event.target.files[0];      
     
      if (file && file.type.startsWith('image/')) {
        imageUrl.value = URL.createObjectURL(file);
        console.log('correct image', imageUrl.value);       
        
        if (isFromScanClick.value) {          
          convertToBase64(file);
        } else {          
          readImage(file);
        }

      } else {        
        imageUrl.value = null;
        base64String.value = '';
      }
    };

    const convertToBase64 = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        base64String.value = e.target.result; 
        console.log('Base64 String:', base64String.value); 
      };
      reader.readAsDataURL(file);
    };

    const readImage = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.querySelector("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);

          const qr = new QrCode();
          qr.callback = (error, result) => {
            if (error) {
              console.error("QR Code scanning error:", error);
              return;
            }
            qrData.value = result.result;
            console.log("QR Code detected:", qrData.value);
          };
          qr.decode(canvas.toDataURL());
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const confirmUpload = async () => {
      spinner.value = true;

      const id = selectedWineId.value; 

      const stampQRData = {
        BottleId: id,
        SNNO: qrData.value.trim(),
      };

      console.log("stampQRData:", JSON.stringify(stampQRData));

      const validateData = (data) => {
        if (!data.BottleId) {
          console.error("Invalid bottleId");
          return false;
        }
        if (typeof data.SNNO !== "string" || data.SNNO.trim() === "") {
          console.error("Invalid snno value");
          return false;
        }
        return true;
      };

      if (!validateData(stampQRData)) {
        spinner.value = false;
        return;
      }

      try {
        const getStampQRData = await getScanQRCodeStampOfficer(
          stampQRData,
          token.value
        );
        console.log(getStampQRData);

        if (getStampQRData.code === 400) {
          console.error(
            "Error:",
            getStampQRData.message || "Unable to process the request"
          );
          spinner.value = false;
        } else {
          const matchedItem = itemsArray.value.find(
            (item) => item.Id === stampQRData.BottleId
          );

          if (matchedItem) {
            matchedItem.isVerified = true; 
          }

          spinner.value = false;
          hidePopup();
        }
      } catch (error) {
        console.error("Error:", error);
        spinner.value = false;
      }
    };    

    // const onSaveImage = async () => {
    //   spinner.value = true;
    //   const StampItems = {
    //     cartId: itemsArray.value.map(item => item.CartId),
    //     stampItems : itemsArray.value.map(item => ({                        
    //                     CartId: item.CartId,
    //                     CartItemId : item.WineLiquorId,
    //                     WineLiquorPicId : item.WineLiquorPicId || '',
    //                     ImageLabel : item.quantity,
    //                     ReceiptNo : item.BottleSize,                        
    //                   }))
    //   }
      
    // }

    const onPreviousClick = () => {
      router.push({ name: "check-the-correctness" });
    };

    const calculateValues = (item) => {
      const bottleSizeToCalculate =
        item.BottleSize === "Bottle (750ml)" ||
        item.BottleSize === "Half Bottle (375ml)"
          ? extractBottleSizeMl(item.BottleSize) / 1000
          : extractBottleSizeL(item.BottleSize);
      const itemExciseTaxByDuty = item.RecommendMinPrice * 0 * 0.01;
      const itemExciseTaxByValue =
        (item.AVB / 100) * bottleSizeToCalculate * taxByValue.value;
      const itemCalTaxByDuty =
        (item.RecommendMinPrice + itemExciseTaxByDuty) *
        (taxByPrice.value / 100);
      const itemCalTaxByValue =
        itemExciseTaxByValue * taxByFund.value * (taxByPrice.value / 100);
      const itemCalTaxByFund = 1 - taxByFund.value * (taxByPrice.value / 100);
      console.log({
        itemExciseTaxByValue,
        itemCalTaxByDuty,
        itemCalTaxByValue,
        itemCalTaxByFund,
      });
      const itemExciseTaxByPrice =
        (itemCalTaxByDuty + itemCalTaxByValue) / itemCalTaxByFund;
      const itemExciseTaxByTotal = itemExciseTaxByValue + itemCalTaxByDuty;
      const itemExternalLocal = 0.1 * itemExciseTaxByTotal;
      const itemExternalFund = 0.075 * itemExciseTaxByTotal;
      const itemExternalTotal =
        itemExciseTaxByTotal + itemExternalLocal + itemExternalFund;
      const itemFAndI = 0.11 * item.RecommendMinPrice;

      return {
        itemExciseTaxByDuty,
        itemExciseTaxByValue,
        itemCalTaxByDuty,
        itemCalTaxByValue,
        itemCalTaxByFund,
        itemExciseTaxByPrice,
        itemExciseTaxByTotal,
        itemExternalLocal,
        itemExternalFund,
        itemExternalTotal,
        itemFAndI,
      };
    };

    const calculateSummary = (Items) => {      
      totalLiter.value = Items?.reduce((acc, cur) => {
        const q = cur.WineLiquorTotal || cur.quantity;
        return (
          acc +
          q *
            (cur.BottleSize === "Bottle (750ml)" ||
            cur.BottleSize === "Half Bottle (375ml)"
              ? extractBottleSizeMl(cur.BottleSize) / 1000
              : extractBottleSizeL(cur.BottleSize))
        );
      }, 0);
      totalQty.value = Items?.reduce((acc, cur) => {
        const q = cur.WineLiquorTotal || cur.quantity;
        return acc + q;
      }, 0);
      totalInitialValue.value = Items?.reduce((acc, cur) => {
        const q = cur.WineLiquorTotal || cur.quantity;
        const value = cur.InitialValue || cur.RecommendMinPrice;
        return acc + q * value;
      }, 0);
      totalTaxAll.value = Items?.reduce((acc, cur) => {
        const q = cur.WineLiquorTotal || cur.quantity;
        const t =
          cur.TotalTax || parseFloat(cur.externalTotal.replace(/,/g, ""));
        return acc + q * t;
      }, 0);
    };

    const generateYearsArray = () => {
      const currentYear = new Date().getFullYear();
      years.value.push("NV");
      for (let year = currentYear; year >= currentYear - 200; year--) {
        years.value.push(year);
      }
      return years;
    };

    const formatDate = (data) => {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const fetchCartItem = async () => {
      spinner.value = true;
      const getCartData = await getCartItem(importCartId.value, token.value);
      const getQRData = await getQRCode(importCartId.value, token.value);      
      QRItems.value = getQRData.data;
      cartItems.value = getCartData.data;       
      console.log("check Id",QRItems.value)     
      checkpoint.value = cartItems.value.ImportPurpose.Checkpoint;
      importCheckpoint.value = cartItems.value.ImportPurpose.CheckpointLabel;
      importPurpose.value = cartItems.value.ImportPurpose.PurposeLabel;
      importDate.value = new Date(cartItems.value.ImportPurpose.PurposeDate)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '/');      
      itemsArray.value =
        QRItems.value.map((item) => {
          const display = cartItems.value.Items.find(
            (cartItem) => cartItem.Id === item.CartItemId
          );          
          return {
            ...display,
            ...item,
            isChecked: isChecked.value,
            isUploaded: isUploaded.value,
          };          
        }) || [];      
      calculateSummary(cartItems.value.Items);
      console.log('test',itemsArray.value)

      spinner.value = false;
    };    

    const fetchImportPurpose = async () => {
      const enumGroup = "FtImportPurpose";
      const importPurposeData = await getEnumGroup(enumGroup);
      importPurposeList.value = importPurposeData.data;
    };

    const fetchCheckpoint = async () => {
      const enumGroup = "FtCheckPoint";
      const checkpointData = await getEnumGroup(enumGroup);
      checkpointList.value = checkpointData.data;
    };

    const fetchBottleSizes = async () => {
      const enumGroup = "BottleSize";
      const fetchSizes = await getBottleSize(enumGroup);
      bottleSizes.value = fetchSizes.data;
      bottleSize.value = fetchSizes.data[0].EnumName;
    };

    const extractBottleSizeMl = (bottleSize) => {
      const match = bottleSize.match(/(\d+(\.\d+)?)\s*ml/i);
      return match ? parseFloat(match[1]) : 0;
    };

    const extractBottleSizeL = (bottleSize) => {
      const match = bottleSize.match(/(\d+(\.\d+)?)\s*L/i);
      return match ? parseFloat(match[1]) : 0;
    };

    const formatNumber = (value) => {
      const floatValue = parseFloat(value);
      return floatValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };   

    onMounted(() => {
      importCartId.value = localStorage.getItem("importCartId");
      token.value = localStorage.getItem("token");
      fetchCartItem();      
      fetchBottleSizes();
      fetchImportPurpose();
      fetchCheckpoint();
      generateYearsArray();
    });

    return {
      isChecked,
      isUploaded,
      cartItems,
      cardItems: QRItems,
      itemsArray,
      importPurposeList,
      importPurpose,
      importCheckpoint,
      checkpointList,
      checkpoint,
      importDate,
      uploadModal,      
      algoliaImageResults,      
      spinner,
      notFoundAlert,
      wineSearch,
      bottleSize,
      bottleSizes,
      vintage,
      years,
      totalLiter,
      totalQty,
      totalInitialValue,
      totalTaxAll,      
      addArray,
      isNewWine,
      onPreviousClick,
      formatNumber,      
      isPopupVisible,
      showPopup,
      hidePopup,
      isPopupVisible2,
      showPopup2,
      hidePopup2,
      onUploadPreview,
      imageUrl,
      base64String,
      confirmUpload,
      handleScanClick,
      handleScanClick2,
      isVerified,
      selectedWineId,
      calculateValues,
      formatDate,
      isQRCodeVerified,      
    };
  },
};
</script>

<style scoped>
.product-card {
  margin-top: 20px;
  padding: 0px 20px;
  box-shadow: 0px 2px 6px #00000080;
  border-radius: 14px;
}

.import-card {
  margin-top: 20px;
  padding: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 6px #00000080;
  border-radius: 14px;
}

.import-header {
    font-size: 18px;
    font-weight: 700;
    color: #2B476D;
}

.btn-scan {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 700;
  background-color: #2b476d;
  width: 100%;
  height: 44px;
  color: #ffffff;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
}

.btn-previous {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 700;
  background-color: #77818a;
  width: 50%;
  height: 44px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  margin-right: 3px;
}

.btn-save {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 700;
  width: 50%;
  height: 44px;
  background-color: #2b476d;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  margin-left: 3px;
}

.btn-downloadQr {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  height: 44px;
  background-color: #162848;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
}

.image-input {
  display: none;
  position: absolute;
  cursor: pointer;
  z-index: 1;
}

.upload-icon {
  width: 50px;
  height: auto;
  margin-bottom: 10px;
}

.scan-icon {
  width: auto;
  height: 15px;
  margin-right: 10px;
}

.upload-image {
  width: 43px;
  height: 49px;
  background-color: #ffffff;
  margin: 0 10px;
}

.popup {
  position: fixed;
  top: 130px;
  left: 231px;
  width: 905px;
  height: 519px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000080;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.popup > p {
  width: 94px;
  height: 23px;
  margin: 10px 15px;
  text-align: left;
  font: normal normal normal 18px/32px Sarabun;
  letter-spacing: 0px;
  color: #2b476d;
}

.search-bar {
  text-align: left;
  margin-left: 15px;
}

.search-bar input {
  padding: 10px;
  width: 692px;
  height: 38px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #2b476d;
  border-radius: 5px;
}

.search-bar button {
  margin-left: 10px;
  width: 149px;
  height: 38px;
  background: #2b476d 0% 0% no-repeat padding-box;
  border-radius: 5px;
  color: #ffffff;
  font: normal normal bold 20px/32px Prompt;
}
.box-upload-image {
  margin: 100px 0px;
}

.upload-button {
  width: 14px;
  height: 14px;
  margin: 0px 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
}

.popup .button-container-popup {
  margin-top: auto;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.button-popup-1 {
  width: 166px;
  height: 44px;
  background: #77818a 0% 0% no-repeat padding-box;
  border-radius: 5px;
  font: normal normal bold 18px/29px Prompt;
  letter-spacing: 0px;
  color: #ffffff; 
}

.button-popup-2 {
  width: 166px;
  height: 44px;
  background: #2b476d 0% 0% no-repeat padding-box;
  border-radius: 5px;
  font: normal normal bold 18px/29px Prompt;
  letter-spacing: 0px;
  color: #ffffff;
}

.img-preview {
  max-width: 150px;
  height: 150px;
  margin-top: 10px;
}

.verify-success {
  background-color: #ffffff;
  border: #5ED15E 1px solid;
  color: #5ED15E;
  font: normal normal bold 16px/26px Prompt;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
