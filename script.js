const themeToggleBtn = document.getElementById('theme-toggle');
const langTrBtn = document.getElementById('lang-tr');
const langEnBtn = document.getElementById('lang-en');
const html = document.documentElement;
const canvas = document.getElementById('code-background');
const ctx = canvas.getContext('2d');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

const translations = {
    tr: {
        nav_about: "Hakkımda",
        nav_experience: "Projeler",
        nav_skills: "Yetenekler",
        nav_contact: "İletişim",
        hero_greeting: "Merhaba",
        hero_subtitle: "Web Geliştirici",
        hero_desc: "Modern, duyarlı ve akıcı ara yüzler tasarlıyorum. Kod altyapısını güvenli ve optimize edilmiş şekilde kuruyorum. İsteğinize göre yönetici paneli, veri tabanı entegrasyonu ve Google SEO optimizasyonu dahil tüm süreçleri tamamlayarak sitelerinizi teslim ediyorum. Hazır şablon kullanmıyorum.",
        hero_motto: "Her projeyi kendi işimmiş gibi düşünerek yaparım.",
        hero_cta: "Mail Gönder",
        projects_title: "Projelerim",
        skills_title: "Teknik Yetenekler",
        contact_title: "İletişim",
        contact_desc: "Projeleriniz veya sorularınız için bana ulaşabilirsiniz.",
        form_name: "Adınız",
        form_email: "E-posta",
        form_message: "Mesajınız",
        form_submit: "Gönder",
        // Proje çevirileri
        project_overline: "Öne Çıkan Proje",
        project1_title: "Kendisibir Mekan",
        project1_desc: "Kendisibir Mekan, Üsküdar'da bulunan kitap-kafe-atölye konseptli bir işletme için geliştirilmiş modern ve responsive bir web sitesidir. Dinamik menü yönetimi, etkinlik duyuruları ve görsel galeri gibi özellikler içerir.",
        project2_title: "Crypto Scan - Kripto Para Analiz Paneli",
        project2_desc: "RSI ve Stochastic göstergeleri ile 20+ kripto parayı anlık izleyen, sinyal analizi sunan modern trading dashboard'u.",
        project3_title: "Simple CV Maker",
        project3_desc: "Kullanıcıların kişisel bilgilerini girerek anlık önizleme ile modern ve şık özgeçmişler oluşturmasını sağlayan web aracı. PDF çıktı alma ve dinamik içerik yönetimi.",
        admin_panel_title: "Yönetici Paneli",
        admin_panel_desc: "Ürün ve Kategori: Menüdeki ürünleri ekleyebilir, fiyatları güncelleyebilir veya stokta olmayanları pasif hale getirebilirsiniz. Etkinlik Yönetimi: Atölye ve söyleşileri ekleyebilir; tarihi yaklaşanların ana sayfada otomatik banner olarak görünmesini sağlayabilirsiniz. İçerik ve Galeri: Sitedeki başlıkları, iletişim bilgilerini ve galeri fotoğraflarını kolayca düzenleyebilirsiniz. Güvenli Erişim: Panele sadece yetkili e-posta ve şifre ile giriş yapılabilir.",
        scroll_hint: "Devamı için kaydır",
        form_success: "Mesajınız başarıyla gönderildi!",
        footer_text: "Tasarım & Geliştirme: Kaan Can Güner"
    },
    en: {
        nav_about: "About",
        nav_experience: "Projects",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_greeting: "Hi there",
        hero_subtitle: "Web Developer",
        hero_desc: "I design modern, responsive, and fluid UI. I build secure and optimized code infrastructure. I deliver your websites by completing all processes, including the admin panel, database integration, and Google SEO optimization, according to your requirements. I do not use ready-made templates.",
        hero_motto: "Treat every project as if it were my own.",
        hero_cta: "Send Mail",
        projects_title: "My Projects",
        skills_title: "Technical Skills",
        contact_title: "Contact",
        contact_desc: "Feel free to reach out for projects or questions.",
        form_name: "Name",
        form_email: "Email",
        form_message: "Message",
        form_submit: "Send",
        // Project translations
        project_overline: "Featured Project",
        project1_title: "Kendisibir Mekan",
        project1_desc: "Kendisibir Mekan is a modern and responsive website developed for a book-cafe-workshop concept business located in Üsküdar, Istanbul. It includes features such as dynamic menu management, event announcements, and a visual gallery.",
        project2_title: "Crypto Scan - Cryptocurrency Analysis Dashboard",
        project2_desc: "A modern trading dashboard that monitors 20+ cryptocurrencies in real-time with RSI and Stochastic indicators, providing signal analysis.",
        project3_title: "Simple CV Maker",
        project3_desc: "A web tool that allows users to create modern and stylish resumes with real-time preview. Features PDF export and dynamic content management.",
        admin_panel_title: "Admin Panel",
        admin_panel_desc: "Product and Category: You can add menu items, update prices, or set out-of-stock items to passive status. Event Management: You can add workshops or talks; upcoming events are automatically displayed as banners on the homepage. Content and Gallery: You can easily edit site headings, contact information, and gallery photos. Secure Access: The panel is accessible only with authorized email and password credentials.",
        scroll_hint: "Scroll for more",
        form_success: "Your message has been sent successfully!",
        footer_text: "Designed & Built by Kaan Can Güner"
    }
};

