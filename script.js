const orderRows = document.getElementById("orderRows");
const addRowBtn = document.getElementById("addRowBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const validateBtn = document.getElementById("validateBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");

/* ---------------------- */
/* DATI GLOBALI */
/* ---------------------- */

const coloriPelle = [
  "giallo",
  "arancione",
  "salvia",
  "verde",
  "bianco",
  "rosso",
  "ciliegia",
  "bordeaux",
  "rosa",
  "azzurro",
  "petrolio",
  "blu",
  "nero",
  "marrone",
  "beige",
  "viola"
];

const coloriFoglie = [
  "SENZA FOGLIE",
  
  "bianco",
  "beige",
  "taupe",
  "giallo",
  "arancione",
  "salvia",
  "verde",
  "rosso",
  "bordeaux",
  "rosa",
  "azzurro",
  "royal blue",
  "nero"
];

const coloriCristalli = [
  "SENZA CRISTALLI",
  
  "bianco",
  "topaz",
  "verde",
  "rosso",
  "rosa",
  "azzurro",
  "nero"
];

/* ---------------------- */
/* CONFIGURAZIONE ARTICOLI */
/* ---------------------- */

const products = {

  "collare-standard": {
    nome: "Collare standard",
    image: "collare_standard.jpg",

    taglie: [
      "XXS (light)",
      "XS (light)",
      "S (light)",
      "S",
      "M",
      "L",
      "XL",
      "Personalizzata"
    ],

    altezze: {
      "XXS (light)": "1,5 cm",
      "XS (light)": "1,5 cm",
      "S (light)": "2 cm",
      "S": "2 cm",
      "M": "2,5 cm",
      "L": "3 cm",
      "XL": "3 cm",
      "Personalizzata": "Personalizzata"
    },

    spessore: "Non disponibile",

    caramella: "Non disponibile",

    foglieDisabled: [
      "XXS (light)",
      "XS (light)"
    ]
  },

  "collare-caramella": {
    nome: "Collare caramella",
    image: "collare_caramella.jpg",

    taglie: [
      "XS",
      "S",
      "M",
      "L",
      "Personalizzata"
    ],

    altezze: {
      "XS": "1,5 cm",
      "S": "2 cm",
      "M": "2,5 cm",
      "L": "3 cm",
      "Personalizzata": "Personalizzata"
    },

    spessore: "Non disponibile",

    caramellaOptions: [
      "Con tassello",
      "Senza tassello"
    ]
  },

  "collare-maniglia": {
    nome: "Collare con maniglia",
    image: "collare_maniglia.jpg",

    taglie: [
      "S",
      "M",
      "L",
      "XL",
      "Personalizzata"
    ],

    altezzeSelect: [
      "3 cm",
      "4 cm",
      "5 cm",
      "Personalizzata"
    ],

    spessore: "Non disponibile",

    caramella: "Non disponibile"
  },

"pettorina": {
  nome: "Pettorina",

  image: "pettorina.jpg",

  taglie: [
    "XXS (light)",
    "XS (light)",
    "S (light)",
    "S",
    "M",
    "L",
    "XL",
    "Personalizzata"
  ],

  altezzaFixed: "Non disponibile",

  spessore: "Non disponibile",

  caramella: "Non disponibile",

  foglieDisabled: [
    "XXS (light)",
    "XS (light)"
  ]
},
  


  "guinzaglio-standard": {
    nome: "Guinzaglio standard",
    image: "guinzaglio_standard.jpg",

    tagliaFixed: "120 cm",

    altezzaFixed: "Non disponibile",

    spessori: [
      "1,5 cm light",
      "1,5 cm small",
      "2 cm"
    ],

    caramella: "Non disponibile"
  },

  "guinzaglio-regolabile": {
    nome: "Guinzaglio regolabile",
    image: "guinzaglio_regolabile.jpg",

    tagliaFixed: "180 cm",

    altezzaFixed: "Non disponibile",

    spessori: [
      "1,5 cm light",
      "1,5 cm small",
      "2 cm"
    ],

    caramella: "Non disponibile"
  },


  "poop-bag": {
    nome: "Poop bag",
    image: "poop_bag.jpg",

    tagliaFixed: "Non disponibile",

    altezzaFixed: "Non disponibile",

    spessore: "Non disponibile",

    caramella: "Non disponibile"
  },

};

/* ---------------------- */
/* UTILS */
/* ---------------------- */

function createReadonlyInput(value) {

  return `
    <input
      type="text"
      value="${value}"
      readonly
    />
  `;
}

function createSelect(options, className) {

  return `
    <select class="${className}">
      <option value="">
        Seleziona
      </option>

      ${options.map(option => `
        <option value="${option}">
          ${option}
        </option>
      `).join("")}
    </select>
  `;
}

/* ---------------------- */
/* CREAZIONE RIGA */
/* ---------------------- */

function createOrderRow() {

  const row = document.createElement("div");

  row.classList.add("order-row");

  row.innerHTML = `

    <!-- ARTICOLO -->
    <div class="field-box">

      <select class="articolo-select">

        <option value="">
          Seleziona
        </option>

        ${Object.entries(products).map(([key, product]) => `
          <option value="${key}">
            ${product.nome}
          </option>
        `).join("")}

      </select>

    </div>

    <!-- IMMAGINE -->
    <div class="field-box image-box"></div>

    <!-- TAGLIA -->
    <div class="field-box taglia-box">

      <select class="taglia-select">
        <option value="">
          Seleziona
        </option>
      </select>

    </div>

    <!-- ALTEZZA -->
    <div class="field-box altezza-box">

      <input
        type="text"
        class="altezza-input"
        placeholder="-"
        readonly
      />

    </div>

    <!-- SPESSORE -->
    <div class="field-box spessore-box">

      <input
        type="text"
        class="spessore-input"
        placeholder="-"
        readonly
      />

    </div>

    <!-- PELLE -->
    <div class="field-box">

      ${createSelect(coloriPelle, "pelle-select")}

    </div>

    <!-- FOGLIE -->
    <div class="field-box foglie-box">

      ${createSelect(coloriFoglie, "foglie-select")}

    </div>

    <!-- CRISTALLI -->
    <div class="field-box">

      ${createSelect(coloriCristalli, "cristalli-select")}

    </div>

    <!-- CARAMELLA -->
    <div class="field-box caramella-box">

      ${createReadonlyInput("Non disponibile")}

    </div>

    <!-- QUANTITA -->
    <div class="field-box quantity-box">

      <input
        type="number"
        min="1"
        class="quantity-input"
        placeholder="0"
      />

    </div>

    <!-- NOTE -->
    <div class="field-box notes-box">

      <textarea placeholder="Note riga ordine..."></textarea>

    </div>

    <!-- DELETE -->
    <div class="delete-row-btn">
      🗑
    </div>
  `;

  /* ---------------------- */
  /* ELEMENTI */
  /* ---------------------- */

  const articoloSelect = row.querySelector(".articolo-select");

  const imageBox = row.querySelector(".image-box");

  const tagliaBox = row.querySelector(".taglia-box");

  const altezzaBox = row.querySelector(".altezza-box");

  const spessoreBox = row.querySelector(".spessore-box");

  const foglieBox = row.querySelector(".foglie-box");

  const caramellaBox = row.querySelector(".caramella-box");

  const deleteBtn = row.querySelector(".delete-row-btn");

  /* ---------------------- */
  /* CAMBIO ARTICOLO */
  /* ---------------------- */

  articoloSelect.addEventListener("change", () => {

    const product = products[articoloSelect.value];

    if (!product) return;

    /* IMMAGINE */

    imageBox.innerHTML = `
      <img
        class="product-image"
        src="assets/images/${product.image}"
        alt="${product.nome}"
      />
    `;

    /* TAGLIA */

    if (product.tagliaFixed) {

      tagliaBox.innerHTML = createReadonlyInput(
        product.tagliaFixed
      );

    } else {

      tagliaBox.innerHTML = createSelect(
        product.taglie,
        "taglia-select"
      );
    }

    /* ALTEZZA */

    if (product.altezzaFixed) {

      altezzaBox.innerHTML = createReadonlyInput(
        product.altezzaFixed
      );

    } else if (product.altezzeSelect) {

      altezzaBox.innerHTML = createSelect(
        product.altezzeSelect,
        "altezza-select"
      );

    } else {

      altezzaBox.innerHTML = `
        <input
          type="text"
          class="altezza-input"
          readonly
        />
      `;
    }

    /* SPESSORE */

    if (product.spessori) {

      spessoreBox.innerHTML = createSelect(
        product.spessori,
        "spessore-select"
      );

    } else {

      spessoreBox.innerHTML = createReadonlyInput(
        product.spessore
      );
    }

    /* CARAMELLA */

    if (product.caramellaOptions) {

      caramellaBox.innerHTML = createSelect(
        product.caramellaOptions,
        "caramella-select"
      );

    } else {

      caramellaBox.innerHTML = createReadonlyInput(
        product.caramella
      );
    }

    /* RESET FOGLIE */

    foglieBox.innerHTML = createSelect(
      coloriFoglie,
      "foglie-select"
    );

    const foglieSelect =
      row.querySelector(".foglie-select");

    /* TAGLIA EVENT */

    const tagliaSelect =
      row.querySelector(".taglia-select");

    if (tagliaSelect) {

    tagliaSelect.addEventListener("change", () => {
    
      const selectedTaglia = tagliaSelect.value;
    
      /* ALTEZZA */
    
      const altezzaInput =
        row.querySelector(".altezza-input");
    
      if (
        altezzaInput &&
        product.altezze
      ) {
    
        altezzaInput.value =
          product.altezze[selectedTaglia] || "";
      }
    
      /* FOGLIE */
    
      if (
        product.foglieDisabled &&
        product.foglieDisabled.includes(
          selectedTaglia
        )
      ) {
    
        foglieBox.innerHTML = createReadonlyInput(
          "Non disponibile"
        );
    
      } else {
    
        foglieBox.innerHTML = createSelect(
          coloriFoglie,
          "foglie-select"
        );
      }
    
    });
    }

    /* SPESSORE EVENT */

    const spessoreSelect =
      row.querySelector(".spessore-select");

    if (spessoreSelect) {

      spessoreSelect.addEventListener("change", () => {

        if (
          spessoreSelect.value === "1,5 cm light" ||
          spessoreSelect.value === "1,5 cm small"
        ) {

          foglieBox.innerHTML = createReadonlyInput(
            "Non disponibile"
          );

        } else {

          foglieBox.innerHTML = createSelect(
            coloriFoglie,
            "foglie-select"
          );
        }
      });
    }

  });

  /* ---------------------- */
  /* DELETE ROW */
  /* ---------------------- */

  deleteBtn.addEventListener("click", () => {
  
    row.remove();
  
    saveOrders();

    updateSummary();
  
  });
  
  row.addEventListener("change", saveOrders);
  
  row.addEventListener("input", saveOrders);

/* ---------------------- */
/* UPDATE AUTOMATICI */
/* ---------------------- */

row.addEventListener("change", () => {

  saveOrders();

  updateSummary();

});

row.addEventListener("input", () => {

  saveOrders();

  updateSummary();

});
  
  
  return row;
}

/* ---------------------- */
/* RIGA INIZIALE */
/* ---------------------- */

loadOrders();

if (!orderRows.children.length) {

  orderRows.appendChild(createOrderRow());

}

updateSummary();

  
/* ---------------------- */
/* AGGIUNGI RIGA */
/* ---------------------- */

addRowBtn.addEventListener("click", () => {

  orderRows.appendChild(createOrderRow());

  saveOrders();

  updateSummary();

});

/* ---------------------- */
/* CANCELLA TUTTO */
/* ---------------------- */

clearAllBtn.addEventListener("click", () => {

  sessionStorage.removeItem(
    "configuratoreOrdini"
  );

  orderRows.innerHTML = "";

  orderRows.appendChild(createOrderRow());

  updateSummary();

});

function validateOrders() {

  let isValid = true;

  /* RESET ERRORI */

  document
    .querySelectorAll(".field-error")
    .forEach(el => {
      el.classList.remove("field-error");
    });

  const rows =
    document.querySelectorAll(".order-row");

  rows.forEach(row => {

    /* ARTICOLO */

    const articolo =
      row.querySelector(".articolo-select");

    if (
      articolo &&
      !articolo.value
    ) {

      articolo
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* TAGLIA */

    const taglia =
      row.querySelector(".taglia-select");

    if (
      taglia &&
      !taglia.value
    ) {

      taglia
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* SPESSORE */

    const spessore =
      row.querySelector(".spessore-select");

    if (
      spessore &&
      !spessore.value
    ) {

      spessore
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* PELLE */

    const pelle =
      row.querySelector(".pelle-select");

    if (
      pelle &&
      !pelle.value
    ) {

      pelle
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* FOGLIE */

    const foglie =
      row.querySelector(".foglie-select");

    if (
      foglie &&
      !foglie.value
    ) {

      foglie
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* CRISTALLI */

    const cristalli =
      row.querySelector(".cristalli-select");

    if (
      cristalli &&
      !cristalli.value
    ) {

      cristalli
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* CARAMELLA */

    const caramella =
      row.querySelector(".caramella-select");

    if (
      caramella &&
      !caramella.value
    ) {

      caramella
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

    /* QUANTITA */

    const quantity =
      row.querySelector(".quantity-input");

    if (
      quantity &&
      (
        !quantity.value ||
        Number(quantity.value) <= 0
      )
    ) {

      quantity
        .closest(".field-box")
        .classList.add("field-error");

      isValid = false;
    }

  });

  /* RISULTATO */

  if (isValid) {

    alert("Ordine completo ✅");

  } else {

    alert(
      "Compila tutti i campi obbligatori."
    );
  }
}

validateBtn.addEventListener("click", () => {

  validateOrders();

});

function saveOrders() {

  const rows = document.querySelectorAll(".order-row");

  const orders = [];

  /* DATI CLIENTE */

  const customerData = {

    nome:
      document.getElementById("customerName")?.value || "",

    telefono:
      document.getElementById("customerPhone")?.value || "",

    email:
      document.getElementById("customerEmail")?.value || ""

  };

  
  rows.forEach(row => {

    const orderData = {

      articolo:
        row.querySelector(".articolo-select")?.value || "",

      taglia:
        row.querySelector(".taglia-select")?.value || "",

      altezza:
        row.querySelector(".altezza-input")?.value ||
        row.querySelector(".altezza-select")?.value ||
        "",

      spessore:
        row.querySelector(".spessore-input")?.value || "",

      pelle:
        row.querySelector(".pelle-select")?.value || "",

      foglie:
        row.querySelector(".foglie-select")?.value || "",

      cristalli:
        row.querySelector(".cristalli-select")?.value || "",

      caramella:
        row.querySelector(".caramella-select")?.value ||
        row.querySelector(".caramella-input")?.value ||
        "",

      quantita:
        row.querySelector(".quantity-input")?.value || "",

      note:
        row.querySelector("textarea")?.value || ""

    };

    orders.push(orderData);

  });

  sessionStorage.setItem(
    "configuratoreOrdini",
    JSON.stringify(orders)
  );

  sessionStorage.setItem(
  "customerData",
  JSON.stringify(customerData)
  );


}



/* ---------------------- */
/* LOAD ORDERS */
/* ---------------------- */

function loadOrders() {

  const saved =
    sessionStorage.getItem("configuratoreOrdini");

  if (!saved) return;

  const orders = JSON.parse(saved);

  orders.forEach(data => {

    const row = createOrderRow();

    orderRows.appendChild(row);

    /* articolo */

    const articoloSelect =
      row.querySelector(".articolo-select");

    articoloSelect.value = data.articolo;

    articoloSelect.dispatchEvent(
      new Event("change")
    );

    /* attesa rendering */

    setTimeout(() => {

      const taglia =
        row.querySelector(".taglia-select");

      if (taglia)
        taglia.value = data.taglia;

      const altezzaInput =
        row.querySelector(".altezza-input");

      const altezzaSelect =
        row.querySelector(".altezza-select");

      if (altezzaInput)
        altezzaInput.value = data.altezza;

      if (altezzaSelect)
        altezzaSelect.value = data.altezza;

      const spessoreInput =
        row.querySelector(".spessore-input");

      const spessoreSelect =
        row.querySelector(".spessore-select");

      if (spessoreInput)
        spessoreInput.value = data.spessore;

      if (spessoreSelect)
        spessoreSelect.value = data.spessore;

      const pelle =
        row.querySelector(".pelle-select");

      if (pelle)
        pelle.value = data.pelle;

      const foglie =
        row.querySelector(".foglie-select");

      if (foglie)
        foglie.value = data.foglie;

      const cristalli =
        row.querySelector(".cristalli-select");

      if (cristalli)
        cristalli.value = data.cristalli;

      const caramellaSelect =
        row.querySelector(".caramella-select");

      if (caramellaSelect)
        caramellaSelect.value = data.caramella;

      const quantity =
        row.querySelector(".quantity-input");

      if (quantity)
        quantity.value = data.quantita;

      const notes =
        row.querySelector("textarea");

      if (notes)
        notes.value = data.note;

    }, 0);

  });

}



/* ---------------------- */
/* RIEPILOGO ORDINE */
/* ---------------------- */

function updateSummary() {

  const rows = document.querySelectorAll(".order-row");

  const summaryRows =
    document.getElementById("summaryRows");

  const summaryQuantity =
    document.getElementById("summaryQuantity");

  const summaryIncomplete =
    document.getElementById("summaryIncomplete");

  const summaryProducts =
    document.getElementById("summaryProducts");

  let totalRows = rows.length;

  let totalQuantity = 0;

  let incompleteRows = 0;

  let productsMap = {};

  rows.forEach(row => {

    const articoloSelect =
      row.querySelector(".articolo-select");
    
    const articolo =
      articoloSelect?.options[
        articoloSelect.selectedIndex
      ]?.text || "";

    const quantity =
      parseInt(
        row.querySelector(".quantity-input")?.value
      ) || 0;

    totalQuantity += quantity;

    if (articolo) {

      if (!productsMap[articolo]) {

        productsMap[articolo] = 0;
      }

      productsMap[articolo] += quantity || 1;
    }

    /* CONTROLLO COMPLETEZZA */

    const requiredFields = [

      row.querySelector(".articolo-select"),

      row.querySelector(".pelle-select"),

      row.querySelector(".quantity-input")

    ];

    const isIncomplete = requiredFields.some(field => {

      if (!field) return true;

      return !field.value;
    });

    if (isIncomplete) {

      incompleteRows++;
    }

  });

  summaryRows.textContent =
    totalRows;

  summaryQuantity.textContent =
    totalQuantity;

  summaryIncomplete.textContent =
    incompleteRows;

  /* ELENCO ARTICOLI */

  const productsArray =
    Object.entries(productsMap);

  if (!productsArray.length) {

    summaryProducts.textContent =
      "Nessun articolo inserito";

    return;
  }

  summaryProducts.innerHTML =
    productsArray.map(([name, qty]) => {

      return `
        <div>
          <strong>${name}</strong>
          · ${qty} pezzi
        </div>
      `;
    }).join("");
}

/* ---------------------- */
/* ESPORTAZIONE PDF */
/* ---------------------- */

async function exportPDF() {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({

    orientation: "landscape",

    unit: "mm",

    format: "a4"
  });


/* ---------------------- */
/* DATI CLIENTE */
/* ---------------------- */

const customerName =
  document.getElementById("customerName")?.value || "-";

const customerPhone =
  document.getElementById("customerPhone")?.value || "-";

const customerEmail =
  document.getElementById("customerEmail")?.value || "-";


  
/* ---------------------- */
/* LOGO */
/* ---------------------- */

let logoBase64 = "";

try {

  const response = await fetch("logo.png");

  const blob = await response.blob();

  logoBase64 = await new Promise((resolve) => {

    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);

    reader.readAsDataURL(blob);

  });

} catch (error) {

  console.log("Logo non trovato");

}


  

/* ---------------------- */
/* HEADER PREMIUM */
/* ---------------------- */

doc.setFillColor(248,248,248);
doc.rect(0, 0, 297, 42, "F");

/* logo */

if (logoBase64) {

  doc.addImage(
    logoBase64,
    "PNG",
    12,
    8,
    60,
    29
  );
}

/* titolo */

doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.setTextColor(28, 63, 52);

doc.text(
  "CONFIGURATORE ORDINE CLIENTE",
  285,
  18,
  { align: "right" }
);

/* data */

doc.setFont("helvetica", "normal");
doc.setFontSize(11);
doc.setTextColor(70,70,70);

doc.text(
  `Data ordine: ${new Date().toLocaleDateString("it-IT")}`,
  285,
  28,
  { align: "right" }
);

/* linea gold */

doc.setDrawColor(201, 157, 74);
doc.setLineWidth(0.5);

doc.line(12, 38, 285, 38);


/* ---------------------- */
/* BOX DATI CLIENTE */
/* ---------------------- */

doc.setFillColor(250,250,250);

doc.roundedRect(
  12,
  44,
  273,
  22,
  3,
  3,
  "F"
);

doc.setFont("helvetica", "bold");
doc.setFontSize(10);

doc.setTextColor(31, 101, 86);

doc.text(
  "CLIENTE",
  18,
  52
);

doc.setFont("helvetica", "normal");

doc.setTextColor(60,60,60);

doc.text(
  `Nome: ${customerName}`,
  18,
  60
);

doc.text(
  `Telefono: ${customerPhone}`,
  110,
  60
);

doc.text(
  `Email: ${customerEmail}`,
  205,
  60
);



  
  /* ---------------------- */
  /* TABELLA */
  /* ---------------------- */

  const rows = document.querySelectorAll(".order-row");

  let y = 74;

  /* HEADER TABELLA */

  doc.setFillColor(31, 101, 86);

  doc.rect(10, y, 277, 10, "F");

  doc.setTextColor(255,255,255);

  doc.setFontSize(9);

  doc.setFont("helvetica", "bold");

  const headers = [
    "Articolo",
    "Taglia",
    "Altezza",
    "Spessore",
    "Pelle",
    "Foglie",
    "Cristalli",
    "Caramella",
    "Qta"
  ];

  const positions = [
    14,
    52,
    82,
    112,
    145,
    178,
    210,
    242,
    272
  ];

  headers.forEach((header, index) => {

    doc.text(
      header,
      positions[index],
      y + 6.5
    );
  });

  y += 10;

  /* RIGHE */

  doc.setTextColor(40,40,40);

  doc.setFont("helvetica", "normal");

  rows.forEach((row, index) => {

    const article =
  row.querySelector(".articolo-select")?.selectedOptions[0]?.text || "-";

const size =
  row.querySelector(".taglia-select")?.value ||
  row.querySelector(".taglia-box input")?.value ||
  "-";

const height =
  row.querySelector(".altezza-select")?.value ||
  row.querySelector(".altezza-input")?.value ||
  "-";

const thickness =
  row.querySelector(".spessore-select")?.value ||
  row.querySelector(".spessore-input")?.value ||
  "-";

const leather =
  row.querySelector(".pelle-select")?.value || "-";

const leaves =
  row.querySelector(".foglie-select")?.value ||
  row.querySelector(".foglie-box input")?.value ||
  "-";

const crystals =
  row.querySelector(".cristalli-select")?.value || "-";

const candy =
  row.querySelector(".caramella-select")?.value ||
  row.querySelector(".caramella-box input")?.value ||
  "-";

const quantity =
  row.querySelector(".quantity-input")?.value || "-";

    /* sfondo alternato */

    if (index % 2 === 0) {

      doc.setFillColor(248,249,251);

      doc.rect(10, y - 1, 277, 8, "F");
    }

    const values = [
      article,
      size,
      height,
      thickness,
      leather,
      leaves,
      crystals,
      candy,
      quantity
    ];

    values.forEach((value, i) => {

      doc.text(
        String(value),
        positions[i],
        y + 4
      );
    });

    y += 8;

    /* nuova pagina */

    if (y > 185) {

      doc.addPage();

      y = 20;
    }
  });

/* ---------------------- */
/* FOOTER PREMIUM */
/* ---------------------- */

const footerY = 194;

/* fascia verde */

doc.setFillColor(31, 101, 86);

doc.rect(
  0,
  footerY,
  297,
  16,
  "F"
);

/* thank you */

doc.setFont("helvetica", "bold");
doc.setFontSize(15);

doc.setTextColor(31, 101, 86);

doc.text(
  "Grazie per aver scelto KiTho",
  148,
  180,
  { align: "center" }
);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);

doc.setTextColor(120,120,120);

doc.text(
  "Qualità, comfort, eleganza e stile per i tuoi amici a quattro zampe.",
  148,
  187,
  { align: "center" }
);

/* contatti */

doc.setFontSize(10);

doc.setTextColor(255,255,255);

doc.text(
  "www.kithopet.com",
  20,
  204
);

doc.text(
  "commercial@kithopet.com",
  120,
  204
);

/* icona instagram */
let instagramBase64 = "";
try {
  const response = await fetch("instagram.png");
  const blob = await response.blob();
  instagramBase64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
} catch (error) {
  console.log("Icona Instagram non trovata");
}
if (instagramBase64) {
  doc.addImage(
    instagramBase64,
    "PNG",
    225,
    201,
    4,
    4
  );
}
/* testo instagram */
doc.text(
  "kitho.pet",
  231,
  204
);

  /* SAVE */

  doc.save("ordine_cliente.pdf");
}

/* ---------------------- */
/* EXPORT PDF */
/* ---------------------- */

exportPdfBtn.addEventListener("click", () => {

  exportPDF();

});

