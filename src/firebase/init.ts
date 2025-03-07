// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "BBXrJ6Rt7KFpv4alyuxSDDHPbZLuTBGXS0ihU40rWffTMcFd4TWSfgeR5Epi62_cHnpGJeP7rsmXJVtHuTkXFxU",
  authDomain: "oprec-itdevecs.firebaseapp.com",
  projectId: "oprec-itdevecs",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);
export { storage, db };
