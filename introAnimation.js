document.addEventListener('DOMContentLoaded', () => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.style.transition = 'opacity 0.6s ease-out, transform 0.5s ease-out';
                section.style.opacity = 1;
                // Store initial translateY offset for fade-in
                section.dataset.initialTranslateY = 20;
                observer.unobserve(section);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.opacity = 0;
            section.style.transform = 'translateY(0px)';
            section.style.transition = 'transform 0.5s ease-out';
            observer.observe(section);
        }
    });

    // Parallax effect on scroll for all sections
    window.addEventListener('scroll', () => {
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const speed = 0.3; // parallax speed factor
                const offset = window.pageYOffset;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (offset + window.innerHeight > sectionTop && offset < sectionTop + sectionHeight) {
                    const yPos = (offset - sectionTop) * speed;
                    const initialY = parseFloat(section.dataset.initialTranslateY) || 0;
                    const totalY = initialY - yPos;
                    section.style.transform = `translateY(${totalY}px)`;
                }
            }
        });
    });
});
