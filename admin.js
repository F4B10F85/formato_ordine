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

  apiKey: "TUA_API_KEY",

  authDomain: "TUO_AUTH_DOMAIN",

  projectId: "TUO_PROJECT_ID",

  storageBucket: "TUO_STORAGE",

  messagingSenderId: "TUO_SENDER_ID",

  appId: "TUO_APP_ID"
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

          <div class="item-row">

            <strong>${item.articolo}</strong>

            · ${item.taglia}

            · ${item.pelle}

            · Qta: ${item.quantita}

          </div>

        `).join("")}

      </div>

    `;

    ordersList.appendChild(orderCard);

  });

}

loadOrders();
