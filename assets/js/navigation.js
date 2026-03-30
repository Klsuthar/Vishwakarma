document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector("[data-nav-toggle]");
  const navigation = document.getElementById("site-nav");
  const navLinks = Array.prototype.slice.call(document.querySelectorAll("#site-nav a"));
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    const target = link.getAttribute("href");

    if (target === currentFile) {
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", function () {
      closeNav();
    });
  });

  if (!toggleButton || !navigation) {
    return;
  }

  toggleButton.addEventListener("click", function () {
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closeNav();
      return;
    }

    document.body.classList.add("nav-open");
    toggleButton.setAttribute("aria-expanded", "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 900) {
      closeNav();
    }
  });

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggleButton.setAttribute("aria-expanded", "false");
  }
});
