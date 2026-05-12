document.addEventListener('DOMContentLoaded', () => {
    initTranslateControl();

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // If the link is to a different page (e.g., index.html#services from service-detail.html)
            if (targetId.startsWith('index.html#') && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
                window.location.href = targetId;
                return; // Stop further processing for this click
            }


            const targetElement = document.querySelector(targetId.includes('#') ? targetId.substring(targetId.indexOf('#')) : targetId);


            if (targetElement) {
                let offset = 70; // Default offset for sticky header
                const header = document.querySelector('header');
                if (header) {
                    offset = header.offsetHeight > 0 ? header.offsetHeight : 70;
                }

                if (targetId === '#home' || targetId === 'index.html#home') { // Handle #home from any page
                    offset = 0;
                }

                let scrollPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            } else if (this.getAttribute('href').includes('index.html#') && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
                // Special case for navigating to sections on index.html from index.html itself,
                // but targetElement wasn't found (e.g. after a page reload where the element is not yet in the DOM)
                // This logic might need refinement based on how your SPA/routing works if it's more complex.
                // For simple multi-page sites, this should be fine.
                const hash = targetId.substring(targetId.indexOf('#'));
                const elementOnIndex = document.querySelector(hash);
                if (elementOnIndex) {
                    let offset = 70;
                    const header = document.querySelector('header');
                    if (header) offset = header.offsetHeight > 0 ? header.offsetHeight : 70;
                    if (hash === '#home') offset = 0;

                    window.scrollTo({
                        top: elementOnIndex.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // --- GALLERY AND LIGHTBOX CODE ---
    const galleryCategories = [
        {
            id: "cnc-work",
            displayName: "CNC Work",
            displayNameHi: "सीएनसी वर्क",
            folderName: "CNC_Work",
            imageFiles: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg"]
        },
        {
            id: "bed",
            displayName: "Bed",
            displayNameHi: "बेड",
            folderName: "Bed",
            imageFiles: [
                "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
                "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg",
                "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg"
            ]
        },
        {
            id: "tv-unit",
            displayName: "TV Unit",
            displayNameHi: "टीवी यूनिट",
            folderName: "TV_Unit",
            imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]
        },
        { id: "sofa", displayName: "Sofa", displayNameHi: "सोफा", folderName: "Sofa", imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"] },
        { id: "kitchen", displayName: "Kitchen", displayNameHi: "किचन", folderName: "Kitchen", imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"] },
        {
            id: "cupboard",
            displayName: "Cupboard",
            displayNameHi: "अलमारी",
            folderName: "Cupboard",
            imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
        },
        {
            id: "mancha",
            displayName: "Mancha (Plang)",
            displayNameHi: "मांचा (पलंग)",
            folderName: "Mancha",
            imageFiles: ["1.jpg"]
        },
        {
            id: "bajot",
            displayName: "Bajot",
            displayNameHi: "बाजोट",
            folderName: "Bajot",
            imageFiles: ["1.jpg"]
        },
        {
            id: "door",
            displayName: "Door",
            displayNameHi: "दरवाजा",
            folderName: "Door",
            imageFiles: ["1.jpg"]
        },
        {
            id: "temple",
            displayName: "Temple",
            displayNameHi: "मंदिर",
            folderName: "Temple",
            imageFiles: [
                "heritage-teak-mandir-01.png",
                "heritage-teak-mandir-02.png",
                "heritage-teak-mandir-03.png",
                "heritage-teak-mandir-04.png",
                "heritage-teak-mandir-05.png",
                "heritage-teak-mandir-06.png",
                "heritage-teak-mandir-07.png"
            ]
        }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    function getPreferredLanguage() {
        return localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'hi';
    }

    function getCategoryDisplayName(category) {
        return getPreferredLanguage() === 'hi' && category.displayNameHi ? category.displayNameHi : category.displayName;
    }

    function getGalleryActionLabel() {
        return getPreferredLanguage() === 'hi' ? 'सभी देखें' : 'Tap to view all';
    }

    function populateGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        
        galleryCategories.forEach((category, categoryIndex) => {
            if (!category.imageFiles || category.imageFiles.length === 0) return;

            const firstImage = `images/${category.folderName}/${category.imageFiles[0]}`;
            const imgCount = category.imageFiles.length;
            const categoryName = getCategoryDisplayName(category);

            const item = document.createElement('div');
            item.className = 'gallery-item animate-on-scroll scale-up';
            item.style.transitionDelay = `${categoryIndex * 0.07}s`;

            const img = document.createElement('img');
            img.src = firstImage;
            img.alt = categoryName;
            img.className = 'gallery-card-img';
            img.onerror = () => { img.style.display = 'none'; };
            item.appendChild(img);

            const badge = document.createElement('div');
            badge.className = 'gallery-count-badge';
            badge.innerHTML = `<i class="fas fa-images"></i> ${imgCount}`;
            item.appendChild(badge);

            const overlay = document.createElement('div');
            overlay.className = 'gallery-card-overlay';

            const info = document.createElement('div');
            info.className = 'gallery-card-info notranslate';
            info.setAttribute('translate', 'no');
            info.innerHTML = `<h3>${categoryName}</h3><span>${getGalleryActionLabel()}</span>`;
            overlay.appendChild(info);

            const viewBtn = document.createElement('div');
            viewBtn.className = 'gallery-view-btn';
            viewBtn.innerHTML = '<i class="fas fa-expand"></i>';
            overlay.appendChild(viewBtn);

            item.appendChild(overlay);

            item.addEventListener('click', () => {
                openLightbox(category.id, 0);
            });

            galleryGrid.appendChild(item);
        });

        initializeScrollAnimations();
    }

    /* â”€â”€ LIGHTBOX GLOBALS & ELEMENTS â”€â”€ */
    const lbCategoryName = document.getElementById('lbCategoryName');
    const lbCounter   = document.getElementById('lbCounter');
    const lbCloseBtn  = document.getElementById('lbCloseBtn');
    const lbPrev      = document.getElementById('lbPrev');
    const lbNext      = document.getElementById('lbNext');
    const lbDots      = document.getElementById('lbDots');

    let currentLightboxImagePaths = [];
    let currentLightboxCategoryName = '';
    let currentImageIndex = 0;

    /* â”€â”€ LIGHTBOX FUNCTIONS â”€â”€ */
    function openLightbox(categoryId, imgIndex) {
        const category = galleryCategories.find(cat => cat.id === categoryId);
        if (!category || !lightbox || !category.imageFiles || category.imageFiles.length === 0) return;

        currentLightboxImagePaths = category.imageFiles.map(f => `images/${category.folderName}/${f}`);
        currentLightboxCategoryName = getCategoryDisplayName(category);
        currentImageIndex = imgIndex;

        if (lbDots) {
            lbDots.innerHTML = '';
            category.imageFiles.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'lb-dot' + (i === imgIndex ? ' active' : '');
                dot.addEventListener('click', () => { currentImageIndex = i; updateLightboxImage(); });
                lbDots.appendChild(dot);
            });
        }

        document.body.style.overflow = 'hidden';
        updateLightboxImage();
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        if (!currentLightboxImagePaths.length || !lightboxImage) return;
        const total = currentLightboxImagePaths.length;

        lightboxImage.src = currentLightboxImagePaths[currentImageIndex];
        lightboxImage.alt = `${currentLightboxCategoryName} - ${currentImageIndex + 1}`;

        if (lbCategoryName) lbCategoryName.textContent = currentLightboxCategoryName;
        if (lbCounter) lbCounter.textContent = `${currentImageIndex + 1} / ${total}`;

        if (lbDots) {
            lbDots.querySelectorAll('.lb-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentImageIndex);
            });
        }

        if (lbPrev) lbPrev.style.display = total > 1 ? 'flex' : 'none';
        if (lbNext) lbNext.style.display = total > 1 ? 'flex' : 'none';
    }

    function showNextImage() {
        if (currentLightboxImagePaths.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % currentLightboxImagePaths.length;
        updateLightboxImage();
    }

    function showPrevImage() {
        if (currentLightboxImagePaths.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + currentLightboxImagePaths.length) % currentLightboxImagePaths.length;
        updateLightboxImage();
    }

    if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
    if (lbPrev)     lbPrev.addEventListener('click', showPrevImage);
    if (lbNext)     lbNext.addEventListener('click', showNextImage);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft')  showPrevImage();
            else if (e.key === 'ArrowRight') showNextImage();
        }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
                if (dx < 0) showNextImage();
                else        showPrevImage();
            }
        }, { passive: true });
    }
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        // observerInstance.unobserve(entry.target); // Optional
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => {
                observer.observe(el);
            });
        } else {
            animatedElements.forEach(el => el.classList.add('animated'));
        }
    }

    // Initial population of gallery if on index.html
    if (document.querySelector('.gallery-grid')) { // Only run populateGallery if gallery-grid exists on the current page
        populateGallery();
    }
    initializeScrollAnimations(); // Initialize scroll animations on all pages


    // Handle direct navigation to hash from URL on page load
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => { // Timeout to ensure page layout is complete
                let offset = 70;
                const header = document.querySelector('header');
                if (header) {
                    offset = header.offsetHeight > 0 ? header.offsetHeight : 70;
                }
                if (hash === '#home') {
                    offset = 0;
                }
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

});

