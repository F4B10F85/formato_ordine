const orderRows = document.getElementById("orderRows");
const addRowBtn = document.getElementById("addRowBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const validateBtn = document.getElementById("validateBtn");

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

  });

  return row;
}

/* ---------------------- */
/* RIGA INIZIALE */
/* ---------------------- */

orderRows.appendChild(
  createOrderRow()
);

/* ---------------------- */
/* AGGIUNGI RIGA */
/* ---------------------- */

addRowBtn.addEventListener("click", () => {

  orderRows.appendChild(
    createOrderRow()
  );

});

/* ---------------------- */
/* CANCELLA TUTTO */
/* ---------------------- */

clearAllBtn.addEventListener("click", () => {

  orderRows.innerHTML = "";

  orderRows.appendChild(
    createOrderRow()
  );

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
