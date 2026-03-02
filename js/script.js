// Tool 1: Highlight the current page in the navigation
(function highlightCurrentNav() {
  const links = document.querySelectorAll("nav a");
  const current = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) {
      a.setAttribute("aria-current", "page");
      a.classList.add("onpage");
    }
  });
})();

// Tool 2: Back-to-top button
(function backToTopButton() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "back-to-top";
  btn.textContent = "Back to top";
  btn.style.display = "none";

  document.body.appendChild(btn);

  function toggleButton() {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleButton);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();