let cachedThemeColors = null;
let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000 };

const config = {
    particleCount: 85,
    connectionDistance: 140,
    connectionDistanceSq: 140 * 140,
    baseRadius: 2,
    speed: 0.07,
    depth: 400
};

function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 100, g: 255, b: 218 };
}

function updateThemeColors() {
    const style = getComputedStyle(document.body);
    const isLight = html.getAttribute('data-theme') === 'light';
    const accent = style.getPropertyValue('--accent-color').trim() || (isLight ? '#0056b3' : '#64ffda');

    cachedThemeColors = {
        bg: style.getPropertyValue('--bg-color').trim() || (isLight ? '#c2c1c0' : '#0a192f'),
        accent: accent,
        accentRgb: hexToRgb(accent)
    };
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);

    const icon = themeToggleBtn.querySelector('i');
    if (newTheme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    setTimeout(updateThemeColors, 10);
});

function setLanguage(lang) {
    const texts = translations[lang];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (texts[key]) el.textContent = texts[key];
    });

    if (lang === 'tr') {
        langTrBtn.classList.add('active-lang');
        langEnBtn.classList.remove('active-lang');
        html.lang = 'tr';
    } else {
        langEnBtn.classList.add('active-lang');
        langTrBtn.classList.remove('active-lang');
        html.lang = 'en';
    }
}

langTrBtn.addEventListener('click', () => setLanguage('tr'));
langEnBtn.addEventListener('click', () => setLanguage('en'));

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle3D {
    constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * config.depth;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * config.depth;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * config.speed + 0.05;
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;

        this.baseSize = Math.random() * 1.5 + 1;
        this.oscillation = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        const parallaxFactor = (config.depth - this.z) / config.depth * 0.02;
        const dx = (width / 2 - mouse.x) * parallaxFactor;
        const dy = (height / 2 - mouse.y) * parallaxFactor;

        this.x += dx * 0.5;
        this.y += dy * 0.5;

        this.oscillation += 0.05;

        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
    }

    draw() {
        const depthRatio = 1 - (this.z / config.depth);
        const scale = depthRatio * 1.5 + 0.5;
        const size = this.baseSize * scale + Math.sin(this.oscillation) * 0.5;
        const alpha = depthRatio * 0.7 + 0.1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, size), 0, Math.PI * 2);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = cachedThemeColors.accent;

        if (depthRatio > 0.6) {
            ctx.shadowBlur = 10 * scale;
            ctx.shadowColor = cachedThemeColors.accent;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    updateThemeColors();

    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle3D());
    }
}

