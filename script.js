// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on click of a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Intersection Observer for scroll animations (Reveal Effect)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Smooth Scrolling for anchor links (if browser doesn't support css smooth scroll, this helps)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Allow default for empty or just "#"
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lead Generation Popup Logic
    const popupOverlay = document.getElementById('leadPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const leadForm = document.getElementById('leadForm');
    const popupTriggers = document.querySelectorAll('.popup-trigger');

    if (popupOverlay) {
        // Open popup on button click
        popupTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                popupOverlay.classList.add('active');
            });
        });

        closePopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });

        // Close on clicking outside modal
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });

        // Form submission simulation
        if (leadForm) {
            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = leadForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                
                setTimeout(() => {
                    popupOverlay.classList.remove('active');
                    btn.textContent = originalText;
                    leadForm.reset();
                }, 1500);
            });
        }
    }

});
