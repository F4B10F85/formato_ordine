import {
  collection,
  query,
  where,
  getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

const searchBtn =
  document.getElementById("searchBtn");

const resultBox =
  document.getElementById("resultBox");

searchBtn.addEventListener(
  "click",
  searchOrder
);

async function searchOrder() {

  const orderNumber =
    document
      .getElementById("orderNumberInput")
      .value
      .trim();

  if (!orderNumber) return;

  const q = query(
    collection(db, "orders"),
    where("orderNumber", "==", orderNumber)
  );

  const snapshot =
    await getDocs(q);

  if (snapshot.empty) {

    resultBox.innerHTML = `
      <div class="result-card">
        Ordine non trovato
      </div>
    `;

    return;
  }

  const order =
    snapshot.docs[0].data();

  renderOrder(order);
}
