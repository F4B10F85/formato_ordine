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

let monthlyChartInstance = null;
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

/* ----------------------- */
/* CALCOLO STATISTICHE-KPI */
/* ----------------------- */

function calculateStatistics(orders) {

  const statusMap = {};
  
  const productsRevenueMap = {};
  
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

    const status =
      order.status || "Sconosciuto";
    
    if (!statusMap[status]) {
    
      statusMap[status] = 0;
    
    }
    
    statusMap[status]++;

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

      const revenue =
        qty *
        Number(item.unitPrice || 0);
      
      if (
        !productsRevenueMap[item.articolo]
      ) {
        productsRevenueMap[item.articolo] = 0;
      }
      
      productsRevenueMap[item.articolo] +=
        revenue;
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

  renderRevenueProducts(
    productsRevenueMap
  );

  renderOrdersByStatus(
    statusMap
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

function renderMonthlyChart(
  monthlyRevenue
) {

  const labels =
    Object.keys(monthlyRevenue)
      .sort();

  const values =
    labels.map(
      month => monthlyRevenue[month]
    );

  const ctx =
    document
      .getElementById("monthlyChart")
      .getContext("2d");

  if (monthlyChartInstance) {
    monthlyChartInstance.destroy();
  }

  monthlyChartInstance =
    new Chart(ctx, {

      type: "bar",

      data: {

        labels,

        datasets: [
          {
            label:
              "Fatturato (€)",

            data: values,

            borderWidth: 1,

            borderRadius: 8
          }
        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {
            display: false
          }

        },

        scales: {

          y: {
            beginAtZero: true
          }

        }

      }

    });

}

function renderRevenueProducts(
  productsRevenueMap
) {

  const container =
    document.getElementById(
      "productsRevenue"
    );

  const sorted =
    Object.entries(
      productsRevenueMap
    ).sort(
      (a,b) => b[1] - a[1]
    );

  container.innerHTML =
    sorted.map(
      ([name, revenue]) => `
        <div>
          ${name}
          - ${revenue.toFixed(2)} €
        </div>
      `
    ).join("");

}

function renderOrdersByStatus(
  statusMap
) {

  const container =
    document.getElementById(
      "ordersByStatus"
    );

  const sorted =
    Object.entries(statusMap)
      .sort(
        (a,b) => b[1] - a[1]
      );

  container.innerHTML =
    sorted.map(
      ([status, qty]) => {

        let className =
          "status-card";

        switch(status) {

          case "Nuovo":
            className +=
              " status-new";
            break;

          case "In produzione":
            className +=
              " status-production";
            break;

          case "Spedito":
            className +=
              " status-shipped";
            break;

          case "Consegnato":
            className +=
              " status-delivered";
            break;

        }

        return `
          <div class="${className}">
            <div>
              ${status}
            </div>

            <div>
              ${qty}
            </div>
          </div>
        `;

      }).join("");

}
