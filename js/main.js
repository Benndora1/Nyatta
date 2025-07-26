// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .stats').forEach(el => {
    observer.observe(el);
});

// Form validation (for contact forms)
const validateForm = (form) => {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
};

// Lazy Loading Implementation
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

// Observe all lazy loading images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Image Error Handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'images/placeholder.jpg'; // Fallback image
        this.alt = 'Image not available';
    });
});

// Progressive Image Loading
const loadHighResImages = () => {
    const images = document.querySelectorAll('img[data-src-high]');
    
    images.forEach(img => {
        if (img.complete) {
            const highResSrc = img.dataset.srcHigh;
            const highResImg = new Image();
            
            highResImg.onload = () => {
                img.src = highResSrc;
                img.classList.add('high-res-loaded');
            };
            
            highResImg.src = highResSrc;
        }
    });
};

// Load high-res images after page load
window.addEventListener('load', loadHighResImages);

// Add form validation styles
const style = document.createElement('style');
style.textContent = `
    .form-field.error {
        border-color: #e53e3e !important;
    }
`;
document.head.appendChild(style);