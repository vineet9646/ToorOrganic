document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.products-banner-slider .slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    let currentSlide = 0;
    const slideIntervalTime = 7000; // Change slide every 7 seconds
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Handle boundary conditions safely
        currentSlide = (index + slides.length) % slides.length;

        // Add active class to targeted slide
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-sliding initialization
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Manual Event Listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Fire up slider
    if (slides.length > 0) {
        startAutoSlide();
    }
});