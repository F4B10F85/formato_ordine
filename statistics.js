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

let productRevenueChartInstance = null;
let monthlyChartInstance = null;
let allOrders = [];

async function loadStatistics() {

  const snapshot =
    await getDocs(
      collection(db, "orders")
    );

  allOrders =
    snapshot.docs.map(
      doc => doc.data()
    );
  
  calculateStatistics(
    allOrders
  );
}

loadStatistics();

document
  .getElementById(
    "periodFilter"
  )
  .addEventListener(
    "change",
    applyFilter
  );



/* ----------------------- */
/* CALCOLO STATISTICHE-KPI */
/* ----------------------- */

function calculateStatistics(orders) {

  const statusMap = {};

  const revenueStatusMap = {};
  
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

    if (!revenueStatusMap[status]) {

      revenueStatusMap[status] = 0;
    
    }
    
    revenueStatusMap[status] +=
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
    totalRevenue.toLocaleString(
      "it-IT",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    ) + " €";

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
  
    orders.length
  
    ? (
        totalRevenue /
        orders.length
      ).toLocaleString(
        "it-IT",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      ) + " €"
  
    : "0,00 €";

  renderTopProducts(
    productsMap
  );

  renderRevenueProducts(
    productsRevenueMap
  );

  renderProductRevenueChart(
    productsRevenueMap
  );
  
  renderOrdersByStatus(
    statusMap
  );

  renderRevenueByStatus(
    revenueStatusMap
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
            beginAtZero: true,
            ticks: { 
              callback: function(value) {
                return value.toLocaleString(
                  "it-IT"
                ) + " €";
              }
            }
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
          - ${revenue.toLocaleString(
              "it-IT",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }
            )} €
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

const order = [

  "Nuovo",

  "In lavorazione",

  "Completato",

  "Spedito"

];

const sorted =
  order
    .filter(
      status => statusMap[status]
    )
    .map(
      status => [
        status,
        statusMap[status]
      ]
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
        
          case "In lavorazione":
            className +=
              " status-production";
            break;
        
          case "Completato":
            className +=
              " status-delivered";
            break;
        
          case "Spedito":
            className +=
              " status-shipped";
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

function applyFilter() {

  const filter =
    document.getElementById(
      "periodFilter"
    ).value;

  const now =
    new Date();

  let filteredOrders =
    [...allOrders];

  if (filter === "today") {

    const today =
      now.toISOString()
        .split("T")[0];

    filteredOrders =
      allOrders.filter(
        order =>
          order.day === today
      );

  }

  else if (
    filter === "30"
  ) {

    filteredOrders =
      allOrders.filter(
        order => {

          const orderDate =
            new Date(
              order.createdAt
            );

          const diff =
            (
              now -
              orderDate
            ) /
            (
              1000 *
              60 *
              60 *
              24
            );

          return diff <= 30;

        }
      );

  }

  else if (
    filter === "90"
  ) {

    filteredOrders =
      allOrders.filter(
        order => {

          const orderDate =
            new Date(
              order.createdAt
            );

          const diff =
            (
              now -
              orderDate
            ) /
            (
              1000 *
              60 *
              60 *
              24
            );

          return diff <= 90;

        }
      );

  }

  else if (
    filter === "year"
  ) {

    const currentYear =
      now.getFullYear();

    filteredOrders =
      allOrders.filter(
        order =>
          Number(order.year) ===
          currentYear
      );

  }

  calculateStatistics(
    filteredOrders
  );

}


function renderRevenueByStatus(
  revenueStatusMap
) {

  const container =
    document.getElementById(
      "revenueByStatus"
    );

  const order = [

    "Nuovo",

    "In lavorazione",

    "Completato",

    "Spedito"

  ];

  const sorted =
    order.map(
      status => [

        status,

        revenueStatusMap[
          status
        ] || 0

      ]
    );

  container.innerHTML =
    sorted.map(
      ([status, revenue]) => {

        let className =
          "status-card";

        switch(status) {

          case "Nuovo":
            className +=
              " status-new";
            break;

          case "In lavorazione":
            className +=
              " status-production";
            break;

          case "Completato":
            className +=
              " status-delivered";
            break;

          case "Spedito":
            className +=
              " status-shipped";
            break;

        }

        return `

          <div class="${className}">

            <div>
              ${status}
            </div>

            <div>

              ${revenue.toLocaleString(
                "it-IT",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }
              )} €

            </div>

          </div>

        `;

      }
    ).join("");

}

function renderProductRevenueChart(
  productsRevenueMap
) {

  const labels =
    Object.keys(productsRevenueMap);

  const values =
    Object.values(productsRevenueMap);

  const ctx =
    document
      .getElementById(
        "productRevenueChart"
      )
      .getContext("2d");
  if (
    productRevenueChartInstance
  ) {
    productRevenueChartInstance
      .destroy();
  }

  productRevenueChartInstance =
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
            beginAtZero: true,        
            ticks: {
              callback: function(value) {
                return value.toLocaleString(
                  "it-IT"
                ) + " €";
              }
            }
          }
        }
      }
    });
}
