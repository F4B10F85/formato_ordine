import {
  collection,
  getDocs,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

const userType =
  sessionStorage.getItem("userType") || "private";

const isShop =
  userType === "shop";

document.addEventListener("DOMContentLoaded", () => {
  if (!isShop) {
    const priceHeader =
      document.querySelector(".price-header");
    if (priceHeader) {
      priceHeader.style.display = "none";
    }
    const summaryTotalCard =
      document
        .getElementById("summaryTotal")
        ?.closest(".summary-card");
    if (summaryTotalCard) {
      summaryTotalCard.style.display = "none";
    }
  }
});

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
  "rosso",
  "azzurro",
  "arancione",
  "verde",
  "bianco",
  "rosa",
  "petrolio",
  "nero",
  "ciliegia",
  "marrone",
  "salvia",
  "beige",
  "blu",
  "bordeaux",
  "viola"
];

const coloriFoglie = [
  "NO FOGLIE",
  "bianco",
  "beige",
  "bordeaux",
  "taupe",
  "arancione",
  "salvia",
  "royal blue",
  "rosso",
  "giallo",
  "verde",
  "azzurro",
  "rosa",
  "nero"
];

const coloriCristalli = [
  "NO CRISTALLI",
  "bianco",
  "rosso",
  "topaz",
  "verde",
  "azzurro",
  "rosa",
  "nero"
];


const pelleLabels = {

  giallo: "🟡 giallo",
  rosso: "🔴 rosso",
  azzurro: "🔵 azzurro",
  arancione: "🟠 arancione",
  verde: "🟢 verde",
  bianco: "⚪ bianco",
  rosa: "🔴 rosa",
  petrolio: "🔵 petrolio",
  nero: "⚫ nero",
  ciliegia: "🔴 ciliegia",
  marrone: "🟤 marrone",
  salvia: "🟢 salvia",
  beige: "🟡 beige",
  blu: "🔵 blu",
  bordeaux: "🔴 bordeaux",
  viola: "🟣 viola"

};

const foglieLabels = {

  "NO FOGLIE": "🚫 NO FOGLIE",
  bianco: "⚪ bianco",
  beige: "🟡 beige",
  bordeaux: "🔴 bordeaux",
  taupe: "🟤 taupe",
  arancione: "🟠 arancione",
  salvia: "🟢 salvia",
  "royal blue": "🔵 royal blue",
  rosso: "🔴 rosso",
  giallo: "🟡 giallo",
  verde: "🟢 verde",
  azzurro: "🔵 azzurro",
  rosa: "🔴 rosa",
  nero: "⚫ nero"

};

const cristalliLabels = {
  "NO CRISTALLI": "🚫 NO CRISTALLI",
  bianco: "⚪ bianco",
  rosso: "🔴 rosso",
  topaz: "🟡 topaz",
  verde: "🟢 verde",
  azzurro: "🔵 azzurro",
  rosa: "🔴 rosa",
  nero: "⚫ nero"

};

const pdfColors = {
  giallo: [255, 220, 0],
  rosso: [220, 0, 0],
  azzurro: [0, 140, 255],
  arancione: [255, 140, 0],
  verde: [0, 180, 0],
  bianco: [255, 255, 255],
  rosa: [255, 105, 180],
  petrolio: [0, 95, 115],
  nero: [30, 30, 30],
  ciliegia: [180, 0, 40],
  marrone: [120, 70, 15],
  salvia: [140, 170, 130],
  beige: [230, 210, 170],
  blu: [0, 0, 180],
  bordeaux: [128, 0, 32],
  viola: [128, 0, 255],
  taupe: [145, 129, 109],
  topaz: [255, 200, 60],
  "royal blue": [65, 105, 225]
};




/* ---------------------- */
/* MAPPE CODICI */
/* ---------------------- */

