import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB4PFExXKztIjRuPwvNpFfUEwURRSqISbI',
  authDomain: 'alexandartodorov-2344f.firebaseapp.com',
  databaseURL: 'https://alexandartodorov-2344f.firebaseio.com',
  projectId: 'alexandartodorov-2344f',
  storageBucket: 'alexandartodorov-2344f.appspot.com',
  messagingSenderId: '679350340527',
  appId: '1:679350340527:web:e10e28f44de81b866a3d5a',
  measurementId: 'G-3JP8PL5RCY'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebase.storage();