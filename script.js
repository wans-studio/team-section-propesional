// Intersection Observer for Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Team section initialized');

    // Intersection Observer Options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is visible
                entry.target.classList.add('animate-in');
                
                // Optional: Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all team cards
    const teamCards = document.querySelectorAll('[data-animate]');
    teamCards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced Hover Effects
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale effect to card content
            const content = this.querySelector('.card-content');
            if (content) {
                content.style.transform = 'scale(1.02)';
                content.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const content = this.querySelector('.card-content');
            if (content) {
                content.style.transform = 'scale(1)';
            }
        });
    });

    // Smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add dynamic gradient animation to cards
    teamCards.forEach(card => {
        const gradientOverlay = card.querySelector('.gradient-overlay');
        if (gradientOverlay) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                gradientOverlay.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
                gradientOverlay.style.transition = 'transform 0.2s ease';
            });

            card.addEventListener('mouseleave', () => {
                gradientOverlay.style.transform = 'translate(0, 0)';
                gradientOverlay.style.transition = 'transform 0.5s ease';
            });
        }
    });

    // Performance optimization: Lazy load images if needed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading animation complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('All animations and interactions initialized successfully');
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized, layout adjusted');
    }, 250);
});