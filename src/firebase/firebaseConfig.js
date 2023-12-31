import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjqA6lATf3_B82A9OGQKyS7ONIqZwxcoM",
  authDomain: "book-hub-client-b46b2.firebaseapp.com",
  projectId: "book-hub-client-b46b2",
  storageBucket: "book-hub-client-b46b2.appspot.com",
  messagingSenderId: "243418042084",
  appId: "1:243418042084:web:665b0fd40215b3742126f1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;