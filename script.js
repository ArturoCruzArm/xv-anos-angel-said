// ===================================
// MÚSICA DE FONDO
// ===================================
function initMusic() {
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    if (!music || !musicToggle || !musicIcon) {
        return;
    }

    let isPlaying = false;
    let hasInteracted = false;

    // Función para intentar reproducir música
    function startMusic() {
        if (!hasInteracted) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicIcon.className = 'fas fa-volume-up';
                    hasInteracted = true;
                }).catch(() => {
                    isPlaying = false;
                    musicIcon.className = 'fas fa-volume-mute';
                });
            }
        }
    }

    // Intentar reproducir después de cualquier interacción
    const events = ['click', 'touchstart', 'scroll'];
    events.forEach(event => {
        document.addEventListener(event, startMusic, { once: true });
    });

    // Toggle música
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        hasInteracted = true;

        if (isPlaying) {
            music.pause();
            musicIcon.className = 'fas fa-volume-mute';
            isPlaying = false;
        } else {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicIcon.className = 'fas fa-volume-up';
                    isPlaying = true;
                }).catch(() => {
                    console.log('No se pudo reproducir la música');
                });
            }
        }
    });

    // Intentar reproducir al cargar
    setTimeout(startMusic, 500);
}

// ===================================
// CUENTA REGRESIVA
// ===================================
function initCountdown() {
    // Fecha: 12 de septiembre de 2026, 14:00 hrs (2:00 PM)
    const eventDate = new Date('2026-09-12T14:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div style="text-align: center; font-size: 2rem; color: var(--dorado); font-family: var(--font-titulo);">¡Es hoy! 🎉</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// ANIMACIONES AL SCROLL
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Observar tarjetas de eventos
    document.querySelectorAll('.event-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===================================
// SCROLL INDICATOR
// ===================================
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#parents');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c👑 XV Años - Angel Said 👑', 'font-size: 20px; color: #f6ad55; font-weight: bold;');

    initMusic();
    initCountdown();
    initSmoothScroll();
    initScrollAnimations();
    initScrollIndicator();
});
