import app from "@/core/app";
import router from "@/core/router";
import pinia from "@/core/pinia";

import "@/assets/css/main.css";

app.use(router);
app.use(pinia);
app.mount("#app");
