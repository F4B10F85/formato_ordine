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




function renderOrder(order) {

  const products =
    order.orderItems
      .map(item => {

        return `
          <li>
            ${item.articolo}
            (${item.quantita})
          </li>
        `;
      })
      .join("");

  let trackingButton = "";

  if (
    order.trackingCode &&
    order.trackingCode.trim() !== ""
  ) {

    trackingButton = `

      <p>

        Tracking GLS:

        <strong>
          ${order.trackingCode}
        </strong>

      </p>

     <button
  class="track-shipment-btn"
  data-tracking="${order.trackingCode}"
>
  Traccia spedizione
</button>
    `;
  }

  resultBox.innerHTML = `

    <div class="result-card">

      <h2>

        ${order.orderNumber}

      </h2>

      <div class="status">

        ${order.status}

      </div>

      <p>

        Cliente:
        ${order.customerData.nome}

      </p>

      <p>

        Data:
        ${new Date(
          order.createdAt
        ).toLocaleDateString("it-IT")}

      </p>

      <h3>

        Articoli

      </h3>

      <ul>

        ${products}

      </ul>

      ${trackingButton}

    </div>

  `;
}





