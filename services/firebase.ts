import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../constants/credentials";

export const firebaseApp = initializeApp(firebaseConfig);
