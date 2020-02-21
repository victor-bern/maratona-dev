const btn = document.querySelector("[data-button]");
const form = document.querySelector(".form");

function openFormu() {
  form.classList.toggle("active");
}

btn.addEventListener("click", openFormu);
