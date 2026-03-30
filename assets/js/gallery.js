document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-button]"));
  const productGrid = document.querySelector('[data-render="products"][data-mode="all"]');
  const emptyState = document.querySelector("[data-gallery-empty]");

  if (!filterButtons.length || !productGrid) {
    return;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.getAttribute("data-filter-value") || "all";

      filterButtons.forEach(function (item) {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      applyFilter(value);
    });
  });

  function applyFilter(value) {
    const cards = Array.prototype.slice.call(productGrid.querySelectorAll(".product-card"));
    let visibleCount = 0;

    cards.forEach(function (card) {
      const category = card.getAttribute("data-category");
      const isVisible = value === "all" || category === value;

      card.classList.toggle("is-hidden", !isVisible);

      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.classList.toggle("is-visible", visibleCount === 0);
    }
  }
});
