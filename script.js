const orderRows = document.getElementById("orderRows");
const addRowBtn = document.getElementById("addRowBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

/* ---------------------- */
/* DATI CONFIGURATORE */
/* ---------------------- */

const taglieCollareStandard = [
  "XXS (light)",
  "XS (light)",
  "S (light)",
  "S",
  "M",
  "L",
  "XL",
  "Personalizzata"
];

const taglieCollareCaramella = [
  "XS",
  "S",
  "M",
  "L",
  "Personalizzata"
];

const taglieCollareManiglia = [
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

const altezzeCollareManiglia = [
  "3 cm",
  "4 cm",
  "5 cm",
  "Personalizzata"
];

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

        <option value="collare-caramella">
          Collare caramella
        </option>

        <option value="collare-maniglia">
          Collare con maniglia
        </option>

      </select>
    </div>

    <!-- IMMAGINE -->
    <div class="field-box image-box"></div>

    <!-- TAGLIA -->
    <div class="field-box">
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
    <div class="field-box">

      <input
        type="text"
        class="spessore-input"
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

      <select class="cristalli-select">

        <option value="">
          Seleziona
        </option>

        ${coloriCristalli.map(colore =>
          `<option>${colore}</option>`
        ).join("")}

      </select>

    </div>

    <!-- CARAMELLA -->
    <div class="field-box caramella-box">

      <input
        type="text"
        class="caramella-input"
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
    

    <!-- ELIMINA RIGA -->
    <div class="delete-row-btn">
      🗑
    </div>

  `;

  /* ---------------------- */
  /* ELEMENTI */
  /* ---------------------- */

  const articoloSelect = row.querySelector(".articolo-select");

  const tagliaSelect = row.querySelector(".taglia-select");

  const altezzaBox = row.querySelector(".altezza-box");

  const foglieSelect = row.querySelector(".foglie-select");

  const spessoreInput = row.querySelector(".spessore-input");

  const caramellaBox = row.querySelector(".caramella-box");

  const imageBox = row.querySelector(".image-box");

  const deleteBtn = row.querySelector(".delete-row-btn");

  /* ---------------------- */
  /* CAMBIO ARTICOLO */
  /* ---------------------- */

  articoloSelect.addEventListener("change", () => {

    /* RESET */

    imageBox.innerHTML = "";

    tagliaSelect.innerHTML = `
      <option value="">
        Seleziona
      </option>
    `;

    altezzaBox.innerHTML = `
      <input
        type="text"
        class="altezza-input"
        placeholder="-"
        readonly
      />
    `;

    foglieSelect.disabled = false;
    foglieSelect.style.opacity = "1";

    spessoreInput.value = "";

    /* ---------------------- */
    /* COLLARE STANDARD */
    /* ---------------------- */

    if (articoloSelect.value === "collare-standard") {

      taglieCollareStandard.forEach(taglia => {

        const option = document.createElement("option");

        option.value = taglia;

        option.textContent = taglia;

        tagliaSelect.appendChild(option);

      });

      spessoreInput.value = "Non disponibile";

      caramellaBox.innerHTML = `
        <input
          type="text"
          class="caramella-input"
          value="Non disponibile"
          readonly
        />
      `;

      imageBox.innerHTML = `
        <img
          class="product-image"
          src="assets/images/collare_standard.jpg"
          alt="Collare standard"
        />
      `;
    }

    /* ---------------------- */
    /* COLLARE CARAMELLA */
    /* ---------------------- */

    if (articoloSelect.value === "collare-caramella") {

      taglieCollareCaramella.forEach(taglia => {

        const option = document.createElement("option");

        option.value = taglia;

        option.textContent = taglia;

        tagliaSelect.appendChild(option);

      });

      spessoreInput.value = "Non disponibile";

      caramellaBox.innerHTML = `
        <select class="caramella-select">

          <option value="">
            Seleziona
          </option>

          <option value="con-tassello">
            Con tassello
          </option>

          <option value="senza-tassello">
            Senza tassello
          </option>

        </select>
      `;

      imageBox.innerHTML = `
        <img
          class="product-image"
          src="assets/images/collare_caramella.jpg"
          alt="Collare caramella"
        />
      `;
    }

    /* ---------------------- */
    /* COLLARE MANIGLIA */
    /* ---------------------- */

    if (articoloSelect.value === "collare-maniglia") {

      taglieCollareManiglia.forEach(taglia => {

        const option = document.createElement("option");

        option.value = taglia;

        option.textContent = taglia;

        tagliaSelect.appendChild(option);

      });

      altezzaBox.innerHTML = `
        <select class="altezza-select">

          <option value="">
            Seleziona
          </option>

          ${altezzeCollareManiglia.map(altezza =>
            `<option>${altezza}</option>`
          ).join("")}

        </select>
      `;

      spessoreInput.value = "Non disponibile";

      caramellaBox.innerHTML = `
        <input
          type="text"
          class="caramella-input"
          value="Non disponibile"
          readonly
        />
      `;

      imageBox.innerHTML = `
        <img
          class="product-image"
          src="assets/images/collare_maniglia.jpg"
          alt="Collare con maniglia"
        />
      `;
    }

  });

  /* ---------------------- */
  /* CAMBIO TAGLIA */
  /* ---------------------- */

  tagliaSelect.addEventListener("change", () => {

    const altezzaInput = row.querySelector(".altezza-input");

    if (!altezzaInput) return;

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

deleteBtn.addEventListener("click", () => {

  row.remove();

});

deleteBtn.addEventListener("click", () => {
  row.remove();
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

clearAllBtn.addEventListener("click", () => {

  orderRows.innerHTML = "";

  orderRows.appendChild(createOrderRow());

});
