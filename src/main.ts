import app from "@/core/app";
import router from "@/core/router";
import pinia from "@/core/pinia";
import i18n from "@/core/i18n";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/css/main.css";

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(ElementPlus)
app.mount("#app");
