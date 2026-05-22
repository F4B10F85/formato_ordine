import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc
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

const auth =
  getAuth(app);

/* CONTAINER */

const ordersList =
  document.getElementById("ordersList");

const searchOrders =
  document.getElementById("searchOrders");

const statusFilter =
  document.getElementById("statusFilter");

const totalOrders =
  document.getElementById("totalOrders");

const newOrders =
  document.getElementById("newOrders");

const progressOrders =
  document.getElementById("progressOrders");

const completedOrders =
  document.getElementById("completedOrders");




/* ---------------------- */
/* STATUS COLORS */
/* ---------------------- */

function getStatusClass(status) {

  switch (status) {

    case "Nuovo":
      return "status-new";

    case "In lavorazione":
      return "status-progress";

    case "Completato":
      return "status-completed";

    case "Spedito":
      return "status-shipped";

    default:
      return "";
  }
}







/* LOAD ORDERS */

async function loadOrders() {

  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot =
    await getDocs(q);

  ordersList.innerHTML = "";
  
  let total = 0;
  let newCount = 0;
  let progressCount = 0;
  let completedCount = 0;
  
  querySnapshot.forEach(docSnap => {

    const order =
      docSnap.data();
  
    total++;

    if (order.status === "Nuovo") {
      newCount++;
    }
    
    if (order.status === "In lavorazione") {
      progressCount++;
    }
    
    if (order.status === "Completato") {
      completedCount++;
    }

    
    const searchValue =
      searchOrders.value.toLowerCase();

    const selectedStatus =
      statusFilter.value;

    const matchesSearch =

      order.orderNumber?.toLowerCase().includes(searchValue)

      ||

      order.customerData.nome
        ?.toLowerCase()
        .includes(searchValue)
    
      ||

      order.customerData.telefono
        ?.toLowerCase()
        .includes(searchValue)
    
      ||

      order.customerData.email
        ?.toLowerCase()
        .includes(searchValue);

    const matchesStatus =

      selectedStatus === "Tutti"
    
      ||

      order.status === selectedStatus;

    if (
  !matchesSearch ||
  !matchesStatus
) {
  return;
}

    
    const orderCard =
      document.createElement("div");

    orderCard.classList.add("order-card");

    orderCard.innerHTML = `

      <div class="order-top clickable">

        <div>

          <div class="order-number">
            ${order.orderNumber}
          </div>

        </div>

       <select
  class="order-status ${getStatusClass(order.status)}"
  data-id="${docSnap.id}"
>

  <option value="Nuovo"
    ${order.status === "Nuovo" ? "selected" : ""}
  >
    Nuovo
  </option>

  <option value="In lavorazione"
    ${order.status === "In lavorazione" ? "selected" : ""}
  >
    In lavorazione
  </option>

  <option value="Completato"
    ${order.status === "Completato" ? "selected" : ""}
  >
    Completato
  </option>

  <option value="Spedito"
    ${order.status === "Spedito" ? "selected" : ""}
  >
    Spedito
  </option>

</select>

      </div>

    <div class="order-details">

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

</div>
    `;

   ordersList.appendChild(orderCard);

const orderTop =
  orderCard.querySelector(".order-top");

orderTop.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("order-status")
  ) {
    return;
  }

  orderCard.classList.toggle("collapsed");

});


    
/* ---------------------- */
/* STATUS CHANGE */
/* ---------------------- */

const statusSelect =
  orderCard.querySelector(".order-status");

statusSelect.addEventListener("change", async () => {

  const newStatus =
    statusSelect.value;

  await updateDoc(

    doc(db, "orders", docSnap.id),

    {
      status: newStatus
    }

  );

  statusSelect.className =
    `order-status ${getStatusClass(newStatus)}`;

});

});

totalOrders.textContent =
  total;

newOrders.textContent =
  newCount;

progressOrders.textContent =
  progressCount;

completedOrders.textContent =
  completedCount;

  
}

searchOrders.addEventListener(
  "input",
  loadOrders
);

statusFilter.addEventListener(
  "change",
  loadOrders
);


/* ---------------------- */
/* AUTH CHECK */
/* ---------------------- */

onAuthStateChanged(auth, (user) => {

  if (!user) {

    const email =
      prompt("Email admin");

    const password =
      prompt("Password");

    signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    .then(() => {
      loadOrders();
    })

    .catch(() => {
      alert("Accesso negato");
      location.reload();
    });

  }

  else {

    loadOrders();

  }

});

