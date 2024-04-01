import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars);

const app = createApp(App);

// Use BootstrapVue and IconsPlugin with app.use()
app.use(BootstrapVue);
app.use(IconsPlugin);

// Register global components
library.add(faBars);
app.component('font-awesome-icon', FontAwesomeIcon);

// Mount the app and specify the element to mount on
app.use(router);
app.mount('#app');