// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDPwZSgUGl79-_y9Ond-yfuWhT3SsO_pY",
  authDomain: "doctors-portal-ecf29.firebaseapp.com",
  projectId: "doctors-portal-ecf29",
  storageBucket: "doctors-portal-ecf29.appspot.com",
  messagingSenderId: "550796883154",
  appId: "1:550796883154:web:b3616b8d52d8410dbba90b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;