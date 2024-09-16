import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/main.css";
import terminal from "virtual:terminal";
import { router } from "./router";
import { createPinia } from "pinia";
globalThis.console = terminal;
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
