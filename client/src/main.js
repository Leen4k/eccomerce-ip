import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia"
import router from "./router"
import PrimeVue from 'primevue/config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastService from 'primevue/toastservice';
import { VueQueryPlugin } from '@tanstack/vue-query'
import axios from 'axios'


// axios.defaults.baseURL = 'http://localhost:7000' || 'https://fakestoreapi.com';
axios.defaults.baseURL = 'http://localhost:7000';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app');
