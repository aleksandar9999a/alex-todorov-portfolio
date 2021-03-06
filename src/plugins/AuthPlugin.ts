import { auth } from '@/firebase/firebase';
import { AuthService } from '@/services/AuthService';
import _Vue from 'vue';

export const authPlugin = {
  install (app: _Vue.App<Element>) {
    app.config.globalProperties.$authService = new AuthService(auth);
    return app;
  }
}
