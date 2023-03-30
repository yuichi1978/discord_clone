import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw65zLPbgSItKspSADeVslNCtK3ZMoqfU",
  authDomain: "discord-clone-udemy-a16a1.firebaseapp.com",
  projectId: "discord-clone-udemy-a16a1",
  storageBucket: "discord-clone-udemy-a16a1.appspot.com",
  messagingSenderId: "169662299814",
  appId: "1:169662299814:web:c41c3e5f0ae73f6c833e67"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };