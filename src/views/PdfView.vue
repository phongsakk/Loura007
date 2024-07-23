<template>
  <div class="pdf-container">
    <!-- <img :src="" alt=""> -->
    <iframe :src="pdfUrl" width="50%" height="900px"></iframe>
  </div>
  <div class="button-session">
    <button class="btn-back" @click="onBackClick">ย้อนกลับ</button>
    <button class="btn-next" @click="onConfirmClick">ยืนยันแบบฟอร์ม</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { PDFDocument } from 'pdf-lib'
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

import { getUserProfile } from '@/api/getUserData'

export default {
  setup() {
    const router = useRouter();
    const token = ref('')
    const pdfUrl = ref('');
    const cartItems = ref([]);
    const importedDate = ref('');
    const base64 = ref('');
    const wineData = ref([])
    let sarabunFont = null;
    const pdfBase64 = ref('')
    const userData = ref([])

    const fetchImage = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load image');
      }
      return await response.arrayBuffer();
    };

    const loadSarabunFont = async (pdfDoc) => {
      try {
        const fontBytes = await fetch('/assets/file/Sarabun-Regular.ttf').then((res) => res.arrayBuffer());
        const sarabunFont = await pdfDoc.embedFont(fontBytes, { subset: true });
        return sarabunFont;
      } catch (error) {
        console.error('Error loading Sarabun font:', error);
        return null;
      }
    };

    const generatePdf = async () => {
      try {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);
        const pageWidth = 595;
        const pageHeight = 842;
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        if (!sarabunFont) {
          sarabunFont = await loadSarabunFont(pdfDoc);
          if (!sarabunFont) {
            throw new Error('Failed to load Sarabun font.');
          }
        }
        // const sarabunFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 10;

        const cartData = {
          importDate: formatDate(cartItems.value.ImportPurpose.PurposeDate),
          importerName: userData.value.FirstName + ' ' + userData.value.LastName,
          importerId: userData.value.IDCard,
          userType: userData.value.FtUserTypeId,
          exciseId: userData.value.ExciseNo,
          passportId: userData.value.Passport,
          addressName: userData.value.AddrNo,
          addressMoo: userData.value.Moo,
          addressSoi: userData.value.Soi,
          addressRoad: userData.value.Street,
          addressSubDistrict: userData.value.SubDistrict,
          addressDistrict: userData.value.District,
          province: userData.value.Province,
          postelCode: userData.value.PostCode,
          phoneNumber: userData.value.Phone ? userData.value.Phone : userData.value.Mobile,
          importPurpose: cartItems.value.ImportPurpose.PurposeId,
        };

        // const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const { width, height } = page.getSize();
        // const fontSize = 12;
        console.log("Width :", width, "Height :", height)

        // Add image
        const imageURL = '/assets/file/image/fcf82d976c3f6fdb-pages-1.png'; // Ensure this is the correct path to a PNG file
        const imageBytes = await fetchImage(imageURL);
        const image = await pdfDoc.embedPng(imageBytes);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });

        page.drawText(`${cartData.importDate}`, {
          x: width - 230,
          y: height - 100,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.importerName}`, {
          x: 120,
          y: height - 142,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        if (cartData.userType === 19) {
          page.drawText('/', {
            x: 74,
            y: height - 165,
            size: 16,
            font: sarabunFont,
            color: rgb(0, 0, 0),
          });
        } else if (cartData.userType === 20) {
          page.drawText('/', {
            x: 155,
            y: height - 165,
            size: fontSize,
            font: sarabunFont,
            color: rgb(0, 0, 0),
          });
        }

        if (cartData.importPurpose === 22) {
          page.drawText('/', {
            x: 127,
            y: height - 376,
            size: 16,
            font: sarabunFont,
            color: rgb(0, 0, 0),
          });
        } else if (cartData.importPurpose === 23) {
          page.drawText('/', {
            x: 127,
            y: height - 397,
            size: 16,
            font: sarabunFont,
            color: rgb(0, 0, 0),
          });
        } else if (cartData.importPurpose === 24) {
          page.drawText('/', {
            x: 127,
            y: height - 420,
            size: 16,
            font: sarabunFont,
            color: rgb(0, 0, 0),
          });
        }

        // Draw importer's Id
        console.log(addSpacesBetweenNumbers);
        const importerIdBits = `${cartData.importerId}`.split("");
        let XAxis = 222;
        for (const bit of importerIdBits) {
          page.drawText(bit, {
            x: XAxis+=13,
            y: height - 208,
            size: 13,
            font: sarabunFont,
            color: rgb(0, 0, 0),
          });
        }

        page.drawText(`${cartData.addressName}`, {
          x: 120,
          y: height - 270,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.addressMoo}`, {
          x: 280,
          y: height - 270,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.addressSoi}`, {
          x: 380,
          y: height - 270,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.addressRoad}`, {
          x: 100,
          y: height - 290,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.addressDistrict}`, {
          x: 430,
          y: height - 290,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.addressSubDistrict}`, {
          x: 280,
          y: height - 290,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.province}`, {
          x: 110,
          y: height - 312,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.postelCode}`, {
          x: 280,
          y: height - 312,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${cartData.phoneNumber}`, {
          x: 405,
          y: height - 312,
          size: fontSize,
          font: sarabunFont,
          color: rgb(0, 0, 0),
        });

        // Add table
        // const items = [
        //   ...cartItems.value
        // ];

        const tableTop = height - 540;
        const tableLeft = 80;
        const rowHeight = 20;

        // let index = 0;
        wineData.value.forEach((item, index) => {
          const y = tableTop - rowHeight * (index + 1);

          page.drawText(String(index + 1), {
            x: tableLeft,
            y,
            size: fontSize,
            font: sarabunFont,
            color: rgb(0, 0, 0)
          });

          if (item.WineLiquor.CategoryLabel) {
            page.drawText(String(item.WineLiquor.CategoryLabel), {
              x: tableLeft + 30,
              y,
              size: fontSize,
              font: sarabunFont,
              color: rgb(0, 0, 0)
            });
          }

          if (item.WineLiquor.DisplayName) {
            page.drawText(String(item.WineLiquor.DisplayName), {
              x: tableLeft + 85,
              y,
              size: 10,
              font: sarabunFont,
              color: rgb(0, 0, 0)
            });
          }

          if (item.WineLiquorPic.WineLiquorYear) {
            page.drawText(String(item.WineLiquorPic.WineLiquorYear), {
              x: tableLeft + 175,
              y,
              size: fontSize,
              font: sarabunFont,
              color: rgb(0, 0, 0)
            });
          }

          if (item.WineLiquorPic.Alcohol) {
            page.drawText(String(item.WineLiquorPic.Alcohol), {
              x: tableLeft + 255,
              y,
              size: fontSize,
              font: sarabunFont,
              color: rgb(0, 0, 0)
            });
          }

          if (item.BottleSize) {
            page.drawText(formatBottleSize(item.BottleSize), {
              x: tableLeft + 310,
              y,
              size: fontSize,
              font: sarabunFont,
              color: rgb(0, 0, 0)
            });
          }

          if (item.WineLiquorTotal) {
            page.drawText(String(item.WineLiquorTotal), {
              x: tableLeft + 368,
              y,
              size: fontSize,
              font: sarabunFont,
              color: rgb(0, 0, 0)
            });
          }

          page.drawText(formatNumber(item.InitialValue), {
            x: tableLeft + 395,
            y,
            size: fontSize,
            font: sarabunFont,
            color: rgb(0, 0, 0)
          });

          // index += 1;
        });

        const pdfBytes = await pdfDoc.save();
        pdfBase64.value = arrayBufferToBase64(pdfBytes);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error generating PDF:', error);
        return null;
      }
    };

    const arrayBufferToBase64 = (buffer) => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    const onConfirmClick = () => {
      localStorage.setItem('generatedPdf', pdfBase64.value);

      router.push('/scan-qr');
    };

    const onBackClick = () => {
      router.push('/wine-list-in-cart');
    };

    const formatDate = (data) => {
      const date = new Date(data);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const addSpacesBetweenNumbers = (numberString) => {
      return numberString?.split('').join('  ') ?? '';
    };

    const formatBottleSize = (text) => {
      const match = text.match(/\d+ml/);
      return match ? match[0] : text;
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
      const pdfDataUri = await generatePdf();
      if (pdfDataUri) {
        pdfUrl.value = pdfDataUri;
      } else {
        console.error('Failed to generate PDF.');
      }
    });

    return {
      pdfUrl,
      cartItems,
      importedDate,
      base64,
      onBackClick,
      onConfirmClick,
      formatNumber
    };
  },
};
</script>



<style scoped>
.pdf-container {
  position: relative;
  background-color: #3D3E3E;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
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
</style>