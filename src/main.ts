// Vue
import { createApp } from 'vue';

// Main Component
import App from './App.vue';

// Plugins
import { authPlugin } from './plugins/AuthPlugin';
import { firestorePlugin } from './plugins/FirestorePlugin';

// Router
import router from './router';

// Styles
import './style.scss';


createApp(App)
  .use(router)
  .use(authPlugin)
  .use(firestorePlugin)
  .mount('#app');