const articleCodes = {

  "collare-standard": "CS",
  "collare-caramella": "CC",
  "collare-maniglia": "CM",
  "pettorina": "PE",
  "guinzaglio-standard": "GS",
  "guinzaglio-regolabile": "GR",
  "poop-bag": "PB",
  "cintura": "CI",
  "capezza": "CA",
  "frontalino": "FR",
  "lunghina": "LU"

};

const sizeCodes = {

  "XXS (light)": "XXS",
  "XS (light)": "XS",
  "S (light)": "SL",
  "S": "S",
  "M": "M",
  "L": "L",
  "XL": "XL",
  "Personalizzata": "CUS",

  "Pony": "PON",
  "Cob": "COB",
  "Full": "FUL"

};

const leatherCodes = {

  "giallo": "YEL",
  "arancione": "ORA",
  "salvia": "SVG",
  "verde": "GRN",
  "bianco": "WHT",
  "rosso": "RED",
  "ciliegia": "CER",
  "bordeaux": "BRD",
  "rosa": "PIN",
  "azzurro": "AZZ",
  "petrolio": "PET",
  "blu": "BLU",
  "nero": "BLK",
  "marrone": "BRO",
  "beige": "BGE",
  "viola": "PRP"

};




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
      "XL",
      "Personalizzata"
    ],

    altezze: {
      "XS": "1,5 cm",
      "S": "2 cm",
      "M": "2,5 cm",
      "L": "3 cm",
      "XL": "3 cm",
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


"cintura": {
  nome: "Cintura",
  image: "cintura.jpg",
  taglie: [
    "70 cm - h. 3 cm",
    "75 cm - h. 3 cm",
    "80 cm - h. 3 cm",
    "85 cm - h. 3 cm",
    "90 cm - h. 3 cm",
    "95 cm - h. 3 cm",
    "100 cm - h. 3 cm",
    "105 cm - h. 3 cm",
    "110 cm - h. 3 cm",
    "115 cm - h. 3 cm",
    "120 cm - h. 3 cm",
    "125 cm - h. 3 cm",
    "130 cm - h. 3 cm",
    "135 cm - h. 3 cm",
    "140 cm - h. 3 cm"    
  ],
  altezzaFixed: "Non disponibile",
  spessore: "Non disponibile",
  caramella: "Non disponibile",
  cristalliDisabled: true
},
  
"capezza": {
  nome: "Capezza",
  image: "capezza.jpg",
  taglie: [
    "Pony",
    "Cob",
    "Full"
  ],
  altezzaFixed: "Non disponibile",
  spessore: "Non disponibile",
  caramella: "Non disponibile",
  cristalliDisabled: true
},

"frontalino": {
  nome: "Frontalino",
  image: "frontalino.jpg",
  taglie: [
    "Pony",
    "Cob",
    "Full"
  ],
  altezzaFixed: "Non disponibile",
  spessore: "Non disponibile",
  caramella: "Non disponibile"
},

"lunghina": {
  nome: "Lunghina per cavalli",
  image: "lunghina.jpg",
  taglie: [
    "180 cm - h. 2 cm"
  ],
  altezzaFixed: "Non disponibile",
  spessore: "Non disponibile",
  caramella: "Non disponibile",
  cristalliDisabled: true
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
          ${
            className === "pelle-select"
              ? (pelleLabels[option] || option)

            : className === "foglie-select"
              ? (foglieLabels[option] || option)

            : className === "cristalli-select"
              ? (cristalliLabels[option] || option)

            : option
          }
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

  if (!isShop) {
  row.classList.add("private-user");
  }

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

<!-- PREZZO -->

<div class="field-box price-box">
  <span class="price-value">
    —
  </span>
</div>


    <!-- CODICE ARTICOLO -->
<div class="field-box code-box">

  <input
    type="text"
    class="product-code-input"
    placeholder="Codice"
    readonly
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
/* LISTENER STATICI */
/* ---------------------- */

const pelleSelect =
  row.querySelector(".pelle-select");

const quantityInput =
  row.querySelector(".quantity-input");

const notesTextarea =
  row.querySelector("textarea");

pelleSelect?.addEventListener(
  "change",
  async () => {
    saveOrders();
    updateSummary();
    await updateRowPrice(row);
  }
);

quantityInput?.addEventListener("input", () => {
  saveOrders();
  updateSummary();
});

notesTextarea?.addEventListener("input", () => {
  saveOrders();
  updateSummary();
});



  
  /* ---------------------- */
  /* UPDATE PREZZO */
  /* ---------------------- */
  
const triggerPriceUpdate = async () => {

  saveOrders();

  updateSummary();

  await updateRowPrice(row);

};

  
  /* ---------------------- */
  /* CAMBIO ARTICOLO */
  /* ---------------------- */

  articoloSelect.addEventListener("change", async () => {

    const product = products[articoloSelect.value];

    if (!product) return;

  /* RESET CODICE */

  const codeInput =
    row.querySelector(".product-code-input");
  
  if (codeInput) {
    codeInput.value =
      "KT.XX.CUS.UNK.00.00.00";
  }
    
    
  /* RESET QUANTITA */

  if (quantityInput) {
    quantityInput.value = "";
  }

  /* RESET NOTE */
  
  if (notesTextarea) {
    notesTextarea.value = "";
  }

  /* RESET PELLE */

const pelleSelect =
  row.querySelector(".pelle-select");

if (pelleSelect) {
  pelleSelect.value = "";
}
    
  
    /* IMMAGINE */

    imageBox.innerHTML = `
      <img
        class="product-image zoomable-image"
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


const caramellaSelect =
  row.querySelector(".caramella-select");

if (caramellaSelect) {

  caramellaSelect.addEventListener(
    "change",
    triggerPriceUpdate
  );

}

    

/* RESET FOGLIE */

foglieBox.innerHTML = createSelect(
  coloriFoglie,
  "foglie-select"
);

const foglieSelect =
  row.querySelector(".foglie-select");

if (foglieSelect) {

  foglieSelect.addEventListener(
    "change",
    triggerPriceUpdate
  );

}


/* CRISTALLI */

const cristalliBox =
  row.querySelectorAll(".field-box")[7];

if (product.cristalliDisabled) {

  cristalliBox.innerHTML =
    createReadonlyInput("Non disponibile");

} else {

  cristalliBox.innerHTML = createSelect(
    coloriCristalli,
    "cristalli-select"
  );
  
  const cristalliSelect =
  row.querySelector(".cristalli-select");

if (cristalliSelect) {

  cristalliSelect.addEventListener(
    "change",
    triggerPriceUpdate
  );
}
}


    
    /* TAGLIA EVENT */

    const tagliaSelect =
      row.querySelector(".taglia-select");

    if (tagliaSelect) {

    tagliaSelect.addEventListener("change", async () => {
    
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

  const foglieSelect =
    row.querySelector(".foglie-select");

  if (foglieSelect) {

    foglieSelect.addEventListener(
      "change",
      triggerPriceUpdate
    );

  }
}

await triggerPriceUpdate();
    });
    }

await updateRowPrice(row);

  });

  /* ---------------------- */
  /* DELETE ROW */
  /* ---------------------- */

  deleteBtn.addEventListener("click", () => {
  
    row.remove();
  
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
  const valid =
    validateOrder();
  if (valid) {
    alert("Ordine completo ✅");
  }
  else {
    alert("Compila tutti i campi obbligatori");
  }
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
        row.querySelector(".articolo-select")
          ?.value || "",

      taglia:
        row.querySelector(".taglia-select")?.value || "",

      
      altezza:
        row.querySelector(".altezza-input")?.value ||
        row.querySelector(".altezza-select")?.value ||
        "",

      spessore:
        row.querySelector(".spessore-select")?.value ||
        row.querySelector(".spessore-input")?.value ||
        "Non disponibile",

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
        row.querySelector("textarea")?.value || "",

      codice:
        row.querySelector(".product-code-input")?.value || ""


      
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

      const codice =
        row.querySelector(".product-code-input");
      
      if (codice)
        codice.value = data.codice || "";

      
      updateRowPrice(row);
      
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

const customerName =
  document.getElementById("customerName");

const customerPhone =
  document.getElementById("customerPhone");

const customerEmail =
  document.getElementById("customerEmail");

const customerAddress =
  document.getElementById("customerAddress");
  

  let totalRows = rows.length;

  let totalQuantity = 0;

  let incompleteRows = 0;

  let productsMap = {};

  let totalValue = 0;

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

const priceText =
  row.querySelector(".price-value")
    ?.textContent || "";

const unitPrice =
  parseFloat(
    priceText
      .replace("€", "")
      .replace(",", ".")
      .trim()
  ) || 0;

totalValue += unitPrice * quantity;


    
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

  const summaryTotal =
    document.getElementById("summaryTotal");
  
  if (summaryTotal) {
  
    summaryTotal.textContent =
      `${totalValue
        .toFixed(2)
        .replace(".", ",")} €`;
  
  }
  

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
/* GENERAZIONE NUMERO ORDINE */
/* ---------------------- */


function generateOrderNumber() {

  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  const hours =
    String(now.getHours())
      .padStart(2, "0");

  const minutes =
    String(now.getMinutes())
      .padStart(2, "0");

  const seconds =
    String(now.getSeconds())
      .padStart(2, "0");

  return `KTH-${year}${month}${day}-${hours}${minutes}${seconds}`;
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

  const orderNumber =
  generateOrderNumber();

  const customerData = {

  nome:
    document.getElementById("customerName")?.value || "",

  telefono:
    document.getElementById("customerPhone")?.value || "",

  email:
    document.getElementById("customerEmail")?.value || "",

  indirizzo:
  document.getElementById("customerAddress")?.value || ""

};

const orderItems = [];

document
  .querySelectorAll(".order-row")
  .forEach(row => {

    orderItems.push({
    
      articolo:
        row.querySelector(".articolo-select")
          ?.selectedOptions[0]?.text || "",
    
      taglia:
        row.querySelector(".taglia-select")?.value ||
        row.querySelector(".taglia-box input")?.value ||
        "",
    
      altezza:
        row.querySelector(".altezza-select")?.value ||
        row.querySelector(".altezza-input")?.value ||
        "",
    
      spessore:
        row.querySelector(".spessore-select")?.value ||
        row.querySelector(".spessore-input")?.value ||
        "Non disponibile",
    
      pelle:
        row.querySelector(".pelle-select")?.value || "",
    
      foglie:
        row.querySelector(".foglie-select")?.value ||
        row.querySelector(".foglie-box input")?.value ||
        "",
    
      cristalli:
        row.querySelector(".cristalli-select")?.value || "",
    
      caramella:
        row.querySelector(".caramella-select")?.value ||
        row.querySelector(".caramella-box input")?.value ||
        "",
    
      quantita:
        row.querySelector(".quantity-input")?.value || "",
    
      note:
        row.querySelector("textarea")?.value || "",

      codice:
        row.querySelector(".product-code-input")?.value || ""
    
    });

  });

/* SALVATAGGIO FIREBASE */

try {

await addDoc(
  collection(db, "orders"),
  {
    orderNumber,
    createdAt:
      new Date().toISOString(),
    status: "Nuovo",
    trackingCode: "",
    customerData,
    orderItems
  }

);

  console.log(
    "Ordine salvato su Firebase"
  );
} catch (error) {
  console.error(
    "Errore Firebase:",
    error
  );
}





  
/* ---------------------- */
/* DATI CLIENTE */
/* ---------------------- */

const customerName =
  document.getElementById("customerName")?.value || "-";

const customerPhone =
  document.getElementById("customerPhone")?.value || "-";

const customerEmail =
  document.getElementById("customerEmail")?.value || "-";

const customerAddress =
  document.getElementById("customerAddress")?.value || "-";

/* TELEGRAM */

const telegramMessage =

`🛒 NUOVO ORDINE

Ordine:
${orderNumber}

Cliente:
${customerName}

Telefono:
${customerPhone}

Email
${customerEmail}

Indirizzo:
${customerAddress}

Articoli:
${orderItems.length}

Totale pezzi:
${orderItems.reduce((sum, item) =>
  sum + Number(item.quantita || 0), 0
)}

`;

sendTelegramMessage(
  telegramMessage
);
  
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

doc.setFontSize(11);

doc.setTextColor(70,70,70);

doc.text(
  `Ordine: ${orderNumber}`,
  285,
  34,
  { align: "right" }
);
  
/* linea gold */

doc.setDrawColor(201, 157, 74);
doc.setLineWidth(0.5);

doc.line(12, 38, 285, 38);


/* ---------------------- */
/* BOX DATI CLIENTE PER ESPORTAZIONE ORDINE IN PDF */
/* ---------------------- */


doc.setFillColor(250,250,250);
doc.setDrawColor(170,215,205);
doc.setLineWidth(0.2);
doc.roundedRect(
  5,
  44,
  287,
  25,
  3,
  3,
  "FD"
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
  58
);

doc.text(
  `Telefono: ${customerPhone}`,
  110,
  58
);

doc.text(
  `Email: ${customerEmail}`,
  205,
  58
);

doc.text(
  `Indirizzo: ${customerAddress}`,
  18,
  64
);

  
  /* ---------------------- */
  /* TABELLA */
  /* ---------------------- */

  const rows = document.querySelectorAll(".order-row");

  let y = 71;

  /* HEADER TABELLA */

  doc.setFillColor(31, 101, 86);

  doc.rect(5, y, 287, 8, "F");

  doc.setTextColor(255,255,255);

  doc.setFontSize(9);

  doc.setFont("helvetica", "bold");

  const headers = isShop
  ? [
      "Codice",
      "Articolo",
      "Taglia",
      "Altezza",
      "Spessore",
      "Pelle",
      "Foglie",
      "Cristalli",
      "Caramella",
      "Qtà",
      "Tot. €"
    ]
  : [
      "Codice",
      "Articolo",
      "Taglia",
      "Altezza",
      "Spessore",
      "Pelle",
      "Foglie",
      "Cristalli",
      "Caramella",
      "Qtà"
    ];

   const positions = [
    9,   // Codice
    52,   // Articolo
    85,  // Taglia
    115,  // Altezza
    135,  // Spessore
    155,  // Pelle
    180,  // Foglie
    207,  // Cristalli
    238,  // Caramella
    260,   // Qta
    275,   // Totale €
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

const priceText =
  row.querySelector(".price-value")
    ?.textContent || "0";

const unitPrice =
  parseFloat(
    priceText
      .replace("€","")
      .replace(",",".")
      .trim()
  ) || 0;

const totalRow =
  unitPrice *
  (parseInt(quantity) || 0);

const codice =
  row.querySelector(".product-code-input")?.value || "-";    
    
const notes =
  row.querySelector("textarea")?.value || "";

const baseY = y;

let rowHeight = 8;

if (notes.trim() !== "") {
  rowHeight += 6;
}

    
    /* sfondo alternato */

    if (index % 2 === 0) {
      doc.setFillColor(248,249,251);
      
      doc.rect(
        5,
        baseY - 1,
        287,
        rowHeight,
        "F"
      );

}

    const values = isShop
  ? [
      codice,
      article,
      size,
      height,
      thickness,
      leather,
      leaves,
      crystals,
      candy,
      quantity,
      totalRow.toFixed(2).replace(".", ",") + " €"
    ]
  : [
      codice,
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

  const colorColumns = [5, 6, 7];

  /* NO FOGLIE */

  if (
    colorColumns.includes(i) &&
    value === "NO FOGLIE"
  ) {

    doc.setDrawColor(220, 0, 0);
    doc.setLineWidth(0.6);

    doc.line(
      positions[i],
      y + 1,
      positions[i] + 3,
      y + 4
    );

    doc.line(
      positions[i] + 3,
      y + 1,
      positions[i],
      y + 4
    );

    doc.setTextColor(40,40,40);

    doc.text(
      "NO FOGLIE",
      positions[i] + 6,
      y + 4
    );

  }

  /* NO CRISTALLI */

  else if (
    colorColumns.includes(i) &&
    value === "NO CRISTALLI"
  ) {

    doc.setDrawColor(220, 0, 0);
    doc.setLineWidth(0.6);

    doc.line(
      positions[i],
      y + 1,
      positions[i] + 3,
      y + 4
    );

    doc.line(
      positions[i] + 3,
      y + 1,
      positions[i],
      y + 4
    );

    doc.setTextColor(40,40,40);

    doc.text(
      "NO CRISTALLI",
      positions[i] + 6,
      y + 4
    );

  }

  /* COLORI NORMALI */

  else if (
    colorColumns.includes(i) &&
    pdfColors[value]
  ) {

    const color = pdfColors[value];

    doc.setFillColor(
      color[0],
      color[1],
      color[2]
    );

if (value === "bianco") {

  doc.setDrawColor(120,120,120);
  doc.setLineWidth(0.05);
  doc.circle(
    positions[i] + 2,
    y + 2.5,
    1.5,
    "FD"
  );

} else {

  doc.circle(
    positions[i] + 2,
    y + 2.5,
    1.5,
    "F"
  );

}

    doc.setTextColor(40,40,40);

    doc.text(
      String(value),
      positions[i] + 6,
      y + 4
    );

  }

  /* TUTTO IL RESTO */

  else {

    doc.text(
      String(value),
      positions[i],
      y + 4
    );

  }

});


/* EVENTUALI NOTE DA STAMPARSI SUL PDF NELLA TABELLA SOTTO LA RIGA CORRISPONDENTE */

if (notes.trim() !== "") {

  doc.setFontSize(8);

  doc.setTextColor(110,110,110);

  doc.text(
    `Note: ${notes}`,
    16,
    baseY + 10
  );

  doc.setFontSize(9);

  doc.setTextColor(40,40,40);
}

/* RIGA ORIZZONTALE NELLA TABELLA PDF CHE VISUALIZZA LE DIFFERENTI RIGHE */

doc.setDrawColor(170,215,205);

doc.setLineWidth(0.1);

doc.line(
  5,
  baseY + rowHeight -1,
  292,
  baseY + rowHeight -1
);

y += rowHeight;

    
    
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
doc.setFontSize(13);

doc.setTextColor(31, 101, 86);

doc.text(
  "Grazie per aver scelto KiTho",
  148,
  180,
  { align: "center" }
);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);

doc.setTextColor(120,120,120);

doc.text(
  "Qualità, comfort, eleganza e stile per i tuoi amici a quattro zampe.",
  148,
  187,
  { align: "center" }
);

/* contatti */

doc.setFontSize(9);

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
    201.5,
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
/* TELEGRAM */
/* ---------------------- */

async function sendTelegramMessage(message) {

  const botToken =
    "8748631211:AAGc8L-Nkq_quwD916guXBowHd7hmZ-eKOE";

  const chatId =
    "875666150";

  const url =
    `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })

    });

    console.log(
      "Messaggio Telegram inviato"
    );

  } catch (error) {

    console.error(
      "Errore Telegram:",
      error
    );
  }
}

