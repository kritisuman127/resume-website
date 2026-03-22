// Navigation Active Link Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Function to update active nav link
    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const activeLink = document.querySelector(
                    `.nav-link[href="#${section.id}"]`
                );
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Update on page load
    updateActiveLink();

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Skill badge interaction
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.setProperty('--index', index);
        badge.addEventListener('mouseenter', () => {
            skillBadges.forEach(b => {
                if (b !== badge) {
                    b.style.opacity = '0.5';
                }
            });
        });

        badge.addEventListener('mouseleave', () => {
            skillBadges.forEach(b => {
                b.style.opacity = '1';
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all timeline items and education cards
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .education-card, .skill-badge'
    );
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;

        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        lastScrollTop = scrollTop;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent page jump on anchor links
document.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (header) {
        if (window.scrollY > 0) {
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backdropFilter = 'blur(0)';
        }
    }
});
