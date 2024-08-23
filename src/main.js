import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import GlobalComponents from "@/js/globalComponents";
import VueQrcodeReader from 'vue-qrcode-reader'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const app = createApp(App);

app.use(router);
app.use(GlobalComponents);
app.use(VueQrcodeReader)
// app.use(convertPdfToPng)
// app.component('VueSlider',VueSlider)

app.mount("#app");
