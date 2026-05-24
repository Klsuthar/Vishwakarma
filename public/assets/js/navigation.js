document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector("[data-nav-toggle]");
  const navigation = document.getElementById("site-nav");
  const navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
  const currentFile = getCurrentFile();

  navLinks.forEach(function (link) {
    const target = getTargetFile(link.getAttribute("href"));

    if (target === currentFile) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
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
    if (!toggleButton) {
      return;
    }

    document.body.classList.remove("nav-open");
    toggleButton.setAttribute("aria-expanded", "false");
  }

  function getCurrentFile() {
    const path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function getTargetFile(href) {
    if (!href) {
      return "";
    }

    return href.split("#")[0].split("?")[0].split("/").pop() || "index.html";
  }
});
