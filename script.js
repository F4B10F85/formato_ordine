const orderRows = document.getElementById("orderRows");
const addRowBtn = document.getElementById("addRowBtn");

/* ---------------------- */
/* DATI CONFIGURATORE */
/* ---------------------- */

const taglieCollare = [
  "XXS (light)",
  "XS (light)",
  "S (light)",
  "S",
  "M",
  "L",
  "XL",
  "Personalizzata"
];

const altezzeCollare = {
  "XXS (light)": "1,5 cm",
  "XS (light)": "1,5 cm",
  "S (light)": "2 cm",
  "S": "2 cm",
  "M": "2,5 cm",
  "L": "3 cm",
  "XL": "3 cm",
  "Personalizzata": "Personalizzata"
};

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

        <option value="collare-standard">
          Collare standard
        </option>

      </select>
    </div>

    <!-- IMMAGINE -->
    <div class="field-box image-box">
      IMG
    </div>

    <!-- TAGLIA -->
    <div class="field-box">
      <select class="taglia-select">
        <option value="">
          Seleziona
        </option>
      </select>
    </div>

    <!-- ALTEZZA -->
    <div class="field-box">
      <input
        type="text"
        class="altezza-input"
        placeholder="-"
        readonly
      />
    </div>

    <!-- SPESSORE -->
    <div class="field-box">
      <input
        type="text"
        value="Non disponibile"
        readonly
      />
    </div>

    <!-- COLORE PELLE -->
    <div class="field-box">
      <select class="pelle-select">
        <option value="">
          Seleziona
        </option>

        ${coloriPelle.map(colore =>
          `<option>${colore}</option>`
        ).join("")}

      </select>
    </div>

    <!-- COLORE FOGLIE -->
    <div class="field-box">
      <select class="foglie-select">

        <option value="">
          Seleziona
        </option>

        ${coloriFoglie.map(colore =>
          `<option>${colore}</option>`
        ).join("")}

      </select>
    </div>

    <!-- COLORE CRISTALLI -->
    <div class="field-box">
      <select>

        <option value="">
          Seleziona
        </option>

        ${coloriCristalli.map(colore =>
          `<option>${colore}</option>`
        ).join("")}

      </select>
    </div>

    <!-- CARAMELLA -->
    <div class="field-box">
      <input
        type="text"
        value="Non disponibile"
        readonly
      />
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

  `;

  /* ---------------------- */
  /* ELEMENTI */
  /* ---------------------- */

  const articoloSelect = row.querySelector(".articolo-select");

  const tagliaSelect = row.querySelector(".taglia-select");

  const altezzaInput = row.querySelector(".altezza-input");

  const foglieSelect = row.querySelector(".foglie-select");

  /* ---------------------- */
  /* CAMBIO ARTICOLO */
  /* ---------------------- */

  articoloSelect.addEventListener("change", () => {

    tagliaSelect.innerHTML =
      `<option value="">Seleziona</option>`;

    if (articoloSelect.value === "collare-standard") {

      taglieCollare.forEach(taglia => {

        const option = document.createElement("option");

        option.value = taglia;

        option.textContent = taglia;

        tagliaSelect.appendChild(option);

      });

    }

  });

  /* ---------------------- */
  /* CAMBIO TAGLIA */
  /* ---------------------- */

  tagliaSelect.addEventListener("change", () => {

    const selectedTaglia = tagliaSelect.value;

    altezzaInput.value =
      altezzeCollare[selectedTaglia] || "";

    /* DISABILITA FOGLIE */

    if (
      selectedTaglia === "XXS (light)" ||
      selectedTaglia === "XS (light)"
    ) {

      foglieSelect.disabled = true;

      foglieSelect.value = "";

      foglieSelect.style.opacity = "0.5";

    } else {

      foglieSelect.disabled = false;

      foglieSelect.style.opacity = "1";

    }

  });

  return row;
}

/* ---------------------- */
/* RIGA INIZIALE */
/* ---------------------- */

orderRows.appendChild(createOrderRow());

/* ---------------------- */
/* NUOVA RIGA */
/* ---------------------- */

addRowBtn.addEventListener("click", () => {

  orderRows.appendChild(createOrderRow());

});