function animate() {
    if (!cachedThemeColors) updateThemeColors();

    ctx.fillStyle = cachedThemeColors.bg;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;

            // Optimization: Use squared distance check
            const distSq = dx * dx + dy * dy;

            if (distSq < config.connectionDistanceSq) {
                const zDist = Math.abs(p1.z - p2.z);
                if (zDist < 200) {
                    const dist = Math.sqrt(distSq);
                    const opacity = (1 - dist / config.connectionDistance) * 0.25;

                    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    const rgb = cachedThemeColors.accentRgb;
                    const colorStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

                    gradient.addColorStop(0, colorStr);
                    gradient.addColorStop(1, colorStr);

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    if (mouse.x > 0 && mouse.y > 0) {
        // Optimization: Pre-calculate mouse interaction range squared (150 * 150 = 22500)
        const mouseDistSqLimit = 22500;

        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < mouseDistSqLimit) {
                const dist = Math.sqrt(distSq);
                const opacity = (1 - dist / 150) * 0.4;
                const rgb = cachedThemeColors.accentRgb;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();

                p.vx += dx * 0.0003;
                p.vy += dy * 0.0003;
            }
        });
    }

    requestAnimationFrame(animate);
}

initCanvas();
window.addEventListener('resize', initCanvas);
animate();

// --- Modal Functionality ---
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const sliderTrack = document.getElementById('slider-track');
const sliderDots = document.getElementById('slider-dots');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const modalTitle = document.getElementById('modal-title');
const modalTech = document.getElementById('modal-tech');
const modalDesc = document.getElementById('modal-desc');

let currentSlide = 0;
let currentImages = [];

// Project data with translations
const projectData = {
    1: {
        images: [
            'images/project1.webp',    // Ana Sayfa
            'images/project1-2.webp',  // Menü
            'images/project1-3.webp',  // Yorumlar
            'images/project1-4.webp',  // Galeri
            'images/project1-5.webp'   // Konum & İletişim
        ],
        adminImages: [
            'images/project1-admin1.webp',  // Dashboard
            'images/project1-admin2.webp',  // Ürün Yönetimi
            'images/project1-admin3.webp',  // Kategori Yönetimi
            'images/project1-admin4.webp',  // Galeri Yönetimi
            'images/project1-admin5.webp',  // Site İçerikleri
            'images/project1-admin6.webp'   // QR Menü
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'Node.js', 'Netlify'],
        title: {
            tr: 'Kendisibir Mekan',
            en: 'Kendisibir Mekan'
        },
        desc: {
            tr: '"Kendisibir Mekan" projesi; Üsküdar\'da yer alan bir kitap-kafe-atölye işletmesi için modern web teknolojileriyle geliştirilmiş, SEO uyumlu ve tam kapsamlı bir dijital dönüşüm çözümüdür. Vanilla JS, Supabase ve Netlify altyapısı kullanılarak inşa edilen platform, işletme sahibine kod bilgisi gerektirmeden ürünleri, fiyatları ve etkinlikleri anlık olarak güncelleyebileceği mobil uyumlu bir yönetim paneli sunarken; müşterilere ise hızlı, dinamik QR menülü ve cihaz bağımsız kusursuz bir kullanıcı deneyimi sağlamaktadır. Proje, özellikle otomatik görsel optimizasyonu (WebP), Schema.org yapısal veri işaretlemesi ve dinamik etkinlik banner sistemi gibi teknik detaylarla hem performans hem de Google görünürlüğü odaklı bir başarı sergilemektedir.',
            en: '"Kendisibir Mekan" is a comprehensive digital transformation project designed for a book-cafe-atelier concept in Üsküdar, featuring a modern, SEO-friendly web platform built with Vanilla JS, Supabase, and Netlify. The solution provides a mobile-responsive admin panel that allows business owners to manage products, prices, and events in real-time without any coding knowledge, while offering customers a seamless experience with a dynamic QR menu and high-speed performance. Distinguished by technical features such as automated WebP image optimization, Schema.org structured data, and a dynamic event banner system, the project focuses on maximizing both user engagement and search engine visibility.'
        }
    },
    2: {
        images: [
            'images/project2.webp',
            'images/project2-2.webp'
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Netlify'],
        title: {
            tr: 'Crypto Scan - Kripto Para Analiz Paneli',
            en: 'Crypto Scan - Cryptocurrency Analysis Dashboard'
        },
        desc: {
            tr: "Crypto Scan - Kripto Para Analiz Paneli, 20+ kripto para birimini anlık olarak izleyen profesyonel bir trading dashboard'udur. Kullanıcılar için RSI (Relative Strength Index) ve Stochastic göstergeleri ile teknik analiz sağlar. Panel, farklı zaman dilimlerinde (15dk, 1s, 4s, 1g) coin'lerin fiyat değişimlerini, teknik indikatörlerini ve alım/satım sinyallerini (Bullish/Bearish/Neutral) otomatik olarak hesaplar ve görselleştirir.",
            en: "Crypto Scan - Cryptocurrency Analysis Dashboard is a professional trading dashboard that monitors 20+ cryptocurrencies in real-time. It provides technical analysis for users with RSI (Relative Strength Index) and Stochastic indicators. The panel automatically calculates and visualizes price changes, technical indicators, and trading signals (Bullish/Bearish/Neutral) across different timeframes (15m, 1h, 4h, 1d)."
        }
    },
    3: {
        images: [
            'images/project3.jpg',
            'images/project3-2.jpg',
            'images/project3mobil.jpg',
            'images/project3mobil2.jpg'
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'html2pdf.js'],
        title: {
            tr: 'Simple CV Maker',
            en: 'Simple CV Maker'
        },
        desc: {
            tr: 'Simple CV Maker, kullanıcıların profesyonel özgeçmişlerini dakikalar içinde oluşturmasını sağlayan modern ve interaktif bir web uygulamasıdır. Split-screen (bölünmüş ekran) tasarımı sayesinde, sol tarafta formları doldururken sağ tarafta CV\'nin son halini anlık olarak (real-time) görebilirsiniz. Dinamik form yapısı ile istediğiniz kadar iş deneyimi veya eğitim bilgisi ekleyebilir, yeteneklerinizi etiket sistemiyle yönetebilirsiniz. Uygulama, oluşturulan CV\'yi yüksek kalitede PDF olarak indirme imkanı sunar ve tüm işlemleri tarayıcı üzerinde (client-side) gerçekleştirerek veri gizliliğine önem verir.',
            en: 'Simple CV Maker is a modern and interactive web application that allows users to create professional resumes in minutes. With its split-screen design, you can see the final version of your CV in real-time on the right while filling out the forms on the left. Its dynamic form structure lets you add as many work experiences or education details as needed, and manage your skills with a tagging system. The application offers high-quality PDF export and prioritizes data privacy by performing all operations client-side within the browser.'
        }
    }
};

// Get current language
function getCurrentLang() {
    return html.lang || 'tr';
}

// Update slider position
function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = currentImages.length - 1;
    if (currentSlide >= currentImages.length) currentSlide = 0;
    updateSlider();
}

