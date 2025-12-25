import { gsap } from "https://esm.sh/gsap@3.12.2?bundle";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.2/ScrollTrigger?bundle";
import { ScrollToPlugin } from "https://esm.sh/gsap@3.12.2/ScrollToPlugin?bundle";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- LOADER ANIMATION ---
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
    const mainContent = document.querySelector('.main');

    const loaderTimeline = gsap.timeline({
        onComplete: () => {
            loader.style.display = 'none';
            mainContent.style.opacity = 1;
            // Start hero animation after loader is gone
            animateHero();
            // Start other animations
            initScrollAnimations();
        }
    });

    loaderTimeline
        .to(loaderText, { opacity: 1, duration: 1, ease: 'power2.inOut' })
        .to(loaderText, { y: -50, opacity: 0, duration: 0.8, ease: 'power2.in' }, '+=1')
        .to(loader, { y: '-100%', duration: 1, ease: 'power2.inOut' });

    // --- HERO ANIMATION ---
    function animateHero() {
        const heroTitle = document.querySelector('.hero-title');
        gsap.from(heroTitle.children, {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5 // Delay to start after loader
        });
    }

    // --- MOBILE NAVIGATION ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile nav when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // --- SCROLL-BASED ANIMATIONS ---
    function initScrollAnimations() {
        // Animate work items
        gsap.utils.toArray('.work-item').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Animate about section text
        gsap.from('.about-content p, .about-content .cta-link', {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 70%',
            }
        });

        // Animate service items
        gsap.utils.toArray('.service-item').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                }
            });
        });

        // Animate contact section
        gsap.from('.contact h2, .contact .contact-email', {
            opacity: 0,
            y: 40,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
            }
        });
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}); 