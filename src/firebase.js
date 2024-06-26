import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase,ref} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAH7kIlzyv7rz_CYDSr-xGD-ScUe-of2w",
  authDomain: "trening-app-23e3a.firebaseapp.com",
  projectId: "trening-app-23e3a",
  storageBucket: "trening-app-23e3a.appspot.com",
  messagingSenderId: "49806710285",
  appId: "1:49806710285:web:d27772c52c774ac2662744",
  databaseURL:"https://trening-app-23e3a-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;