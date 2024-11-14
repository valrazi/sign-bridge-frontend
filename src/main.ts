import app from "@/core/app";
import pinia from "@/core/pinia";
import i18n from "@/core/i18n";

import "@/assets/css/main.css";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faChevronDown, faChevronUp, faDove, faLocationDot, faMinus, faPlus, faShapes, faTag } from '@fortawesome/free-solid-svg-icons'

import {faClock} from '@fortawesome/free-regular-svg-icons'


/* add icons to the library */
library.add(faShapes, faChevronUp, faChevronDown, faClock, faLocationDot, faPlus, faMinus, faTag, faDove)

app.use(pinia);
app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#tixfly-sdk");
