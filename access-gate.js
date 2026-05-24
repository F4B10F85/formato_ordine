const overlay = document.getElementById("accessOverlay");

const privateBtn =
  document.getElementById("privateAccessBtn");

const shopBtn =
  document.getElementById("shopAccessBtn");

const shopLoginBox =
  document.getElementById("shopLoginBox");

const loginBtn =
  document.getElementById("shopLoginBtn");

const loginError =
  document.getElementById("loginError");

/* ---------------------- */
/* ACCESSO PRIVATO */
/* ---------------------- */

privateBtn.addEventListener("click", () => {

  overlay.style.display = "none";

});

/* ---------------------- */
/* ACCESSO NEGOZIO */
/* ---------------------- */

shopBtn.addEventListener("click", () => {

  shopLoginBox.classList.remove("hidden");

});

/* ---------------------- */
/* LOGIN NEGOZIO */
/* ---------------------- */

loginBtn.addEventListener("click", () => {

  const username =
    document.getElementById("shopUsername").value;

  const password =
    document.getElementById("shopPassword").value;

  /* CREDENZIALI TEST */

  if (
    username === "negozio" &&
    password === "1234"
  ) {

    overlay.style.display = "none";

  } else {

    loginError.classList.add("show");

  }

});
