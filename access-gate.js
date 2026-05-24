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

privateBtn.addEventListener("click", () => {

  overlay.style.display = "none";

});

shopBtn.addEventListener("click", () => {
  shopLoginBox.classList.remove("hidden");
});

loginBtn.addEventListener("click", () => {
  const username =
    document.getElementById("shopUsername").value;
  const password =
    document.getElementById("shopPassword").value;

  if (
    username === "negozio" &&
    password === "1234"
  ) {

    overlay.style.display = "none";
    localStorage.setItem("shopUser", "true");
  } else {
    loginError.style.display = "block";

  }

});
