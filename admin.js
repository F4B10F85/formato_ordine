import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

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

/* CONTAINER */

const ordersList =
  document.getElementById("ordersList");

/* LOAD ORDERS */

async function loadOrders() {

  const q = query(

    collection(db, "orders"),

    orderBy("createdAt", "desc")
  );

  const querySnapshot =
    await getDocs(q);

  ordersList.innerHTML = "";

  querySnapshot.forEach(docSnap => {

    const order =
      docSnap.data();

    const orderCard =
      document.createElement("div");

    orderCard.classList.add("order-card");

    orderCard.innerHTML = `

      <div class="order-top">

        <div>

          <div class="order-number">
            ${order.orderNumber}
          </div>

          <div class="order-date">
            ${new Date(order.createdAt)
              .toLocaleString("it-IT")}
          </div>

        </div>

        <div class="order-status">
          Nuovo
        </div>

      </div>

      <div class="customer-info">

        <div>
          <strong>Cliente:</strong>
          ${order.customerData.nome}
        </div>

        <div>
          <strong>Telefono:</strong>
          ${order.customerData.telefono}
        </div>

        <div>
          <strong>Email:</strong>
          ${order.customerData.email}
        </div>

      </div>

<div class="items-list">

  ${order.orderItems.map(item => `

    <div class="item-card">

      <div class="item-title">
        ${item.articolo}
      </div>

      <div class="item-grid">

        <div>
          <strong>Taglia:</strong>
          ${item.taglia || "-"}
        </div>

        <div>
          <strong>Altezza:</strong>
          ${item.altezza || "-"}
        </div>

        <div>
          <strong>Spessore:</strong>
          ${item.spessore || "-"}
        </div>

        <div>
          <strong>Pelle:</strong>
          ${item.pelle || "-"}
        </div>

        <div>
          <strong>Foglie:</strong>
          ${item.foglie || "-"}
        </div>

        <div>
          <strong>Cristalli:</strong>
          ${item.cristalli || "-"}
        </div>

        <div>
          <strong>Caramella:</strong>
          ${item.caramella || "-"}
        </div>

        <div>
          <strong>Quantità:</strong>
          ${item.quantita || "-"}
        </div>

      </div>

      ${item.note && item.note.trim() !== ""
        ? `
          <div class="item-notes">

            <strong>Note:</strong>

            ${item.note}

          </div>
        `
        : ""
      }

    </div>

  `).join("")}

</div>

    `;

    ordersList.appendChild(orderCard);

  });

}

loadOrders();
