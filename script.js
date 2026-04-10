// Inisialisasi AOS
AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 2rem';
        navbar.style.background = 'rgba(10,10,30,0.98)';
    } else {
        navbar.style.padding = '0.8rem 2rem';
        navbar.style.background = 'rgba(10,10,30,0.95)';
    }
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Network Engineer', 'Robotics Enthusiast', 'Security Analyst', 'Linux Administrator'];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length && typedTextSpan) setTimeout(type, 500);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        window.location.href = `mailto:alexanderjeremia26092008@gmail.com?subject=Pesan dari ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0A---%0ADari: ${encodeURIComponent(email)}`;
        alert('Aplikasi email akan terbuka. Silakan kirim pesan Anda.');
        contactForm.reset();
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
    }
});

// Reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-category, .workflow-card, .learning-card, .contact-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) loader.style.display = 'none';
    }, 3000);
});

// Efek hover untuk tombol
const allButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-link');
allButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========== ANIMASI JARINGAN INTERAKTIF ==========
// - Tetap bergerak sendiri ketika kursor tidak diarahkan
// - Bereaksi mengikuti kursor ketika diarahkan (titik menjauh, garis menyesuaikan)

class InteractiveNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.mouseX = null;
        this.mouseY = null;
        this.animationId = null;
        this.isActive = true;

        // Warna jaringan (biru, ungu, putih, tosca)
        this.colors = ['#4ecdc4', '#6c5ce7', '#a855f7', '#ffffff', '#00b4d8', '#7b2eda', '#38bdf8', '#c084fc', '#2dd4bf'];

        // Kecepatan gerakan alami
        this.naturalSpeed = 0.5;

        this.init();
    }

    init() {
        this.resize();
        this.createPoints();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.createPoints();
    }

    createPoints() {
        this.points = [];
        // 50 titik jaringan untuk animasi yang lebih hidup
        const pointCount = 50;

        for (let i = 0; i < pointCount; i++) {
            this.points.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * this.naturalSpeed,
                vy: (Math.random() - 0.5) * this.naturalSpeed,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                radius: 3 + Math.random() * 5,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
                // Posisi target untuk gerakan alami
                targetX: Math.random() * this.width,
                targetY: Math.random() * this.height,
                targetChangeTimer: Math.random() * 200
            });
        }
    }

    setupEventListeners() {
        // Event mouse untuk interaksi
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            this.mouseX = (e.clientX - rect.left) * scaleX;
            this.mouseY = (e.clientY - rect.top) * scaleY;
            this.canvas.style.cursor = 'crosshair';
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = null;
            this.mouseY = null;
            this.canvas.style.cursor = 'crosshair';
        });

        // Touch events untuk mobile
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            this.mouseX = (touch.clientX - rect.left) * scaleX;
            this.mouseY = (touch.clientY - rect.top) * scaleY;
        });

        this.canvas.addEventListener('touchend', () => {
            this.mouseX = null;
            this.mouseY = null;
        });

        // Resize handler
        window.addEventListener('resize', () => {
            setTimeout(() => this.resize(), 100);
        });
    }

    updatePoints() {
        for (let point of this.points) {
            // ===== GERAKAN ALAMI (tanpa interaksi mouse) =====
            // Update target posisi secara berkala
            point.targetChangeTimer++;
            if (point.targetChangeTimer > 150) {
                point.targetX = Math.max(20, Math.min(this.width - 20, point.targetX + (Math.random() - 0.5) * 100));
                point.targetY = Math.max(20, Math.min(this.height - 20, point.targetY + (Math.random() - 0.5) * 100));
                point.targetChangeTimer = 0;
            }

            // Gaya menuju target (gerakan alami)
            let naturalForceX = (point.targetX - point.x) * 0.005;
            let naturalForceY = (point.targetY - point.y) * 0.005;

            // ===== INTERAKSI DENGAN MOUSE (jika ada) =====
            let mouseForceX = 0;
            let mouseForceY = 0;

            if (this.mouseX !== null && this.mouseY !== null) {
                const dx = point.x - this.mouseX;
                const dy = point.y - this.mouseY;
                const dist = Math.hypot(dx, dy);
                // Titik menjauh dari kursor (efek tolak)
                if (dist < 130) {
                    const angle = Math.atan2(dy, dx);
                    const force = (130 - dist) / 130 * 3;
                    mouseForceX = Math.cos(angle) * force;
                    mouseForceY = Math.sin(angle) * force;
                }
            }

            // Gabungkan semua gaya
            point.vx += naturalForceX + mouseForceX * 0.15;
            point.vy += naturalForceY + mouseForceY * 0.15;

            // Damping (perlambatan)
            point.vx *= 0.98;
            point.vy *= 0.98;

            // Batasi kecepatan maksimal
            const maxSpeed = 2;
            point.vx = Math.min(maxSpeed, Math.max(-maxSpeed, point.vx));
            point.vy = Math.min(maxSpeed, Math.max(-maxSpeed, point.vy));

            // Update posisi
            point.x += point.vx;
            point.y += point.vy;

            // Soft boundary - titik tidak keluar dari canvas
            point.x = Math.max(15, Math.min(this.width - 15, point.x));
            point.y = Math.max(15, Math.min(this.height - 15, point.y));

            // Update pulse
            point.pulse += point.pulseSpeed;
        }
    }

    draw() {
        if (!this.ctx) return;

        // Clear canvas dengan transparan
        this.ctx.clearRect(0, 0, this.width, this.height);

        // ===== DRAW GARIS PENGHUBUNG (KABEL) =====
        // Sort points by x position for better performance
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                const dx = this.points[i].x - this.points[j].x;
                const dy = this.points[i].y - this.points[j].y;
                const distance = Math.hypot(dx, dy);

                // Koneksi hingga jarak 180px
                if (distance < 180) {
                    // Opacity berdasarkan jarak
                    const opacity = (1 - distance / 180) * 0.5;

                    // Gradient warna untuk garis
                    const gradient = this.ctx.createLinearGradient(
                        this.points[i].x, this.points[i].y,
                        this.points[j].x, this.points[j].y
                    );
                    gradient.addColorStop(0, this.points[i].color);
                    gradient.addColorStop(1, this.points[j].color);

                    this.ctx.beginPath();
                    this.ctx.moveTo(this.points[i].x, this.points[i].y);
                    this.ctx.lineTo(this.points[j].x, this.points[j].y);
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.globalAlpha = opacity;
                    this.ctx.stroke();
                }
            }
        }

        // ===== DRAW TITIK-TITIK/NODE =====
        for (let point of this.points) {
            const pulseScale = 1 + Math.sin(point.pulse) * 0.25;
            const radius = point.radius * pulseScale;

            // Shadow glow
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = point.color;

            // Lingkaran luar (glow)
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, radius + 3, 0, Math.PI * 2);
            this.ctx.fillStyle = point.color + '20';
            this.ctx.fill();

            // Lingkaran utama
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = point.color;
            this.ctx.fill();

            // Reset shadow
            this.ctx.shadowBlur = 0;

            // Titik putih di tengah
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, radius * 0.35, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
        }

        // ===== EFEK INTERAKSI MOUSE =====
        if (this.mouseX !== null && this.mouseY !== null) {
            this.ctx.globalAlpha = 0.8;

            // Lingkaran radar luar
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 45, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#4ecdc4';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Lingkaran radar tengah
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 25, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#a855f7';
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            // Lingkaran radar dalam
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 10, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            // Efek partikel berputar di sekitar kursor
            const time = Date.now() / 200;
            for (let i = 0; i < 12; i++) {
                const angle = time + i * Math.PI * 2 / 12;
                const px = this.mouseX + Math.cos(angle) * 30;
                const py = this.mouseY + Math.sin(angle) * 30;
                this.ctx.beginPath();
                this.ctx.arc(px, py, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fill();
            }

            // Efek sinar dari kursor
            for (let i = 0; i < 8; i++) {
                const angle = time * 2 + i * Math.PI * 2 / 8;
                const px = this.mouseX + Math.cos(angle) * 55;
                const py = this.mouseY + Math.sin(angle) * 55;
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouseX, this.mouseY);
                this.ctx.lineTo(px, py);
                this.ctx.strokeStyle = `rgba(78, 205, 196, ${0.3 + Math.sin(time + i) * 0.2})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }

            this.ctx.globalAlpha = 1;
        }

        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
    }

    animate() {
        if (!this.isActive) return;
        this.updatePoints();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Inisialisasi animasi jaringan
let networkAnimation = null;

function initNetworkAnimation() {
    const canvas = document.getElementById('networkCanvas');
    if (canvas && !networkAnimation) {
        networkAnimation = new InteractiveNetwork('networkCanvas');
    } else if (networkAnimation) {
        networkAnimation.resize();
    }
}

// Jalankan saat halaman dimuat
window.addEventListener('load', () => {
    setTimeout(initNetworkAnimation, 500);
});

// Re-initialize saat resize
window.addEventListener('resize', () => {
    if (networkAnimation) {
        setTimeout(() => networkAnimation.resize(), 100);
    }
});

// Observer untuk memastikan canvas aktif saat terlihat
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!networkAnimation) {
                initNetworkAnimation();
            } else {
                networkAnimation.isActive = true;
                if (!networkAnimation.animationId) {
                    networkAnimation.animate();
                }
            }
        } else {
            if (networkAnimation) {
                networkAnimation.isActive = false;
                if (networkAnimation.animationId) {
                    cancelAnimationFrame(networkAnimation.animationId);
                    networkAnimation.animationId = null;
                }
            }
        }
    });
}, { threshold: 0.1 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}