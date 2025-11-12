import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAetTGpNfynd-BobFpTqGiktsUhe42F6F8",
  authDomain: "rent-wheels-client.firebaseapp.com",
  projectId: "rent-wheels-client",
  storageBucket: "rent-wheels-client.firebasestorage.app",
  messagingSenderId: "367222967085",
  appId: "1:367222967085:web:1fb06930bb78db7a9a21a4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)