// Open modal with project data
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const lang = getCurrentLang();
    currentSlide = 0;
    currentImages = project.images;

    // Populate slider
    sliderTrack.innerHTML = '';
    project.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.title[lang];
        sliderTrack.appendChild(img);
    });

    // Create dots
    sliderDots.innerHTML = '';
    project.images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    // Hide arrows if only one image
    const hasMultiple = project.images.length > 1;
    sliderPrev.style.display = hasMultiple ? 'flex' : 'none';
    sliderNext.style.display = hasMultiple ? 'flex' : 'none';
    sliderDots.style.display = hasMultiple ? 'flex' : 'none';

    modalTitle.textContent = project.title[lang];
    modalDesc.textContent = project.desc[lang];

    // Clear and populate tech list
    modalTech.innerHTML = '';
    project.tech.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        modalTech.appendChild(li);
    });

    // Populate admin gallery
    const adminGallery = document.getElementById('admin-gallery');
    const adminGalleryGrid = document.getElementById('admin-gallery-grid');

    if (project.adminImages && project.adminImages.length > 0) {
        adminGallery.classList.add('has-images');
        adminGalleryGrid.innerHTML = '';

        project.adminImages.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'admin-gallery-item';
            item.innerHTML = `<img src="${imgSrc}" alt="Admin Panel ${index + 1}">`;
            item.addEventListener('click', () => {
                // Open lightbox with admin images
                currentLightboxIndex = index;
                currentImages = project.adminImages;
                lightboxImg.src = imgSrc;
                lightboxPrev.style.display = project.adminImages.length > 1 ? 'flex' : 'none';
                lightboxNext.style.display = project.adminImages.length > 1 ? 'flex' : 'none';
                lightbox.classList.add('active');
            });
            adminGalleryGrid.appendChild(item);
        });
    } else {
        adminGallery.classList.remove('has-images');
        adminGalleryGrid.innerHTML = '';
    }

    updateSlider();
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Setup click events for slider images after they're created
    setTimeout(() => {
        setupSliderImageClicks();
        // Reset currentImages to main images for slider
        currentImages = project.images;
    }, 100);
}

