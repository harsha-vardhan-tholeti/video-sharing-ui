import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRHTYvYFo6dT7xAxZkP_kHfL-vsxXFqfs",
  authDomain: "video-app-6cfd0.firebaseapp.com",
  projectId: "video-app-6cfd0",
  storageBucket: "video-app-6cfd0.appspot.com",
  messagingSenderId: "604499801116",
  appId: "1:604499801116:web:b4685286e82794dd555bd9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
