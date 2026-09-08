/**
 * Yashendri Senevirathna - Portfolio JavaScript
 * Handles Theme Toggling, Mobile Navigation, Modal Dialogs,
 * Scroll Tracking, and Contact Form Submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Scroll Fade-in Animation via IntersectionObserver
    // -------------------------------------------------------------------------
    const faders = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    } else {
        // Fallback for older browsers
        faders.forEach(fader => fader.classList.add('appear'));
    }

    // -------------------------------------------------------------------------
    // 2. Theme Toggle (Dark Plum & Coral vs Light Mode)
    // -------------------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else if (savedTheme === null && !systemPrefersDark) {
        body.setAttribute('data-theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // -------------------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle & Accessible Focus
    // -------------------------------------------------------------------------
    const menuToggle = document.getElementById('mobile-menu');
    const navActions = document.querySelector('.nav-actions');

    if (menuToggle && navActions) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navActions.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            menuToggle.innerText = isActive ? '✕' : '☰';
        });

        // Close menu when clicking nav links
        const navItems = navActions.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navActions.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerText = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navActions.classList.contains('active') && !navActions.contains(e.target) && e.target !== menuToggle) {
                navActions.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerText = '☰';
            }
        });
    }

    // -------------------------------------------------------------------------
    // 4. Dynamic Navigation Active Highlighting on Scroll
    // -------------------------------------------------------------------------
    const trackedSections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveNav = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160;

        trackedSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // -------------------------------------------------------------------------
    // 5. Case Study Modal System (Accessible & Keyboard Navigable)
    // -------------------------------------------------------------------------
    const modals = document.querySelectorAll('.modal-overlay');
    const triggers = document.querySelectorAll('.modal-trigger');
    const closeBtns = document.querySelectorAll('.modal-close');
    let lastActiveElement = null;

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            lastActiveElement = document.activeElement;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Focus on close button inside modal
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            if (lastActiveElement) {
                lastActiveElement.focus();
                lastActiveElement = null;
            }
        }
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Close on overlay backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModalEl = document.querySelector('.modal-overlay.active');
            if (openModalEl) {
                closeModal(openModalEl);
            }
        }
    });

    // -------------------------------------------------------------------------
    // 6. Contact Form API Submission
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!email || !message) {
                formMessage.innerText = "Please fill out both your email and message.";
                formMessage.className = "error-text";
                formMessage.style.display = 'block';
                return;
            }

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, message })
                });

                const data = await response.json().catch(() => ({}));

                if (response.ok) {
                    formMessage.innerText = "Thank you for reaching out! Your message has been sent successfully. I'll get back to you soon.";
                    formMessage.className = "success-text";
                    formMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    formMessage.innerText = data.error || "Unable to send message right now. Please reach out directly to yashendrisenevirathna@gmail.com.";
                    formMessage.className = "error-text";
                    formMessage.style.display = 'block';
                }
            } catch (err) {
                console.error("Submission Error", err);
                formMessage.innerText = "Network error. Please reach out directly to yashendrisenevirathna@gmail.com.";
                formMessage.className = "error-text";
                formMessage.style.display = 'block';
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
            }
        });
    }
});
