// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const skillItems = document.querySelectorAll('.skill-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const sections = document.querySelectorAll('section');

    // Typed text effect
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const roles = ['Software Developer', 'Machine Learning Engineer', 'Data Scientist', 'Problem Solver'];
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typeDelay = 200;

        function typeEffect() {
            const currentRole = roles[currentRoleIndex];

            if (isDeleting) {
                // Deleting text
                typedText.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typeDelay = 100;
            } else {
                // Typing text
                typedText.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typeDelay = 200;
            }

            // Handle end of current role
            if (!isDeleting && currentCharIndex === currentRole.length) {
                isDeleting = true;
                typeDelay = 1000; // Pause at end of role
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typeDelay = 500; // Pause before new role
            }

            setTimeout(typeEffect, typeDelay);
        }

        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Prevent scrolling when menu is open
        document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
    });

    // Close mobile menu when clicking a nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class for style change
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }

        lastScrollTop = scrollTop;
    });

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Header height
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link based on scroll position
    function setActiveNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animation on scroll for skill progress bars
    function animateSkills() {
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress-bar');
            const percentage = progressBar.style.width;
            progressBar.style.width = '0';

            setTimeout(() => {
                progressBar.style.width = percentage;
            }, 200);
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('skills')) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Form validation (basic)
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }

            // Send email using EmailJS
            emailjs.sendForm('service_9psadrs', 'template_mpq1usc', this)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully! Thank you for your message.');
                    contactForm.reset(); // Reset form after successful submission
                }, (error) => {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again.');
                });
        });
    }
});
