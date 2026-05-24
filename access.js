const accessOverlay =
  document.getElementById("accessOverlay");

const privateAccessBtn =
  document.getElementById("privateAccessBtn");

const shopAccessBtn =
  document.getElementById("shopAccessBtn");


privateAccessBtn.addEventListener("click", () => {

  accessOverlay.style.display = "none";

});


shopAccessBtn.addEventListener("click", () => {

  alert(
    "Area negozi in arrivo"
  );

});
