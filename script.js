// Click anywhere to create floating hearts
document.addEventListener('click', function(e) {
    createFloatingHeart(e.clientX, e.clientY);
});

// Create floating heart animation
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    // Random horizontal movement
    const randomX = (Math.random() - 0.5) * 100;
    heart.style.setProperty('--random-x', randomX + 'px');
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Love button surprise
const yesButtons = document.querySelectorAll('.yes-button');
yesButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Create confetti explosion
        createConfetti();
        
        // Create multiple hearts from button
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const rect = button.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                createFloatingHeart(x + (Math.random() - 0.5) * 150, y + (Math.random() - 0.5) * 150);
            }, i * 50);
        }
        
        // Add pulse animation
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = 'pulse 0.5s ease';
        }, 10);
    });
});

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#c77dff', '#ff8fab', '#ffffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Memory cards click effect
const memoryCards = document.querySelectorAll('.memory-card');
memoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Only create the circular ripple for cards outside the memories-section
        if (!card.closest('.memories-section')) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Always create hearts on click (keep the heart animation)
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart(e.clientX, e.clientY);
            }, i * 100);
        }
    });
});

// Soul title click effect - create hearts from title
const soulTitle = document.querySelector('.soul-title');
if (soulTitle) {
    soulTitle.style.cursor = 'pointer';
    soulTitle.addEventListener('click', function(e) {
        const rect = soulTitle.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const randomX = rect.left + Math.random() * rect.width;
                const randomY = rect.top + Math.random() * rect.height;
                createFloatingHeart(randomX, randomY);
            }, i * 80);
        }
    });
}

// Childhood photos click effect - create hearts from images
const childhoodPhotos = document.querySelectorAll('.childhood-photo');
childhoodPhotos.forEach(photo => {
    photo.style.cursor = 'pointer';
    photo.addEventListener('click', function(e) {
        const rect = photo.getBoundingClientRect();
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const randomX = rect.left + Math.random() * rect.width;
                const randomY = rect.top + Math.random() * rect.height;
                createFloatingHeart(randomX, randomY);
            }, i * 100);
        }
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Timeline items hover effect enhancement
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const content = this.querySelector('.timeline-content');
        content.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        const content = this.querySelector('.timeline-content');
        content.style.transform = 'translateY(0) scale(1)';
    });
    
    item.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        createFloatingHeart(e.clientX, e.clientY);
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Heart in hero section - click to create explosion
const heroHeart = document.querySelector('.heart');
if (heroHeart) {
    heroHeart.addEventListener('click', function(e) {
        e.stopPropagation();
        const rect = heroHeart.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create heart explosion
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const angle = (i / 30) * Math.PI * 2;
                const distance = 100;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                createFloatingHeart(x, y);
            }, i * 30);
        }
        
        createConfetti();
    });
}

// Add sparkle effect on hover for buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const rect = button.getBoundingClientRect();
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                createFloatingHeart(x, y);
            }, i * 100);
        }
    });
});

// Smooth scroll for better UX
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

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Easter egg: Konami code or special key combination
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Special surprise!
        createConfetti();
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 50);
        }
        alert('🎉 You found the secret! I love you! 💕');
        konamiCode = [];
    }
});
