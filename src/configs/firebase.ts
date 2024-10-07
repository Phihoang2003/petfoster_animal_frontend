import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAgAGJmzZGjMpHAkj1xJtceyvtxyZIbZ94",
//   authDomain: "chat-app-petfoster.firebaseapp.com",
//   projectId: "chat-app-petfoster",
//   storageBucket: "chat-app-petfoster.appspot.com",
//   messagingSenderId: "651379250403",
//   appId: "1:651379250403:web:9c95dac0505b3d8a8521d6",
// };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
