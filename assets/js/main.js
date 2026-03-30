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
          title: "Call for quick discussion",
          body: site.contact.phoneDisplay,
          href: site.contact.phoneHref,
          icon: "CL",
          action: "Tap to call"
        },
        {
          title: "Chat on WhatsApp",
          body: site.contact.whatsappDisplay,
          href: site.contact.whatsappHref,
          icon: "WA",
          action: "Open WhatsApp"
        },
        {
          title: "Share references by email",
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
          action: "View contact page"
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
      '<img src="assets/img/brand/logo.png" alt="Vishwakarma Wood Art & CNC Work logo">',
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
          return '<li><a href="' + escapeAttribute(item.href) + '">' + escapeHtml(item.label) + "</a></li>";
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

  function createFooter() {
    return [
      '<footer class="site-footer">',
      '<div class="container">',
      '<div class="footer-shell">',
      '<div class="footer-grid">',
      '<div class="stack-md">',
      '<div class="footer-brand">',
      '<img src="assets/img/brand/logo.png" alt="Vishwakarma Wood Art & CNC Work logo">',
      "<div>",
      "<strong>" + escapeHtml(site.brand.name) + "</strong>",
      "<p>" + escapeHtml(site.brand.footerCopy) + "</p>",
      "</div>",
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
      '<div class="grid-2">',
      '<div class="footer-card">',
      "<h3>Quick links</h3>",
      '<ul class="footer-links">',
      site.navigation
        .map(function (item) {
          return '<li><a href="' + escapeAttribute(item.href) + '">' + escapeHtml(item.label) + "</a></li>";
        })
        .join(""),
      "</ul>",
      "</div>",
      '<div class="footer-card">',
      "<h3>Contact</h3>",
      '<ul class="footer-links">',
      "<li><a href=\"" + escapeAttribute(site.contact.phoneHref) + "\">" + escapeHtml(site.contact.phoneDisplay) + "</a></li>",
      "<li><a href=\"" + escapeAttribute(site.contact.whatsappHref) + "\">" + escapeHtml(site.contact.whatsappDisplay) + "</a></li>",
      "<li><a href=\"" + escapeAttribute(site.contact.emailHref) + "\">" + escapeHtml(site.contact.emailDisplay) + "</a></li>",
      "<li>" + escapeHtml(site.contact.addressLines.join(", ")) + "</li>",
      "</ul>",
      "</div>",
      "</div>",
      "</div>",
      '<div class="footer-bottom">',
      "<p>Copyright <span data-current-year></span> " + escapeHtml(site.brand.shortName) + ". Update placeholder business details before launch.</p>",
      "</div>",
      "</div>",
      "</div>",
      "</footer>"
    ].join("");
  }

  function createFloatingCta() {
    return [
      '<div class="floating-cta" aria-label="Quick contact shortcuts">',
      '<a class="floating-cta__link floating-cta__link--call" href="' + escapeAttribute(site.contact.phoneHref) + '">',
      "<span>Call</span>",
      "</a>",
      '<a class="floating-cta__link floating-cta__link--whatsapp" href="' + escapeAttribute(site.contact.whatsappHref) + '">',
      "<span>WhatsApp</span>",
      "</a>",
      "</div>"
    ].join("");
  }

  function createProductCard(product) {
    const categoryLabel = findCategoryLabel(product.category);

    return [
      '<article class="product-card" data-category="' + escapeAttribute(product.category) + '">',
      '<div class="product-visual" style="--product-accent:' + escapeAttribute(product.accent) + ';">',
      "<span>" + escapeHtml(categoryLabel) + "</span>",
      "</div>",
      "<div>",
      '<p class="eyebrow">' + escapeHtml(categoryLabel) + "</p>",
      "<h3>" + escapeHtml(product.title) + "</h3>",
      "<p>" + escapeHtml(product.summary) + "</p>",
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
