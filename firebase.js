import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* CONFIG FIREBASE */

const firebaseConfig = {
  apiKey: "AIzaSyAU9shDRZKZ5jBeHCm-e59aMIvDIoNBO8E",
  authDomain: "database-ordini-kitho.firebaseapp.com",
  projectId: "database-ordini-kitho",
  storageBucket: "database-ordini-kitho.firebasestorage.app",
  messagingSenderId: "711821639626",
  appId: "1:711821639626:web:f98d52f647d90282fed933",
  measurementId: "G-DL6NJX5J7T"
};

/* INIT */

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

/* EXPORT GLOBAL */

window.db = db;

window.addDoc = addDoc;

window.collection = collection;
