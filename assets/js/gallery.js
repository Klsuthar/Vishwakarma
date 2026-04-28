document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-button]"));
  const productGrid = document.querySelector('[data-render="products"][data-mode="all"]');
  const emptyState = document.querySelector("[data-gallery-empty]");
  const galleryRoots = Array.prototype.slice.call(document.querySelectorAll("[data-product-gallery]"));
  const lightbox = galleryRoots.length ? createLightbox() : null;
  let activeGallery = [];
  let activeIndex = 0;
  let activeTitle = "";
  let lastFocusedElement = null;

  if (lightbox) {
    document.body.appendChild(lightbox.root);
    bindGalleryEvents();
  }

  if (filterButtons.length && productGrid) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const value = button.getAttribute("data-filter-value") || "all";
        const scrollTarget = button.getAttribute("data-filter-scroll");

        setActiveFilter(value);
        applyFilter(value);

        if (scrollTarget) {
          scrollToSection(scrollTarget);
        }
      });
    });
  }

  function bindGalleryEvents() {
    document.addEventListener("click", function (event) {
      const galleryItem = event.target.closest("[data-gallery-item]");
      const galleryOpenButton = event.target.closest("[data-gallery-open]");

      if (galleryItem) {
        const gallery = galleryItem.closest("[data-product-gallery]");

        if (!gallery) {
          return;
        }

        event.preventDefault();
        openLightbox(gallery, Number(galleryItem.getAttribute("data-gallery-index") || "0"), galleryItem);
        return;
      }

      if (galleryOpenButton) {
        const productCard = galleryOpenButton.closest(".product-card");
        const gallery = productCard ? productCard.querySelector("[data-product-gallery]") : null;

        if (!gallery) {
          return;
        }

        event.preventDefault();
        openLightbox(gallery, 0, galleryOpenButton);
        return;
      }

      if (!lightbox.root.classList.contains("is-open")) {
        return;
      }

      if (
        event.target.closest("[data-lightbox-close]") ||
        event.target.closest("[data-lightbox-backdrop]")
      ) {
        closeLightbox();
        return;
      }

      if (event.target.closest("[data-lightbox-prev]")) {
        showImage(activeIndex - 1);
        return;
      }

      if (event.target.closest("[data-lightbox-next]")) {
        showImage(activeIndex + 1);
        return;
      }

      const thumb = event.target.closest("[data-lightbox-thumb]");

      if (thumb) {
        showImage(Number(thumb.getAttribute("data-lightbox-thumb") || "0"));
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.root.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        showImage(activeIndex - 1);
        return;
      }

      if (event.key === "ArrowRight") {
        showImage(activeIndex + 1);
      }
    });
  }

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

  function setActiveFilter(value) {
    filterButtons.forEach(function (item) {
      const isActive = (item.getAttribute("data-filter-value") || "all") === value;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  }

  function openLightbox(gallery, index, triggerElement) {
    activeGallery = getGalleryImages(gallery);

    if (!activeGallery.length) {
      return;
    }

    activeTitle = gallery.getAttribute("data-gallery-title") || "Product gallery";
    activeIndex = normalizeIndex(index, activeGallery.length);
    lastFocusedElement = triggerElement || document.activeElement;

    lightbox.root.classList.add("is-open");
    lightbox.root.setAttribute("aria-hidden", "false");
    document.body.classList.add("product-lightbox-open");
    showImage(activeIndex);
    lightbox.closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.root.classList.remove("is-open");
    lightbox.root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("product-lightbox-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function showImage(index) {
    if (!activeGallery.length) {
      return;
    }

    activeIndex = normalizeIndex(index, activeGallery.length);

    lightbox.title.textContent = activeTitle;
    lightbox.counter.textContent = String(activeIndex + 1) + " / " + String(activeGallery.length);
    lightbox.image.src = activeGallery[activeIndex].src;
    lightbox.image.alt = activeGallery[activeIndex].alt;
    lightbox.thumbs.innerHTML = activeGallery
      .map(function (item, thumbIndex) {
        const activeClass = thumbIndex === activeIndex ? " is-active" : "";

        return [
          '<button class="product-lightbox__thumb' + activeClass + '" type="button" data-lightbox-thumb="' + String(thumbIndex) + '" aria-label="Open gallery photo ' + String(thumbIndex + 1) + '">',
          '<img src="' + escapeAttribute(item.src) + '" alt="' + escapeAttribute(item.alt) + '" loading="lazy">',
          "</button>"
        ].join("");
      })
      .join("");
  }

  function getGalleryImages(gallery) {
    return Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-item]"))
      .map(function (item) {
        return {
          src: item.getAttribute("data-gallery-src") || "",
          alt: item.getAttribute("data-gallery-alt") || "Product gallery image"
        };
      })
      .filter(function (item) {
        return item.src;
      });
  }

  function normalizeIndex(index, total) {
    if (!total) {
      return 0;
    }

    return (index + total) % total;
  }

  function scrollToSection(selector) {
    const target = document.querySelector(selector);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function createLightbox() {
    const root = document.createElement("div");

    root.className = "product-lightbox";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = [
      '<div class="product-lightbox__backdrop" data-lightbox-backdrop></div>',
      '<div class="product-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Product gallery viewer">',
      '<div class="product-lightbox__topbar">',
      "<div>",
      '<p class="product-lightbox__eyebrow">Photo Gallery</p>',
      '<h3 class="product-lightbox__title"></h3>',
      "</div>",
      '<div class="product-lightbox__topbar-actions">',
      '<p class="product-lightbox__counter"></p>',
      '<button class="product-lightbox__close" type="button" data-lightbox-close aria-label="Close gallery">Close</button>',
      "</div>",
      "</div>",
      '<div class="product-lightbox__stage">',
      '<button class="product-lightbox__nav" type="button" data-lightbox-prev aria-label="Previous image">Prev</button>',
      '<div class="product-lightbox__frame">',
      '<img class="product-lightbox__image" src="" alt="">',
      "</div>",
      '<button class="product-lightbox__nav" type="button" data-lightbox-next aria-label="Next image">Next</button>',
      "</div>",
      '<div class="product-lightbox__thumbs"></div>',
      "</div>"
    ].join("");

    return {
      root: root,
      title: root.querySelector(".product-lightbox__title"),
      counter: root.querySelector(".product-lightbox__counter"),
      image: root.querySelector(".product-lightbox__image"),
      thumbs: root.querySelector(".product-lightbox__thumbs"),
      closeButton: root.querySelector("[data-lightbox-close]")
    };
  }

  function escapeAttribute(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
});
