document.addEventListener('DOMContentLoaded', () => {
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
            folderName: "CNC_Work",
            imageFiles: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg"]
        },
        {
            id: "bed",
            displayName: "Bed",
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
            folderName: "TV_Unit",
            imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]
        },
        { id: "sofa", displayName: "Sofa", folderName: "Sofa", imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"] },
        { id: "kitchen", displayName: "Kitchen", folderName: "Kitchen", imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"] },
        {
            id: "cupboard",
            displayName: "Cupboard",
            folderName: "Cupboard",
            imageFiles: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]
        }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');
    const lightboxPrevBtn = document.querySelector('.lightbox-prev-btn');
    const lightboxNextBtn = document.querySelector('.lightbox-next-btn');

    let currentLightboxImagePaths = [];
    let currentImageIndex = 0;
    let categorySlideshowIntervals = [];

    const categoryMeta = {
        'cnc-work':   { icon: 'fa-cogs',        desc: 'Intricate CNC routing & precision wood cutting patterns.', link: 'cnc-work.html' },
        'bed':        { icon: 'fa-bed',          desc: 'Custom beds crafted to fit your space & style perfectly.', link: 'custom-furniture.html' },
        'tv-unit':    { icon: 'fa-tv',           desc: 'Elegant TV units designed for modern living rooms.', link: 'custom-furniture.html' },
        'sofa':       { icon: 'fa-couch',        desc: 'Comfortable, handcrafted sofas built to last a lifetime.', link: 'custom-furniture.html' },
        'kitchen':    { icon: 'fa-utensils',     desc: 'Modular kitchens designed for beauty and functionality.', link: 'complete-home-furniture.html' },
        'cupboard':   { icon: 'fa-door-closed',  desc: 'Spacious, beautifully finished wardrobes & cupboards.', link: 'custom-furniture.html' }
    };

    function populateGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        categorySlideshowIntervals.forEach(clearInterval);
        categorySlideshowIntervals = [];

        galleryCategories.forEach((category, categoryIndex) => {
            if (!category.imageFiles || category.imageFiles.length === 0) return;

            const meta = categoryMeta[category.id] || { icon: 'fa-image', desc: 'Premium handcrafted work.', link: '#gallery' };
            const firstImage = `images/${category.folderName}/${category.imageFiles[0]}`;

            const item = document.createElement('div');
            item.className = 'gallery-item animate-on-scroll scale-up';
            item.style.transitionDelay = `${categoryIndex * 0.08}s`;

            const flipCard = document.createElement('div');
            flipCard.className = 'flip-card';

            const front = document.createElement('div');
            front.className = 'flip-card-front';

            const img = document.createElement('img');
            img.src = firstImage;
            img.alt = category.displayName;
            img.onerror = () => { img.style.display = 'none'; };
            front.appendChild(img);

            const flabel = document.createElement('div');
            flabel.className = 'flip-card-front-label';
            flabel.textContent = category.displayName;
            front.appendChild(flabel);

            const back = document.createElement('div');
            back.className = 'flip-card-back';

            const iconWrap = document.createElement('div');
            iconWrap.className = 'flip-back-icon';
            iconWrap.innerHTML = `<i class="fas ${meta.icon}"></i>`;
            back.appendChild(iconWrap);

            const titleEl = document.createElement('h3');
            titleEl.textContent = category.displayName;
            back.appendChild(titleEl);

            const descEl = document.createElement('p');
            descEl.textContent = meta.desc;
            back.appendChild(descEl);

            const btn = document.createElement('a');
            btn.href = meta.link;
            btn.className = 'flip-view-btn';
            btn.textContent = 'View Gallery';
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(category.id, 0);
                e.preventDefault();
            });
            back.appendChild(btn);

            flipCard.appendChild(front);
            flipCard.appendChild(back);
            item.appendChild(flipCard);

            item.addEventListener('click', () => {
                item.classList.toggle('flipped');
            });

            galleryGrid.appendChild(item);
        });

        initializeScrollAnimations();
    }

    function startItemSlideshow(sliderElement, numImages, intervalTime = 2500) {
        if (numImages <= 1) return;
        const images = sliderElement.querySelectorAll('img');
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (images[currentIndex]) images[currentIndex].classList.remove('active-slide');
            currentIndex = (currentIndex + 1) % images.length;
            if (images[currentIndex]) images[currentIndex].classList.add('active-slide');
        }, intervalTime);
        categorySlideshowIntervals.push(intervalId);
    }

    function openLightbox(categoryId, imgIndex) {
        const category = galleryCategories.find(cat => cat.id === categoryId);
        if (!category || !lightbox || !category.imageFiles || category.imageFiles.length === 0) return;

        currentLightboxImagePaths = category.imageFiles.map(fileName => `images/${category.folderName}/${fileName}`);
        currentImageIndex = imgIndex;

        document.body.style.overflow = 'hidden';
        updateLightboxImage(category.displayName);
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage(categoryDisplayName) {
        if (currentLightboxImagePaths.length === 0 || !lightboxImage || !lightboxCaption || !lightboxPrevBtn || !lightboxNextBtn) return;

        lightboxImage.src = currentLightboxImagePaths[currentImageIndex];
        lightboxImage.alt = `${categoryDisplayName} - Image ${currentImageIndex + 1} of ${currentLightboxImagePaths.length}`;
        lightboxCaption.textContent = `${categoryDisplayName} - Image ${currentImageIndex + 1} of ${currentLightboxImagePaths.length}`;

        const showNav = currentLightboxImagePaths.length > 1;
        lightboxPrevBtn.style.display = showNav ? 'block' : 'none';
        lightboxNextBtn.style.display = showNav ? 'block' : 'none';
    }

    function showNextImage() {
        if (currentLightboxImagePaths.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % currentLightboxImagePaths.length;
        const currentCategory = galleryCategories.find(cat => {
            const pathParts = currentLightboxImagePaths[currentImageIndex].split('/');
            return pathParts.length > 1 && cat.folderName === pathParts[pathParts.length - 2];
        });
        updateLightboxImage(currentCategory ? currentCategory.displayName : 'Image');
    }

    function showPrevImage() {
        if (currentLightboxImagePaths.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + currentLightboxImagePaths.length) % currentLightboxImagePaths.length;
        const currentCategory = galleryCategories.find(cat => {
            const pathParts = currentLightboxImagePaths[currentImageIndex].split('/');
            return pathParts.length > 1 && cat.folderName === pathParts[pathParts.length - 2];
        });
        updateLightboxImage(currentCategory ? currentCategory.displayName : 'Image');
    }


    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevImage);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && currentLightboxImagePaths.length > 1) {
                showPrevImage();
            } else if (e.key === 'ArrowRight' && currentLightboxImagePaths.length > 1) {
                showNextImage();
            }
        }
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    let touchstartX = 0;
    let touchendX = 0;
    const lightboxContentWrapper = document.querySelector('.lightbox-content-wrapper');

    if (lightboxContentWrapper) {
        lightboxContentWrapper.addEventListener('touchstart', function (event) {
            touchstartX = event.changedTouches[0].screenX;
        }, { passive: true });

        lightboxContentWrapper.addEventListener('touchend', function (event) {
            touchendX = event.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        if (currentLightboxImagePaths.length <= 1) return;
        const swipeThreshold = 50;
        if (touchendX < touchstartX - swipeThreshold) {
            showNextImage();
        }
        if (touchendX > touchstartX + swipeThreshold) {
            showPrevImage();
        }
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