// Close modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset scroll position and indicator
    const modalContentEl = document.querySelector('.modal-content');
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (modalContentEl) {
        modalContentEl.scrollTop = 0;
    }
    if (scrollIndicator) {
        scrollIndicator.classList.remove('hidden');
    }
}

// Scroll indicator functionality
const scrollIndicator = document.getElementById('scroll-indicator');
const modalContentEl = document.querySelector('.modal-content');

if (modalContentEl && scrollIndicator) {
    // Track scroll to hide indicator when at bottom
    modalContentEl.addEventListener('scroll', () => {
        const isAtBottom = modalContentEl.scrollHeight - modalContentEl.scrollTop <= modalContentEl.clientHeight + 100;
        scrollIndicator.classList.toggle('hidden', isAtBottom);
    });

    // Click to scroll to bottom
    scrollIndicator.addEventListener('click', () => {
        modalContentEl.scrollTo({
            top: modalContentEl.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// Slider navigation
if (sliderPrev) {
    sliderPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
}
if (sliderNext) {
    sliderNext.addEventListener('click', () => goToSlide(currentSlide + 1));
}

// --- Lightbox Functionality ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentLightboxIndex = 0;

// Update lightbox image
function updateLightboxImage() {
    if (currentImages.length > 0) {
        lightboxImg.src = currentImages[currentLightboxIndex];
    }
}

// Go to specific lightbox image
function goToLightboxImage(index) {
    currentLightboxIndex = index;
    if (currentLightboxIndex < 0) currentLightboxIndex = currentImages.length - 1;
    if (currentLightboxIndex >= currentImages.length) currentLightboxIndex = 0;
    updateLightboxImage();
}

// Open lightbox when clicking on slider image
function setupSliderImageClicks() {
    document.querySelectorAll('.slider-track img').forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            currentLightboxIndex = index;
            lightboxImg.src = img.src;

            // Show/hide nav buttons based on image count
            const hasMultiple = currentImages.length > 1;
            lightboxPrev.style.display = hasMultiple ? 'flex' : 'none';
            lightboxNext.style.display = hasMultiple ? 'flex' : 'none';

            lightbox.classList.add('active');
        });
    });
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        goToLightboxImage(currentLightboxIndex - 1);
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        goToLightboxImage(currentLightboxIndex + 1);
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            goToLightboxImage(currentLightboxIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToLightboxImage(currentLightboxIndex + 1);
        }
    }
});

// Event listeners for project detail buttons
document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        openModal(projectId);
    });
});

// Event listeners for project images (click on image to open modal)
document.querySelectorAll('.project-img-wrapper[data-project]').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const projectId = wrapper.getAttribute('data-project');
        openModal(projectId);
    });
});

// Close modal events
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// Update modal content when language changes
const originalSetLanguage = setLanguage;
setLanguage = function (lang) {
    originalSetLanguage(lang);

    // Update modal content if it's open
    if (projectModal && projectModal.classList.contains('active')) {
        const projectId = document.querySelector('.project-detail-btn.active')?.getAttribute('data-project');
        if (projectId) {
            const project = projectData[projectId];
            if (project) {
                modalTitle.textContent = project.title[lang];
                modalDesc.textContent = project.desc[lang];
            }
        }
    }
};

// --- Contact Form AJAX Handler ---
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = '...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success toast
                toast.classList.add('show');
                contactForm.reset();

                // Hide toast after 2.5 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2500);
            } else {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            alert('Bağlantı hatası. Lütfen tekrar deneyin.');
        }

        // Restore button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}
