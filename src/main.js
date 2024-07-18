import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import GlobalComponents from "@/js/globalComponents";
// import convertPdfToPng from "@/js/convertPdfToPng"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
// import VueSlider from 'vue3-slider'
// import 'vue-slider-component/theme/default.css'

const app = createApp(App);

app.use(router);
app.use(GlobalComponents);
// app.use(convertPdfToPng)
// app.component('VueSlider',VueSlider)

app.mount("#app");