/* ---------------------- */
/* GENERAZIONE CODICE ARTICOLO */
/* ---------------------- */

function generateProductCode(row) {

  const articolo =
    row.querySelector(".articolo-select")?.value || "";

  const taglia =
    row.querySelector(".taglia-select")?.value || "";

  const pelle =
    row.querySelector(".pelle-select")?.value || "";

  const foglieValue =
    row.querySelector(".foglie-select")?.value || "";

  const cristalliValue =
    row.querySelector(".cristalli-select")?.value || "";

  const caramellaValue =
    row.querySelector(".caramella-select")?.value || "";

  /* CODICI */

  const articleCode =
    articleCodes[articolo] || "XX";

  let sizeCode =
  sizeCodes[taglia] || "CUS";

/* COLLARE MANIGLIA */

if (articolo === "collare-maniglia") {

  const altezza =
    row.querySelector(".altezza-select")?.value || "";

  let altezzaCode = "0";

  if (altezza.includes("3")) {
    altezzaCode = "3";
  }

  if (altezza.includes("4")) {
    altezzaCode = "4";
  }

  if (altezza.includes("5")) {
    altezzaCode = "5";
  }

  sizeCode =
    `${sizeCode}.${altezzaCode}`;
}

/* GUINZAGLI */

if (
  articolo === "guinzaglio-standard" ||
  articolo === "guinzaglio-regolabile"
) {

  const spessore =
    row.querySelector(".spessore-select")?.value || "";

  if (spessore === "1,5 cm light") {
    sizeCode = "15L";
  }

  if (spessore === "1,5 cm small") {
    sizeCode = "15S";
  }

  if (spessore === "2 cm") {
    sizeCode = "2";
  }

}

/* CINTURA + LUNGHINA */

if (
  articolo === "cintura" ||
  articolo === "lunghina"
) {

  const tagliaRaw =
    row.querySelector(".taglia-select")?.value || "";

  sizeCode =
    tagliaRaw.split(" ")[0];

}

  
/* POOP BAG */

if (articolo === "poop-bag") {
  sizeCode = "";
}
  
  const leatherCode =
    leatherCodes[pelle] || "UNK";

  /* FOGLIE */

  let foglieCode = "00";

  if (
    foglieValue &&
    foglieValue !== "NO FOGLIE"
  ) {

    const index =
      coloriFoglie.indexOf(foglieValue);

    foglieCode =
      String(index).padStart(2, "0");
  }

  /* CRISTALLI */

  let cristalliCode = "00";

  if (
    cristalliValue &&
    cristalliValue !== "NO CRISTALLI"
  ) {

    const index =
      coloriCristalli.indexOf(cristalliValue);

    cristalliCode =
      String(index).padStart(2, "0");
  }

  /* TASSELLO */

  let tasselloCode = "00";

  if (
    caramellaValue === "Con tassello"
  ) {

    tasselloCode = "01";
  }

  if (sizeCode === "") {

  return `KT.${articleCode}.${leatherCode}.${foglieCode}.${cristalliCode}.${tasselloCode}`;

}

return `KT.${articleCode}.${sizeCode}.${leatherCode}.${foglieCode}.${cristalliCode}.${tasselloCode}`;

}





