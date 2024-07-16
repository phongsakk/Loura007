<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: "Sarabun", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  /* margin-top: 60px; */
}

.custom-container {
    padding: 15px 40px;
}

.header-card {
    font-family: "Prompt", sans-serif;
    width: 100%;
    height: 103px;
    padding: 35px;
    /* background-color: #2B476D; */
    background-image: url('./assets/img/header-bg-image.png');
    background-size: cover;
    background-position: center;
    color: #FFFFFF;
    box-shadow: 0px 3px 6px #00000080;
    border-radius: 13px;
    vertical-align: middle;
}

.header-card h1 {
    font-size: 28px;
    font-weight: 700;
}

.horizontal-divider {
    position: relative;
    padding: 20px;
}

.horizontal-divider ::after {
    content: "";
    position: absolute;
    top: 20px;
    bottom: 20px;
    right: 0;
    border-left: 2px solid #A7A7A7;
}

.horizontal-divider-before {
    position: relative;
    padding: 5px 20px;
}

.horizontal-divider-before::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: #A7A7A7;
}

.divider-line {
    border-top: 2px solid #A7A7A7;
    margin-top: 20px;
}

.btn-back {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin-right: 5px;
    background-color: #77818A;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    width: 166px;
    height: 44px;
}

.btn-confirm {
    font-family: "Prompt", sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin-left: 5px;
    background-color: #2B476D;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    width: 166px;
    height: 44px;
}

.form-label {
    color: #2B476D;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 0 !important;
}

.form-input {
    width: 100%;
    height: 40px;
    box-shadow: 0px 3px 6px #00000029 !important;
    border: 1px solid #CACACA !important;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: #3D3E3E;
    padding: 10px 10px 13px 10px;
}

.form-input:focus,
.form-input:focus:not([readonly]) {
    outline: 1px solid #3D3E3E;
}

.select {
    width: 100%;
    height: 40px;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #CACACA !important;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: #3D3E3E;
}

.select:focus,
.select:focus:not([readonly]) {
    outline: 1px solid #3D3E3E;
}

.buttons {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.sub-header {
    color: #2B476D;
    font-size: 22px;
    font-weight: 700;
    margin: 20px 0px;
}

.quantity-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quantity-input {
    width: 72.5px;
    height: 33px;
    margin: 0px 10px;
    border-radius: 5px;
    background-color: #EAEAEA;
    border: none;
}

.btn-count {
    width: 33px;
    height: 33px;
    background-color: #77818A;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    border: none;
    border-radius: 5px;
}

.search-image-card {
    width: 157px;
    height: 157px;
    padding: 20px;
    margin: 20px 0px;
    box-shadow: 0px 3px 6px #00000065;
    border-radius: 6px;
}

.search-image {
    width: fit-content;
    height: 100%;
}

.summary-card {
    margin-top: 20px;
    padding: 30px 30%;
    /* display: flex;
    justify-content: center; */
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.summary-button {
    padding-top: 20px;
    display: flex;
    justify-content: center;
}

.summary-label {
    font-size: 20px;
}

.summary-value {
    font-size: 20px;
    font-weight: 700;
    color: #2B476D;
} 

.table-card {
    margin-top: 30px;
    padding: 20px 40px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.table>thead {
    vertical-align: middle;
    color: #2B476D !important;
    border-color: #2B476D;
}

tbody, td, tfoot, th, thead, tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
    height: 60px;
    vertical-align: middle;
}

.table-header {
    color: #2B476D;
    font-weight: 700;
}

.input-grey {
    background-color: #EAEAEA;
}

.red-text {
    color : #FF5757 !important;
}

.blue-text {
    color: #2B476D !important;
}

.payment-success {
    display: flex;
    justify-content: center;
}

.payment-success-text {
    color: #5ED15E;
    font-size: 32px;
    font-weight: 700;
}

.price-col {
    padding: 20px 30px 20px 10px !important;
}

.position-relative {
  position: relative;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1099;
}

.text-center-spinner {
    position: absolute;
    top: calc(100vh - 50%);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1099;
}

.spinner-border {
    color: white;
    width: 4rem;
    height: 4rem;
}

.tax-text {
    font-size: 8px;
    color: #77818A;

}

.required-text {
    color: #ED1C24;
    font-size: 16px;
    font-weight: 700;
    /* margin-left: 5px; */
}

.category-icon {
    padding-bottom: 5px;
}

.category-image {
    height: 50px;
    width: auto;
}

.text-blue {
    color: #2B476D;
}

.wine-image-card {
    width: 220px;
    height: 220px;
    padding: 20px;
    margin: 30px 0px;
    box-shadow: 0px 3px 6px #00000065;
    border-radius: 6px;
}

.card-image {
    width: fit-content;
    height: 100%;
}

.product-card {
    margin-top: 20px;
    padding: 0px 20px;
    box-shadow: 0px 2px 6px #00000080;
    border-radius: 14px;
}

.error-text {
    font-size: 14px;
    color: red;
    margin-bottom: 5px !important;
}

.pagination-session {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 65px;
    padding-left: 40px;
    padding-right: 40px;
    /* margin-bottom: 15px; */
}

.pagination-icon {
    padding: 0px 10px;
}

.total-items {
    font-size: 18px;
    font-weight: 700;
}

.current-page {
    padding: 0px 10px;
    color: #282928;
    font-weight: 700;
}

.not-current-page {
    padding: 0px 10px;
    color: #B1B1B1;
    font-weight: 700;
    cursor: pointer;
}

.action-icon {
    width: 20px;
    height: auto;
    cursor: pointer;
}

.disabled-action-icon {
    width: 20px;
    height: auto;
}
</style>
