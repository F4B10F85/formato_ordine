/* --------------------- */
/* COLLEGAMENTO FIREBASE */
/* --------------------- */

import {
  collection,
  getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

/* ------------------ */
/* CARICAMENTO ORDINI */
/* ------------------ */

async function loadStatistics() {

  const snapshot =
    await getDocs(
      collection(db, "orders")
    );

  const orders =
    snapshot.docs.map(
      doc => doc.data()
    );

  calculateStatistics(
    orders
  );
}

loadStatistics();

/* ----------- */
/* CALCOLO KPI */
/* ----------- */

function calculateStatistics(orders) {

  const monthlyRevenue =
  buildMonthlyRevenue(orders);

  renderMonthlyChart(
    monthlyRevenue
  );
  
  let totalRevenue = 0;

  let totalPieces = 0;

  const productsMap = {};

  orders.forEach(order => {

    totalRevenue +=
      Number(order.totalValue || 0);

    order.orderItems.forEach(item => {

      const qty =
        Number(item.quantita || 0);

      totalPieces += qty;

      if (
        !productsMap[item.articolo]
      ) {

        productsMap[item.articolo] = 0;
      }

      productsMap[item.articolo] += qty;

    });

  });

  document.getElementById(
    "totalRevenue"
  ).textContent =
    totalRevenue.toFixed(2) + " €";

  document.getElementById(
    "totalOrders"
  ).textContent =
    orders.length;

  document.getElementById(
    "totalPieces"
  ).textContent =
    totalPieces;

  document.getElementById(
    "averageOrder"
  ).textContent =
    (
      totalRevenue /
      orders.length
    ).toFixed(2) + " €";

  renderTopProducts(
    productsMap
  );
}

/* -------------*/
/* TOP ARTICOLI */
/* -------------*/

function renderTopProducts(
  productsMap
) {

  const container =
    document.getElementById(
      "topProducts"
    );

  const sorted =
    Object.entries(productsMap)
      .sort(
        (a,b) => b[1] - a[1]
      );

  container.innerHTML =
    sorted.map(
      ([name, qty]) => `
        <div>
          ${name}
          - ${qty} pezzi
        </div>
      `
    ).join("");
}

/* ------------------------- */
/* GRAFICO FATTURATO MENSILE */
/* ------------------------- */

function buildMonthlyRevenue(orders) {

  const monthlyMap = {};

  orders.forEach(order => {

    const month =
      order.month || "Sconosciuto";

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }

    monthlyMap[month] +=
      Number(order.totalValue || 0);

  });

  return monthlyMap;
}

/* ------------------------------ */
/* VERIFICA VELOCE SENZA LIBRERIE */
/* ------------------------------ */

function renderMonthlyChart(
  monthlyRevenue
) {

  const container =
    document.getElementById(
      "monthlyChart"
    );

  const entries =
    Object.entries(monthlyRevenue)
      .sort();

  const maxValue =
    Math.max(
      ...entries.map(
        entry => entry[1]
      )
    );

  container.innerHTML =
    entries.map(
      ([month, value]) => {

        const width =
          (value / maxValue) * 100;

        return `
          <div class="chart-row">

            <span>
              ${month}
            </span>

            <div class="bar-container">

              <div
                class="bar"
                style="
                  width:${width}%;
                "
              ></div>

            </div>

            <span>
              € ${value.toFixed(2)}
            </span>

          </div>
        `;
      }
    ).join("");

}
