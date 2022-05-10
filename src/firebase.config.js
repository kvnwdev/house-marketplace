import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXSOOtMyti5eyjNH2RJYVWY64zxrndexE',
  authDomain: 'house-marketplace-app-9847c.firebaseapp.com',
  projectId: 'house-marketplace-app-9847c',
  storageBucket: 'house-marketplace-app-9847c.appspot.com',
  messagingSenderId: '499816543224',
  appId: '1:499816543224:web:2d1cbf4765625842209c0d',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
