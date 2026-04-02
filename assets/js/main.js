(function () {
  const site = window.VISHWAKARMA_SITE;

  if (!site) {
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectSharedShell();
    bindSharedText();
    renderStats();
    renderHighlights();
    renderProcess();
    renderServices();
    renderProductFilters();
    renderProducts();
    renderTestimonials();
    renderFaq();
    renderContactCards();
    renderHours();
    bindMapEmbeds();
    setCurrentYear();
    activateReveals();
    bindScrollHeader();
  });

  function injectSharedShell() {
    queryAll("[data-site-header]").forEach(function (element) {
      element.innerHTML = createHeader();
    });

    queryAll("[data-site-footer]").forEach(function (element) {
      element.innerHTML = createFooter();
    });

    queryAll("[data-floating-cta]").forEach(function (element) {
      element.innerHTML = createFloatingCta();
    });

    injectMobileBottomNav();
  }

  function bindScrollHeader() {
    const headerWrap = document.querySelector(".header-wrap");
    if (!headerWrap) return;
    
    window.addEventListener("scroll", function() {
      if (window.scrollY > 20) {
        headerWrap.classList.add("is-scrolled");
      } else {
        headerWrap.classList.remove("is-scrolled");
      }
    }, { passive: true });
  }

  function bindSharedText() {
    setText("[data-brand-name]", site.brand.name);
    setText("[data-brand-short-name]", site.brand.shortName);
    setText("[data-brand-tagline]", site.brand.tagLine);
    setText("[data-brand-hero-badge]", site.brand.heroBadge);
    setText("[data-brand-hero-title]", site.brand.heroTitle);
    setText("[data-brand-hero-copy]", site.brand.heroCopy);
    setText("[data-brand-intro-copy]", site.brand.introCopy);
    setText("[data-service-area-title]", site.brand.serviceAreaTitle);
    setText("[data-service-area-copy]", site.brand.serviceArea.join(" | "));

    setText("[data-phone-display]", site.contact.phoneDisplay);
    setText("[data-whatsapp-display]", site.contact.whatsappDisplay);
    setText("[data-email-display]", site.contact.emailDisplay);
    setText("[data-address-title]", site.contact.addressTitle);
    setText("[data-address-copy]", site.contact.addressLines.join(", "));
    setText("[data-contact-note]", site.contact.note);

    setLink("[data-phone-link]", site.contact.phoneHref);
    setLink("[data-whatsapp-link]", site.contact.whatsappHref);
    setLink("[data-email-link]", site.contact.emailHref);
  }

  function renderStats() {
    queryAll('[data-render="hero-stats"]').forEach(function (container) {
      container.innerHTML = site.brand.stats
        .map(function (item) {
          return [
            '<article class="metric-card">',
            "<strong>" + escapeHtml(item.value) + "</strong>",
            "<span>" + escapeHtml(item.label) + "</span>",
            "</article>"
          ].join("");
        })
        .join("");
    });
  }

  function renderHighlights() {
    queryAll('[data-render="highlights"]').forEach(function (container) {
      container.innerHTML = site.highlights
        .map(function (item, index) {
          return [
            '<article class="feature-card">',
            '<div class="card-icon">' + String(index + 1).padStart(2, "0") + "</div>",
            "<h3>" + escapeHtml(item.title) + "</h3>",
            "<p>" + escapeHtml(item.copy) + "</p>",
            "</article>"
          ].join("");
        })
        .join("");
    });
  }

  function renderProcess() {
    queryAll('[data-render="process"]').forEach(function (container) {
      container.innerHTML = site.process
        .map(function (item) {
          return [
            '<article class="detail-card">',
            '<p class="eyebrow">' + escapeHtml(item.step) + "</p>",
            "<h3>" + escapeHtml(item.title) + "</h3>",
            "<p>" + escapeHtml(item.copy) + "</p>",
            "</article>"
          ].join("");
        })
        .join("");
    });
  }

  function renderServices() {
    queryAll('[data-render="services"]').forEach(function (container) {
      const mode = container.getAttribute("data-mode") || "all";
      const items = mode === "featured" ? site.services.slice(0, 4) : site.services;

      container.innerHTML = items
        .map(function (service) {
          return [
            '<article class="service-card">',
            '<div class="card-icon">' + escapeHtml(service.icon) + "</div>",
            "<h3>" + escapeHtml(service.title) + "</h3>",
            "<p>" + escapeHtml(service.summary) + "</p>",
            '<ul class="list-check">',
            service.points
              .map(function (point) {
                return "<li>" + escapeHtml(point) + "</li>";
              })
              .join(""),
            "</ul>",
            "</article>"
          ].join("");
        })
        .join("");
    });
  }

  function renderProductFilters() {
    queryAll('[data-render="product-filters"]').forEach(function (container) {
      container.innerHTML = site.productCategories
        .map(function (category, index) {
          const activeClass = index === 0 ? " is-active" : "";
          const activeState = index === 0 ? ' aria-pressed="true"' : ' aria-pressed="false"';

          return [
            '<button class="filter-btn' + activeClass + '" type="button" data-filter-button data-filter-value="',
            escapeHtml(category.id),
            '"' + activeState + ">",
            escapeHtml(category.label),
            "</button>"
          ].join("");
        })
        .join("");
    });
  }

  function renderProducts() {
    queryAll('[data-render="products"]').forEach(function (container) {
      const mode = container.getAttribute("data-mode") || "all";
      const items = mode === "featured" ? site.products.slice(0, 4) : site.products;

      container.innerHTML = items
        .map(function (product) {
          return createProductCard(product);
        })
        .join("");
    });
  }

  function renderTestimonials() {
    queryAll('[data-render="testimonials"]').forEach(function (container) {
      const limit = Number(container.getAttribute("data-limit") || "3");

      container.innerHTML = site.testimonials
        .slice(0, limit)
        .map(function (item) {
          return [
            '<article class="testimonial-card">',
            '<div class="quote-mark">"</div>',
            "<p>" + escapeHtml(item.quote) + "</p>",
            '<p class="testimonial-author">' + escapeHtml(item.author),
            "<span>" + escapeHtml(item.role) + "</span>",
            "</p>",
            "</article>"
          ].join("");
        })
        .join("");
    });
  }

  function renderFaq() {
    queryAll('[data-render="faq"]').forEach(function (container) {
      const limit = Number(container.getAttribute("data-limit") || String(site.faq.length));

      container.innerHTML = site.faq
        .slice(0, limit)
        .map(function (item) {
          return [
            '<details class="faq-item">',
            "<summary>" + escapeHtml(item.q) + "</summary>",
            "<p>" + escapeHtml(item.a) + "</p>",
            "</details>"
          ].join("");
        })
        .join("");
    });
  }

  function renderContactCards() {
    queryAll('[data-render="contact-cards"]').forEach(function (container) {
      const cards = [
        {
          title: "Call Us",
          body: site.contact.phoneDisplay,
          href: site.contact.phoneHref,
          icon: "CL",
          action: "Call now"
        },
        {
          title: "WhatsApp",
          body: site.contact.whatsappDisplay,
          href: site.contact.whatsappHref,
          icon: "WA",
          action: "Open WhatsApp"
        },
        {
          title: "Email",
          body: site.contact.emailDisplay,
          href: site.contact.emailHref,
          icon: "EM",
          action: "Send email"
        },
        {
          title: site.contact.addressTitle,
          body: site.contact.addressLines.join(", "),
          href: "contact.html",
          icon: "AD",
          action: "View details"
        }
      ];

      container.innerHTML = cards
        .map(function (card) {
          return [
            '<article class="contact-card">',
            '<div class="card-icon">' + escapeHtml(card.icon) + "</div>",
            "<h3>" + escapeHtml(card.title) + "</h3>",
            "<p>" + escapeHtml(card.body) + "</p>",
            '<a class="btn-ghost" href="' + escapeAttribute(card.href) + '">' + escapeHtml(card.action) + "</a>",
            "</article>"
          ].join("");
        })
        .join("");
    });

    queryAll('[data-render="address-lines"]').forEach(function (container) {
      container.innerHTML = site.contact.addressLines
        .map(function (line) {
          return "<li>" + escapeHtml(line) + "</li>";
        })
        .join("");
    });

    queryAll('[data-render="inquiry-checklist"]').forEach(function (container) {
      container.innerHTML = site.contact.inquiryChecklist
        .map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("");
    });

    queryAll('[data-render="service-area"]').forEach(function (container) {
      container.innerHTML = site.brand.serviceArea
        .map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("");
    });
  }

  function renderHours() {
    queryAll('[data-render="hours"]').forEach(function (container) {
      container.innerHTML = site.contact.hours
        .map(function (item) {
          return "<li><strong>" + escapeHtml(item.days) + ":</strong> " + escapeHtml(item.time) + "</li>";
        })
        .join("");
    });
  }

  function bindMapEmbeds() {
    queryAll("[data-map-embed]").forEach(function (frame) {
      frame.src = site.contact.mapEmbed;
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.title = site.contact.addressTitle;
    });
  }

  function setCurrentYear() {
    setText("[data-current-year]", String(new Date().getFullYear()));
  }

  function activateReveals() {
    const revealTargets = queryAll(
      ".hero__content, .hero__aside > *, .craft-ribbon__item, .section-panel, .feature-card, .service-card, .product-card, .testimonial-card, .faq-item, .contact-card, .detail-card, .cta-band, .page-hero__frame > *, .map-shell"
    );

    revealTargets.forEach(function (element, index) {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-order", String(index % 8));
    });

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealTargets.forEach(function (element) {
      observer.observe(element);
    });
  }

  function createHeader() {
    return [
      '<div class="header-wrap">',
      '<div class="container">',
      '<div class="header-shell">',
      '<a class="brand-mark" href="index.html" aria-label="Go to home page">',
      '<img src="assets/img/brand/luxury_logo.png" alt="Vishwakarma Wood Art & CNC Work logo">',
      "<span>",
      '<strong class="brand-mark__title">' + escapeHtml(site.brand.shortName) + "</strong>",
      '<span class="brand-mark__subtitle">' + escapeHtml(site.brand.tagLine) + "</span>",
      "</span>",
      "</a>",
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>',
      '<span class="nav-toggle__bar"></span>',
      '<span class="visually-hidden">Toggle navigation</span>',
      "</button>",
      '<nav class="site-nav" id="site-nav" aria-label="Primary navigation">',
      "<ul>",
      site.navigation
        .map(function (item) {
          return '<li><a href="' + escapeAttribute(item.href) + '" data-nav-link>' + escapeHtml(item.label) + "</a></li>";
        })
        .join(""),
      "</ul>",
      '<div class="nav-actions">',
      '<a class="nav-cta nav-cta--outline" href="' + escapeAttribute(site.contact.phoneHref) + '">Call</a>',
      '<a class="nav-cta nav-cta--solid" href="' + escapeAttribute(site.contact.whatsappHref) + '">WhatsApp</a>',
      "</div>",
      "</nav>",
      "</div>",
      "</div>",
      "</div>"
    ].join("");
  }

  function injectMobileBottomNav() {
    const siteShell = document.querySelector(".site-shell");

    if (!siteShell || siteShell.querySelector("[data-mobile-bottom-nav]")) {
      return;
    }

    siteShell.insertAdjacentHTML("beforeend", createMobileBottomNav());
  }

  function createMobileBottomNav() {
    return [
      '<nav class="mobile-bottom-nav" data-mobile-bottom-nav aria-label="Mobile navigation">',
      '<ul class="mobile-bottom-nav__list">',
      site.navigation
        .map(function (item) {
          return [
            "<li>",
            '<a class="mobile-bottom-nav__link" href="' + escapeAttribute(item.href) + '" data-nav-link>',
            '<span class="mobile-bottom-nav__icon" aria-hidden="true">' + getMobileNavIcon(item.href) + "</span>",
            '<span class="mobile-bottom-nav__label">' + escapeHtml(item.label) + "</span>",
            "</a>",
            "</li>"
          ].join("");
        })
        .join(""),
      "</ul>",
      "</nav>"
    ].join("");
  }

  function createFooter() {
    const hoursMarkup = site.contact.hours
      .map(function (item) {
        return "<li><strong>" + escapeHtml(item.days) + ":</strong> " + escapeHtml(item.time) + "</li>";
      })
      .join("");

    return [
      '<footer class="site-footer">',
      '<div class="container">',
      '<div class="footer-shell">',
      '<div class="footer-grid footer-grid--enhanced">',
      '<div class="footer-lead">',
      '<div class="footer-brand">',
      '<img src="assets/img/brand/luxury_logo.png" alt="Vishwakarma Wood Art & CNC Work logo">',
      "<div>",
      "<strong>" + escapeHtml(site.brand.name) + "</strong>",
      "</div>",
      "</div>",
      '<p class="footer-lead__copy">' + escapeHtml(site.brand.footerCopy) + "</p>",
      '<div class="footer-action-row">',
      '<a class="footer-action footer-action--primary" href="' + escapeAttribute(site.contact.phoneHref) + '">Call Now</a>',
      '<a class="footer-action footer-action--secondary" href="' + escapeAttribute(site.contact.whatsappHref) + '">WhatsApp</a>',
      "</div>",
      '<div class="chip-list">',
      site.services
        .slice(0, 4)
        .map(function (service) {
          return '<span class="chip">' + escapeHtml(service.title) + "</span>";
        })
        .join(""),
      "</div>",
      "</div>",
      '<div class="grid-2 footer-detail-grid">',
      '<article class="footer-card">',
      '<p class="footer-kicker">Workshop</p>',
      "<h3>Ramsara Workshop</h3>",
      '<ul class="footer-links footer-links--tight">',
      site.contact.addressLines
        .map(function (line) {
          return "<li>" + escapeHtml(line) + "</li>";
        })
        .join(""),
      "</ul>",
      '<p class="footer-inline-note">' + escapeHtml(site.contact.note) + "</p>",
      "</article>",
      '<div class="footer-card">',
      '<p class="footer-kicker">Quick Links</p>',
      "<h3>Pages</h3>",
      '<ul class="footer-links">',
      site.navigation
        .map(function (item) {
          return '<li><a href="' + escapeAttribute(item.href) + '">' + escapeHtml(item.label) + "</a></li>";
        })
        .join(""),
      "</ul>",
      "</div>",
      '<div class="footer-card">',
      '<p class="footer-kicker">Contact</p>',
      "<h3>Call or WhatsApp</h3>",
      '<ul class="footer-links footer-links--contact">',
      "<li><strong>Call</strong><a href=\"" + escapeAttribute(site.contact.phoneHref) + "\">" + escapeHtml(site.contact.phoneDisplay) + "</a></li>",
      "<li><strong>WhatsApp</strong><a href=\"" + escapeAttribute(site.contact.whatsappHref) + "\">" + escapeHtml(site.contact.whatsappDisplay) + "</a></li>",
      "<li><strong>Email</strong><a href=\"" + escapeAttribute(site.contact.emailHref) + "\">" + escapeHtml(site.contact.emailDisplay) + "</a></li>",
      "</ul>",
      "</div>",
      '<div class="footer-card">',
      '<p class="footer-kicker">Working Hours</p>',
      "<h3>Working Hours</h3>",
      '<ul class="hours-list">',
      hoursMarkup,
      "</ul>",
      '<p class="footer-inline-note">' + escapeHtml(site.brand.serviceArea.join(" | ")) + "</p>",
      "</div>",
      "</div>",
      "</div>",
      '<div class="footer-bottom">',
      "<p>Copyright <span data-current-year></span> " + escapeHtml(site.brand.shortName) + ". All rights reserved.</p>",
      "<p>" + escapeHtml(site.contact.addressLines.join(", ")) + "</p>",
      "</div>",
      "</div>",
      "</div>",
      "</footer>"
    ].join("");
  }

  function createFloatingCta() {
    return [
      '<div class="floating-cta" aria-label="Quick contact shortcuts">',
      '<a class="floating-cta__link floating-cta__link--call" href="' + escapeAttribute(site.contact.phoneHref) + '" aria-label="Call Us">',
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
      "<span>Call</span>",
      "</a>",
      '<a class="floating-cta__link floating-cta__link--whatsapp" href="' + escapeAttribute(site.contact.whatsappHref) + '" aria-label="WhatsApp Us">',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
      "<span>WhatsApp</span>",
      "</a>",
      "</div>"
    ].join("");
  }

  function getMobileNavIcon(href) {
    const page = String(href).split("/").pop() || "index.html";

    switch (page) {
      case "about.html":
        return [
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',
          '<path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"></path>',
          '<path d="M4.75 19a7.25 7.25 0 0 1 14.5 0"></path>',
          "</svg>"
        ].join("");
      case "services.html":
        return [
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',
          '<rect x="4" y="4" width="6" height="6" rx="1.5"></rect>',
          '<rect x="14" y="4" width="6" height="6" rx="1.5"></rect>',
          '<rect x="4" y="14" width="6" height="6" rx="1.5"></rect>',
          '<path d="M17 14v6"></path>',
          '<path d="M14 17h6"></path>',
          "</svg>"
        ].join("");
      case "products.html":
        return [
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',
          '<path d="M12 3 4.5 7.2V17L12 21l7.5-4V7.2L12 3Z"></path>',
          '<path d="M4.5 7.2 12 11l7.5-3.8"></path>',
          '<path d="M12 11v10"></path>',
          "</svg>"
        ].join("");
      case "contact.html":
        return [
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',
          '<path d="M21 11.5A8.5 8.5 0 0 1 8.86 19L3 21l2-5.86A8.5 8.5 0 1 1 21 11.5Z"></path>',
          '<path d="M9.5 10.5h5"></path>',
          '<path d="M9.5 14h3.5"></path>',
          "</svg>"
        ].join("");
      case "index.html":
      default:
        return [
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',
          '<path d="M3 10.5 12 3l9 7.5"></path>',
          '<path d="M5.25 9.75V21h13.5V9.75"></path>',
          '<path d="M9.5 21v-5.5h5V21"></path>',
          "</svg>"
        ].join("");
    }
  }

  function createProductCard(product) {
    const categoryLabel = findCategoryLabel(product.category);
    const galleryItems = Array.isArray(product.gallery) && product.gallery.length
      ? product.gallery
      : [
          {
            src: product.image || "assets/img/products/product-showcase.png",
            alt: product.title + " showcase image"
          }
        ];

    return [
      '<article class="product-card" data-category="' + escapeAttribute(product.category) + '">',
      '<div class="product-gallery" data-product-gallery data-gallery-title="' + escapeAttribute(product.title) + '">',
      '<div class="product-gallery__grid">',
      galleryItems
        .map(function (image, index) {
          return [
            '<button class="product-gallery__item" type="button" data-gallery-item data-gallery-index="' + String(index) + '" data-gallery-src="' + escapeAttribute(image.src) + '" data-gallery-alt="' + escapeAttribute(image.alt || (product.title + " image " + String(index + 1))) + '" aria-label="Open ' + escapeAttribute(product.title) + " photo " + String(index + 1) + ' full screen">',
            '<img src="' + escapeAttribute(image.src) + '" alt="' + escapeAttribute(image.alt || (product.title + " image " + String(index + 1))) + '" loading="lazy">',
            "</button>"
          ].join("");
        })
        .join(""),
      "</div>",
      '<span class="product-gallery__badge">' + String(galleryItems.length) + " photos</span>",
      "</div>",
      "<div>",
      '<p class="eyebrow">' + escapeHtml(categoryLabel) + "</p>",
      "<h3>" + escapeHtml(product.title) + "</h3>",
      "<p>" + escapeHtml(product.summary) + "</p>",
      '<p class="product-gallery__hint">Tap photo to view.</p>',
      '<ul class="product-meta">',
      "<li>" + escapeHtml(product.finish) + "</li>",
      "<li>" + escapeHtml(product.tag) + "</li>",
      "</ul>",
      '<a class="btn-ghost" href="contact.html">Ask about this work</a>',
      "</div>",
      "</article>"
    ].join("");
  }

  function findCategoryLabel(categoryId) {
    const match = site.productCategories.find(function (category) {
      return category.id === categoryId;
    });

    return match ? match.label : "Custom Work";
  }

  function setText(selector, value) {
    queryAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  function setLink(selector, href) {
    queryAll(selector).forEach(function (element) {
      element.setAttribute("href", href);
    });
  }

  function queryAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
})();
