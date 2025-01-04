document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scroll({
                top: targetSection.offsetTop - 50, // Adjusts for header height
                behavior: 'smooth'
            });
        });
    });

    // Sticky navigation bar on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('sticky'); // Adds the 'sticky' class when scrolled past 50px
        } else {
            header.classList.remove('sticky');
        }
    });

    // Responsive navigation bar toggle (for mobile view)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Hero section animation on load
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('load', () => {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)'; // Moves content up smoothly
        }, 500); // Delays animation by 500ms for smoother effect
    });

    // Feature card hover animation
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'scale(1.05)'; // Scales the feature card slightly
            feature.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out'; // Smooth animation
            feature.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.2)'; // Adds shadow for depth
        });

        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'scale(1)'; // Resets the scale
            feature.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)'; // Resets the shadow
        });
    });
});
