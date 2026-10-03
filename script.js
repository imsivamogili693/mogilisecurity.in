const overlay = document.getElementById("terminalOverlay");
const openButtons = [
  document.getElementById("terminalToggle"),
  document.getElementById("footerTerminal")
].filter(Boolean);
const closeButton = document.getElementById("terminalClose");

openButtons.forEach(btn => btn.addEventListener("click", () => {
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}));

closeButton.addEventListener("click", closeTerminal);
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeTerminal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeTerminal();
});

function closeTerminal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}

// Highlight navigation item while scrolling.
const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navItems.forEach(item => item.classList.remove("active"));
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (active) active.classList.add("active");
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

// Small terminal typing effect.
const terminal = document.querySelector(".terminal-body");
const cursor = terminal?.querySelector(".cursor");
let phase = 0;
const messages = [
  "scan --authorized --scope company-assets",
  "validate --minimal-impact",
  "report --responsible-disclosure"
];

setInterval(() => {
  if (!cursor) return;
  cursor.parentElement.innerHTML =
    `<span class="prompt-green">mogili@research</span>:~$ ${messages[phase]} <span class="cursor"></span>`;
  phase = (phase + 1) % messages.length;
}, 4200);
