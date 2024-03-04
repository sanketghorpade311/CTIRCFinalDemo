import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQHwdqD9dMKZb8weTWJKyOqJGrq2hcnfU",
  authDomain: "testdata-2c36d.firebaseapp.com",
  projectId: "testdata-2c36d",
  storageBucket: "testdata-2c36d.appspot.com",
  messagingSenderId: "89860395547",
  appId: "1:89860395547:web:004e4312dd0568f1051ebe",
  measurementId: "G-3JR0N8F9SK",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

{
  /*
CTIRC Original

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAh_YWKXHdWvyzyPxwcjGJL8aGhib3lTeA",
  authDomain: "ctirc-13732.firebaseapp.com",
  projectId: "ctirc-13732",
  storageBucket: "ctirc-13732.appspot.com",
  messagingSenderId: "989557345551",
  appId: "1:989557345551:web:ddccd11628ef875093c27a",
  measurementId: "G-7SL1YTS0Q6",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
*/
}
