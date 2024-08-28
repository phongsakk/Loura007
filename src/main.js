import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import GlobalComponents from "@/js/globalComponents";
import * as VueQrcodeReader from 'vue-qrcode-reader'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const app = createApp(App);

app.use(router);
app.use(GlobalComponents);
app.use(VueQrcodeReader)
app.mount("#app");
