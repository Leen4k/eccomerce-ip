import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZQtEt6Xy5-gs7x291O07BIq5g14zKKnQ",
  authDomain: "ecommerce-ip.firebaseapp.com",
  projectId: "ecommerce-ip",
  storageBucket: "ecommerce-ip.appspot.com",
  messagingSenderId: "111433235559",
  appId: "1:111433235559:web:e54fb1d6f7f32c20e4e8c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};