/* ---------------------- */
/* EXPORT PDF */
/* ---------------------- */

exportPdfBtn.addEventListener("click", async () => {
  const valid = validateOrder();
  if (!valid) {
    alert(
      "Compila tutti i campi obbligatori prima di esportare il PDF."
    );
    return;
  }
  await exportPDF();
});


/* POP-UP IMMAGINE */

window.addEventListener("DOMContentLoaded", () => {

const imageModal =
  document.getElementById("imageModal");

const modalImage =
  document.getElementById("modalImage");

/* APERTURA */
document.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("zoomable-image")
  ) {
    imageModal.style.display = "flex";
    modalImage.src = e.target.src;
  }
});

/* CHIUSURA */

imageModal.addEventListener("click", () => {

  imageModal.style.display = "none";
});
});



function validateOrder() {

  let isValid = true;

  /* ---------------------- */
  /* RESET ERRORI */
  /* ---------------------- */

  document
    .querySelectorAll(".field-error")
    .forEach(el => {
      el.classList.remove("field-error");
    });

  /* ---------------------- */
  /* DATI CLIENTE */
  /* ---------------------- */

  const customerFields = [

    document.getElementById("customerName"),

    document.getElementById("customerPhone"),

    document.getElementById("customerEmail"),

    document.getElementById("customerAddress")

  ];

  customerFields.forEach(field => {

    if (!field.value.trim()) {

      field.classList.add("field-error");

      isValid = false;
    }

  });

  /* ---------------------- */
  /* RIGHE ORDINE */
  /* ---------------------- */

  const rows =
    document.querySelectorAll(".order-row");

  rows.forEach(row => {

    const requiredFields = [

      row.querySelector(".articolo-select"),

      row.querySelector(".taglia-select"),

      row.querySelector(".altezza-select"),

      row.querySelector(".spessore-select"),

      row.querySelector(".pelle-select"),

      row.querySelector(".foglie-select"),

      row.querySelector(".cristalli-select"),

      row.querySelector(".caramella-select"),

      row.querySelector(".quantity-input")

    ];

    requiredFields.forEach(field => {

      /* se il campo non esiste -> skip */
      if (!field) return;

      /* readonly/non disponibile -> skip */
      if (
        field.hasAttribute("readonly") ||
        field.value === "Non disponibile"
      ) {
        return;
      }

      if (!field.value.trim()) {

        const box =
          field.closest(".field-box");

        if (box) {
          box.classList.add("field-error");
        }

        field.classList.add("field-error");

        isValid = false;
      }

    });

  });

  return isValid;
}

  /* ---------------------- */
  /* TEST PER PREZZI CONFIGURATORE */
  /* ---------------------- */

