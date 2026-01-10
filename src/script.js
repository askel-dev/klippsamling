console.log('Hello, World!');

// Video Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.video-carousel');
    const slides = document.querySelectorAll('.video-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentSlide = 0;
    let slidesArray = Array.from(slides);
    
    // Create indicators
    function createIndicators() {
        slidesArray.forEach((slide, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Go to video ${index + 1}`);
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Update indicators
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Pause all videos
        slidesArray.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        });
        
        // Update slides
        slidesArray[currentSlide].classList.remove('active');
        currentSlide = index;
        slidesArray[currentSlide].classList.add('active');
        
        // Update indicators
        updateIndicators();
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slidesArray.length;
        goToSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slidesArray.length) % slidesArray.length;
        goToSlide(prevIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Initialize indicators
    if (indicatorsContainer && slidesArray.length > 0) {
        createIndicators();
    }
    
    // Hide navigation buttons if only one slide
    if (slidesArray.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (indicatorsContainer) indicatorsContainer.style.display = 'none';
    }
});