function initTranslateControl() {
    const languages = {
        hi: { label: 'हिन्दी', cookieValue: '/en/hi' },
        en: { label: 'English', cookieValue: '' }
    };
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'hi';
    const activeLanguage = languages[savedLanguage] ? savedLanguage : 'hi';

    document.documentElement.setAttribute('lang', activeLanguage);
    lockFixedLanguageText();

    if (activeLanguage === 'hi') {
        setTranslateCookie(languages.hi.cookieValue);
    } else {
        clearTranslateCookie();
    }

    let hiddenTranslate = document.getElementById('google_translate_element');
    if (!hiddenTranslate) {
        hiddenTranslate = document.createElement('div');
        hiddenTranslate.id = 'google_translate_element';
        hiddenTranslate.setAttribute('aria-hidden', 'true');
        document.body.appendChild(hiddenTranslate);
    }

    if (!document.querySelector('.translate-floating')) {
        const floatingTranslate = document.createElement('div');
        floatingTranslate.className = 'translate-floating notranslate';
        floatingTranslate.setAttribute('translate', 'no');
        floatingTranslate.innerHTML = `
            <button class="translate-toggle" type="button" aria-expanded="false" aria-label="Change language">
                <i class="fas fa-language" aria-hidden="true"></i>
                <span>भाषा</span>
                <strong>${languages[activeLanguage].label}</strong>
            </button>
            <div class="translate-menu" role="menu">
                <button type="button" class="${activeLanguage === 'hi' ? 'is-active' : ''}" data-language="hi" role="menuitem">हिन्दी</button>
                <button type="button" class="${activeLanguage === 'en' ? 'is-active' : ''}" data-language="en" role="menuitem">English</button>
            </div>
        `;
        document.body.appendChild(floatingTranslate);

        const toggle = floatingTranslate.querySelector('.translate-toggle');
        const menu = floatingTranslate.querySelector('.translate-menu');
        const activeLabel = toggle.querySelector('strong');

        toggle.addEventListener('click', () => {
            const isOpen = floatingTranslate.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        menu.querySelectorAll('button[data-language]').forEach(button => {
            button.addEventListener('click', () => {
                const selectedLanguage = button.getAttribute('data-language');
                if (!languages[selectedLanguage]) return;

                localStorage.setItem('preferredLanguage', selectedLanguage);
                activeLabel.textContent = languages[selectedLanguage].label;
                menu.querySelectorAll('button').forEach(item => item.classList.toggle('is-active', item === button));

                if (selectedLanguage === 'hi') {
                    setTranslateCookie(languages.hi.cookieValue);
                } else {
                    clearTranslateCookie();
                }

                window.location.reload();
            });
        });

        document.addEventListener('click', event => {
            if (!floatingTranslate.contains(event.target)) {
                floatingTranslate.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi,en',
                autoDisplay: false
            }, 'google_translate_element');
        };
    }

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
        const translateScript = document.createElement('script');
        translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        translateScript.async = true;
        document.body.appendChild(translateScript);
    }

    function setTranslateCookie(value) {
        const maxAge = 60 * 60 * 24 * 365;
        document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}`;
        document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}; max-age=${maxAge}`;
    }

    function clearTranslateCookie() {
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}

function lockFixedLanguageText() {
    const fixedTextSelectors = [
        'header',
        'footer',
        '.bottom-nav',
        'h1',
        'h2',
        'h3',
        'h4',
        '.section-title',
        '.cl-eyebrow',
        '.cr-map-label',
        '.gallery-card-info',
        '.lb-category-name'
    ];

    document.querySelectorAll(fixedTextSelectors.join(',')).forEach(element => {
        element.classList.add('notranslate');
        element.setAttribute('translate', 'no');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Bottom Navigation Logic
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const navIndicator = document.getElementById('navIndicator');
    
    function updateIndicator(activeItem) {
        if (!activeItem || !navIndicator) return;
        const navRect = activeItem.parentElement.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        
        const offsetLeft = itemRect.left - navRect.left;
        
        navIndicator.style.width = `${itemRect.width}px`;
        navIndicator.style.left = `${offsetLeft}px`;
    }

    // Set initial indicator
    const initialActive = document.querySelector('.bottom-nav .nav-item.active');
    setTimeout(() => updateIndicator(initialActive), 100);
    window.addEventListener('resize', () => {
        const active = document.querySelector('.bottom-nav .nav-item.active');
        if(active) updateIndicator(active);
    });

    bottomNavItems.forEach(item => {
        item.addEventListener('click', function() {
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
        });
    });

    // Handle scroll for index.html sections
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            if (window.pageYOffset < 100) current = 'home'; // Handle top

            let matched = false;
            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-target') === current) {
                    item.classList.add('active');
                    updateIndicator(item);
                    matched = true;
                }
            });
            
            // If no match (e.g. hero), default to home
            if(!matched && bottomNavItems.length > 0) {
                bottomNavItems[0].classList.add('active');
                updateIndicator(bottomNavItems[0]);
            }
        });
    }
});
