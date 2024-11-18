// Progress Bar
function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// Navigation Active State
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

// Enhanced Scroll Animations
function setupEnhancedScrollAnimations() {
    const animationOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Staggered animation for child elements
                const children = entry.target.querySelectorAll('[data-stagger]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('aos-animate');
                    }, index * 100);
                });
            }
        });
    }, animationOptions);

    // Observe elements with animations
    document.querySelectorAll('[data-aos]').forEach(element => {
        animationObserver.observe(element);
    });
}

// Parallax Effect
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax');
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-card .progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Cursor Effect
function setupCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// Type Writer Effect
function setupTypeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Image Loading Animation
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        wrapper.style.position = 'relative';
        
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(loadingOverlay);
        
        img.addEventListener('load', () => {
            loadingOverlay.style.display = 'none';
        });
    });
}

// Download CV
function setupDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para descargar el CV
        alert('Descargando CV...');
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Setup functions
    setupMobileMenu();
    setupEnhancedScrollAnimations();
    setupParallax();
    setupSmoothScroll();
    setupCursorEffect();
    setupImageLoading();
    setupDownloadCV();
    
    // Initial animations
    animateSkills();
    
    // Initialize typewriter for hero subtitle
    const subtitleElement = document.querySelector('.hero .subtitle');
    if (subtitleElement) {
        setupTypeWriter(subtitleElement, subtitleElement.textContent);
    }
    
    // Initial updates
    updateActiveNavLink();
    updateProgressBar();
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        updateProgressBar();
        updateActiveNavLink();
    });
    
    // Resize event listener
    window.addEventListener('resize', () => {
        updateProgressBar();
    });
});

// Intersection Observer for skill animations
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Theme Switcher
function setupThemeSwitcher() {
    const themeBtn = document.getElementById('themeSwitcher');
    const icon = themeBtn.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Show toast notification
        showToast('Tema cambiado exitosamente', 'success');
    });
}

// Footer Functions
function setupFooter() {
    // Update current year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll for footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Social media links interaction
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotate(360deg)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Add to translations object
const footerTranslations = {
    es: {
        footer: {
            about: {
                title: "Sobre Mí",
                description: "Profesional en Ciberseguridad y Desarrollador Full Stack con experiencia en implementación de soluciones seguras y desarrollo de aplicaciones."
            },
            links: {
                title: "Enlaces Rápidos",
                experience: "Experiencia",
                projects: "Proyectos",
                skills: "Habilidades",
                contact: "Contacto"
            },
            contact: {
                title: "Contacto"
            },
            social: {
                title: "Redes Sociales"
            },
            copyright: "Francisco Lopez. Todos los derechos reservados.",
            privacy: "Privacidad",
            terms: "Términos"
        }
    },
    en: {
        footer: {
            about: {
                title: "About Me",
                description: "Cybersecurity Professional and Full Stack Developer with experience in implementing secure solutions and application development."
            },
            links: {
                title: "Quick Links",
                experience: "Experience",
                projects: "Projects",
                skills: "Skills",
                contact: "Contact"
            },
            contact: {
                title: "Contact"
            },
            social: {
                title: "Social Media"
            },
            copyright: "Francisco Lopez. All rights reserved.",
            privacy: "Privacy",
            terms: "Terms"
        }
    }
};

// Initialize footer
document.addEventListener('DOMContentLoaded', () => {
    setupFooter();
});



// Language Switcher
function setupLanguageSwitcher() {
    const langBtn = document.getElementById('languageSwitcher');
    const currentLang = langBtn.querySelector('.current-lang');
    
    langBtn.addEventListener('click', () => {
        const newLang = currentLang.textContent === 'ES' ? 'EN' : 'ES';
        currentLang.textContent = newLang;
        
        // Aquí puedes agregar la lógica para cambiar el idioma
        // Por ejemplo, cargar traducciones desde un archivo JSON
        
        showToast('Idioma cambiado a ' + (newLang === 'ES' ? 'Español' : 'English'), 'info');
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Modal
function setupModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const modalContent = document.getElementById('modalContent');
    
    // Add click event to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-links')) {
                const content = card.querySelector('.project-content').cloneNode(true);
                modalContent.innerHTML = '';
                modalContent.appendChild(content);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                         type === 'error' ? 'exclamation-circle' : 
                         'info-circle'}"></i>
        ${message}
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Loading Spinner
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// Print CV
function setupPrintCV() {
    const printBtn = document.getElementById('downloadCV');
    
    printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
    });
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    setupThemeSwitcher();
    setupLanguageSwitcher();
    setupBackToTop();
    setupModal();
    setupPrintCV();
});