document.addEventListener('DOMContentLoaded', () => {
    // Scroll Fade-in logic
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Mobile Menu Toggle implementation
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(17, 34, 80, 0.98)';
                navLinks.style.padding = '2rem 0';
                navLinks.style.textAlign = 'center';
                navLinks.style.borderBottom = '1px solid rgba(224, 197, 143, 0.1)';
            }
        });

        // Close mobile overlay on choice click
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if(window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // Dynamic Navigation active highlighting
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // Case Study Modal System
    const modals = document.querySelectorAll('.modal-overlay');
    const triggers = document.querySelectorAll('.modal-trigger');
    const closeBtns = document.querySelectorAll('.modal-close');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if(modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // lock scrolling underneath
            }
        });
    });

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // allow scrolling again
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Contact Form Backend API
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;
            btn.innerText = 'Connecting...';
            btn.disabled = true;

            const formData = {
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Submit payload to the local Express backend hook
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    formMessage.innerText = "Connection initialized. Your message has safely landed.";
                    formMessage.className = "success-text";
                    formMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    formMessage.innerText = data.error || "The link failed. Please try again later.";
                    formMessage.className = "error-text";
                    formMessage.style.display = 'block';
                }
            } catch (err) {
                console.error("Transmission Error", err);
                formMessage.innerText = "Network severed. Ensure the backend host is broadcasting.";
                formMessage.className = "error-text";
                formMessage.style.display = 'block';
            } finally {
                btn.innerText = originalBtnText;
                btn.disabled = false;
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 6000); // 6s buffer for narrative feel
            }
        });
    }
});
