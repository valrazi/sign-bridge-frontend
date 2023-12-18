import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

let locale = localStorage.getItem("locale") || navigator.language.slice(0, 2);

if (messages && !messages[locale]) {
  locale = "en";
}

const i18n = createI18n({
  locale,
  messages,
});

export default i18n;
