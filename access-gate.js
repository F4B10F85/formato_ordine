import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



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

  sessionStorage.setItem(
    "userType",
    "private"
  );

  overlay.style.display = "none";

  location.reload();

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

loginBtn.addEventListener("click", async () => {

  const email =
    document.getElementById("shopUsername").value;

  const password =
    document.getElementById("shopPassword").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    sessionStorage.setItem(
      "userType",
      "shop"
    );
    
    overlay.style.display = "none";

    location.reload();

  } catch (error) {

    loginError.classList.add("show");

  }

});
