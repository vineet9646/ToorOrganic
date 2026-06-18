/**
 * TOOR ORGANIC - Complete Optimized JavaScript
 * Merged & Fixed for Desktop/Mobile Dropdowns + Product Animations
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. NAVIGATION & DROPDOWNS (Desktop & Mobile)
    ========================================== */
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");
    const dropdowns = document.querySelectorAll(".dropdown");
    const dropdownLinks = document.querySelectorAll(".dropdown > a");

    // Mobile Hamburger Toggle
    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            toggle.classList.toggle("active");
        });

        // Close menu when a standard link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                const isDropdown = this.parentElement.classList.contains("dropdown");
                if (!isDropdown) {
                    nav.classList.remove("active");
                    toggle.classList.remove("active");
                }
            });
        });
    }

    // Dropdown Logic for Desktop Click & Mobile Toggle
    dropdownLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const parent = this.parentElement;

            // On mobile or if the link is just a placeholder (#)
            if (window.innerWidth <= 992 || this.getAttribute('href') === '#') {
                e.preventDefault();

                // Close other open dropdowns
                dropdowns.forEach(item => {
                    if (item !== parent) item.classList.remove("active");
                });

                // Toggle current one
                parent.classList.toggle("active");
            }
        });
    });

    // Close Dropdowns if clicking anywhere outside the menu
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
            dropdowns.forEach(d => d.classList.remove("active"));
        }
    });


    /* ==========================================
       2. HERO SLIDER LOGIC
    ========================================== */
    const slidesContainer = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    if (slidesContainer && slideElements.length > 0) {
        let currentIndex = 0;
        const totalSlides = slideElements.length;

        slideElements.forEach((_, i) => {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dots span");

        function moveSlider() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[currentIndex]) dots[currentIndex].classList.add("active");
        }

        function nextSlide() { currentIndex = (currentIndex + 1) % totalSlides; moveSlider(); }
        function goToSlide(index) { currentIndex = index; moveSlider(); }

        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        if (prevBtn) prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            moveSlider();
        });

        let slideTimer = setInterval(nextSlide, 10000);
        const sliderBox = document.querySelector(".slider");
        if (sliderBox) {
            sliderBox.addEventListener("mouseenter", () => clearInterval(slideTimer));
            sliderBox.addEventListener("mouseleave", () => slideTimer = setInterval(nextSlide, 10000));
        }
    }


    /* ==========================================
          3. STICKY NAVBAR & BACK TO TOP
       ========================================== */
    const scrollBtn = document.getElementById("scrollTop");
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                // Keep the deep dark background color on scroll instead of changing to purple
                navbar.style.background = "rgba(20, 12, 3, 0.45)"; // Maintains the deep dark background color on scroll
                navbar.style.padding = "8px 0"; // Keeps the sticky navbar slim on scroll
            } else {
                navbar.style.padding = "15px 0"; // Returns to spacious default padding at top
            }
        }

        if (scrollBtn) {
            if (window.scrollY > 300) scrollBtn.classList.add("show");
            else scrollBtn.classList.remove("show");
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ==========================================
       4. 3D TILT ANIMATION (Testimonials)
    ========================================== */
    const testimonialCards = document.querySelectorAll('.test-card');

    testimonialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -10;
            const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });


    /* ==========================================
       5. INFINITE SCROLL REVEAL (Product Animations)
    ========================================== */
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            } else {
                // Allows repeating animation on scroll back
                entry.target.classList.remove('reveal');
            }
        });
    }, revealOptions);

    // Track standard product header and standard product cards
    const header = document.querySelector('.product-header');
    if (header) revealObserver.observe(header);

    document.querySelectorAll('.animate-card, .animate-title, .range-row').forEach(el => {
        revealObserver.observe(el);
    });


    /* ==========================================
       6. PRODUCT PAGE (Image & Size Selection)
    ========================================== */
    const mainImg = document.getElementById("mainProductImage");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const thumbnails = document.querySelectorAll(".thumb");

    function updateProductView(newSrc, clickedBtn) {
        if (!mainImg || !newSrc) return;

        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
        }, 150);

        if (clickedBtn) {
            sizeBtns.forEach(btn => btn.classList.remove("active"));
            clickedBtn.classList.add("active");
        }

        // Sync thumbnails
        thumbnails.forEach(thumb => {
            if (thumb.getAttribute('data-image') === newSrc) {
                thumb.classList.add("active");
            } else {
                thumb.classList.remove("active");
            }
        });
    }

    sizeBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const newSrc = this.getAttribute("data-image");
            updateProductView(newSrc, this);
        });
    });

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function () {
            const newSrc = this.getAttribute("data-image");
            const matchingBtn = Array.from(sizeBtns).find(b => b.getAttribute('data-image') === newSrc);
            updateProductView(newSrc, matchingBtn);
        });
    });

});

/**
 * Global Helpers
 */
function highlightCard(element) {
    const allCards = document.querySelectorAll('.cert-card');
    allCards.forEach(card => card.classList.remove('featured'));
    element.classList.add('featured');
}