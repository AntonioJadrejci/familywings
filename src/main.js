import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Step 1: Import BootstrapVue and IconsPlugin


// Import Bootstrap and BootstrapVue CSS


// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add FontAwesome icon to the library
library.add(faBars);

// Register global component for FontAwesome
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

// Use BootstrapVue and IconsPlugin with app.use()


// Mount the app and specify the element to mount on
app.use(router);
app.mount('#app');