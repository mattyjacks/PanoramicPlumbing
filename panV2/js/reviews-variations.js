/* ============================================
   REVIEWS VARIATIONS - JavaScript Controllers
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initRV1Carousel();
    initRV2Carousel();
    initRV3Ticker();
});

/* ============================================
   VARIATION 1: Horizontal Sliding Carousel
   ============================================ */
function initRV1Carousel() {
    const wrapper = document.querySelector('.rv1-carousel-wrapper');
    if (!wrapper) return;

    const track = wrapper.querySelector('.rv1-carousel-track');
    const cards = wrapper.querySelectorAll('.rv1-review-card');
    const prevBtn = document.querySelector('.rv1-prev-btn');
    const nextBtn = document.querySelector('.rv1-next-btn');
    const dotsContainer = document.querySelector('.rv1-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(cards.length / cardsPerView);

    function getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'rv1-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.rv1-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        const offset = currentIndex * (100 / cardsPerView) * cardsPerView;
        track.style.transform = `translateX(-${offset}%)`;
        updateDots();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1 >= totalSlides ? 0 : currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    createDots();

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                totalSlides = Math.ceil(cards.length / cardsPerView);
                currentIndex = 0;
                createDots();
                goToSlide(0);
            }
        }, 250);
    });

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    wrapper.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

/* ============================================
   VARIATION 2: Fade Carousel
   ============================================ */
function initRV2Carousel() {
    const wrapper = document.querySelector('.rv2-carousel-wrapper');
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.rv2-review-card');
    const prevBtn = document.querySelector('.rv2-prev-btn');
    const nextBtn = document.querySelector('.rv2-next-btn');
    const counter = document.querySelector('.rv2-counter');

    if (cards.length === 0) return;

    let currentIndex = 0;

    function updateCounter() {
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${cards.length}`;
        }
    }

    function goToSlide(index) {
        cards[currentIndex].classList.remove('active');
        currentIndex = index;
        if (currentIndex >= cards.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        cards[currentIndex].classList.add('active');
        updateCounter();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Initialize first slide
    cards[0].classList.add('active');
    updateCounter();

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 6000);
    
    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    wrapper.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 6000);
    });

    // Keyboard navigation
    wrapper.setAttribute('tabindex', '0');
    wrapper.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

/* ============================================
   VARIATION 3: Ticker/Marquee
   ============================================ */
function initRV3Ticker() {
    const track = document.querySelector('.rv3-ticker-track');
    if (!track) return;

    // Clone items for infinite scroll
    const items = track.querySelectorAll('.rv3-review-card');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}
