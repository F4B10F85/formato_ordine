const addRowBtn = document.getElementById("addRowBtn");

const orderRows = document.getElementById("orderRows");

addRowBtn.addEventListener("click", () => {

  const newRow = document.createElement("div");

  newRow.classList.add("order-row");

  newRow.innerHTML = `

    <div class="field-box">
      <select>
        <option>Seleziona</option>
        <option>Collare</option>
        <option>Guinzaglio</option>
        <option>Pettorina</option>
      </select>
    </div>

    <div class="field-box image-box">
      IMG
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>Seleziona</option>
      </select>
    </div>

    <div class="field-box">
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>

    <div class="field-box notes-box">
      <textarea placeholder="Note riga ordine..."></textarea>
    </div>

  `;

  orderRows.appendChild(newRow);

});
