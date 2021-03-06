import { firestore } from '@/firebase/firebase';
import { FirestoreService } from '@/services/FirestoreService';
import _Vue from 'vue';

export const firestorePlugin = {
  install (app: _Vue.App<Element>) {
    app.config.globalProperties.$firestoreService = new FirestoreService(firestore);
    return app;
  }
}