async function testFirestore() {
  const snapshot =
    await getDocs(
      collection(db, "pricingRules")
    );

  snapshot.forEach(doc => {
    console.log(doc.data());
  });
}

testFirestore();


  /* ---------------------- */
  /* RICERCA COMBINAZIONI PER PREZZI CONFIGURATORE */
  /* ---------------------- */


async function findPrice(config) {

  const q = query(
    collection(db, "pricingRules"),
    where("articolo", "==", config.articolo),
    where("taglia", "==", config.taglia),
    where("foglie", "==", config.foglie),
    where("cristalli", "==", config.cristalli)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log("NESSUN PREZZO TROVATO");
    return null;
  }

  const data = snapshot.docs[0].data();

  console.log("PREZZO TROVATO:", data.prezzo);

  return data.prezzo;

}






/* ---------------------- */
/* UPDATE PREZZO LIVE */
/* ---------------------- */

async function updateRowPrice(row) {

  const articoloSelect =
    row.querySelector(".articolo-select");

  if (!articoloSelect.value) return;

  const product =
    products[articoloSelect.value];

  if (!product) return;

  /* ---------------------- */
/* GENERAZIONE CODICE */
/* ---------------------- */

const codeInput =
  row.querySelector(".product-code-input");

if (codeInput) {

  codeInput.value =
    generateProductCode(row);

}

  /* NOME ARTICOLO */

  const articolo =
    product.nome.toLowerCase();

  /* TAGLIA */

  const taglia =
    row.querySelector(".taglia-select")?.value ||
    row.querySelector(".taglia-box input")?.value ||
    "";

  /* FOGLIE */

  const foglieValue =
    row.querySelector(".foglie-select")?.value;

  const foglie =
    foglieValue &&
    foglieValue !== "NO FOGLIE"
      ? 1
      : 0;

  /* CRISTALLI */

  const cristalliValue =
    row.querySelector(".cristalli-select")?.value;

  const cristalli =
    cristalliValue &&
    cristalliValue !== "NO CRISTALLI"
      ? 1
      : 0;

  /* CERCA PREZZO */

  const prezzo = await findPrice({

    articolo,
    taglia,
    foglie,
    cristalli

  });

  /* BOX PREZZO */

  const priceBox =
    row.querySelector(".price-value");
  if (prezzo !== null) {
    priceBox.textContent =
      `${prezzo.toFixed(2).replace(".", ",")} €`;
  } else {
    priceBox.textContent = "—";
  }
  updateSummary();
}


if (!isShop) {
  /* header prezzo */
  const headerPrezzo =
    document.querySelector(
      ".table-header"
    )?.children[10];
  if (headerPrezzo) {
    headerPrezzo.style.display = "none";
  }
}


















