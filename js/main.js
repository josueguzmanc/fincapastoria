const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

function closeMenu() {
  menu.hidden = true;
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
burger.addEventListener("click", () => {
  const open = menu.hidden;
  menu.hidden = !open;
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const videos = document.querySelectorAll("video");
videos.forEach((video) => video.addEventListener("error", () => video.remove()));

const stats = document.querySelectorAll("[data-count]");
const seen = new Set();
const counter = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || seen.has(entry.target)) return;
    seen.add(entry.target);
    const el = entry.target.querySelector("b");
    const end = Number(entry.target.dataset.count);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1100);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString("es-MX");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 });
stats.forEach((item) => counter.observe(item));

document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const body = [...data.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
  document.querySelector("#form-ok").hidden = false;
  window.location.href = `mailto:pllvalentina@hotmail.com?subject=${encodeURIComponent("Cotización Finca Pastoria")}&body=${encodeURIComponent(body)}`;
});
