document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA PRELOADER 0-100% ---
    const preloader = document.querySelector('.preloader');
    const progressText = document.querySelector('.progress-percentage');
    const progressBar = document.querySelector('.progress');
    const mainContent = document.querySelector('.main-content');
    let progress = 0;

    const updateProgress = () => {
        progress++;
        progressText.textContent = `${progress}%`;
        progressBar.style.width = `${progress}%`;
        if (progress < 100) {
            setTimeout(updateProgress, 25);
        } else {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    preloader.style.display = 'none';
                    mainContent.classList.add('visible');
                    initAllScripts();
                }
            });
        }
    };
    updateProgress();
    
    // --- FUNGSI UTAMA UNTUK MENJALANKAN SEMUA SKRIP SETELAH LOADING ---
    const initAllScripts = () => {
        gsap.registerPlugin(ScrollTrigger);

        // --- Inisialisasi Typed.js ---
        const typed = new Typed('#typed-text', {
            strings: ['Network Engineer', 'Network Technician', 'Field Engineer'],
            typeSpeed: 75,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });

        // --- LOGIKA NAVIGASI DENGAN GARIS BAWAH AKTIF ---
        const sections = document.querySelectorAll('.main-section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onToggle: self => {
                    if (self.isActive) {
                        const sectionId = section.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.dataset.section === sectionId) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        });

        // --- ANIMASI TEKS PEMBUKA (HERO) ---
        const heroTimeline = gsap.timeline({delay: 0.5});
        heroTimeline
            .from('.hero-content .intro', { autoAlpha: 0, y: 20, duration: 0.8 })
            .from('.hero-content .name', { autoAlpha: 0, y: 20, duration: 0.8 }, '-=0.6')
            .from('.hero-content .subtitle', { autoAlpha: 0, y: 20, duration: 0.8 }, '-=0.6')
            .from('.hero-content .description', { autoAlpha: 0, y: 20, duration: 0.8 }, '-=0.6')
            .from('.cta-button', { autoAlpha: 0, y: 20, duration: 0.8 }, '-=0.6');


        // --- ANIMASI UNTUK TEKS (PER KARAKTER) ---
        document.querySelectorAll('.anim-heading, .anim-text').forEach(elem => {
            const split = new SplitType(elem, { types: 'words, chars' });
            gsap.from(split.chars, {
                scrollTrigger: { trigger: elem, start: 'top 85%', toggleActions: 'play none none none' },
                autoAlpha: 0, y: 20, stagger: 0.02, duration: 0.5, ease: 'power2.out'
            });
        });
        
        // --- ANIMASI UNTUK ELEMEN YANG MUNCUL DARI BAWAH ---
        gsap.utils.toArray('.anim-up').forEach(elem => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });

        // --- EFEK PARALLAX PADA BACKGROUND BAGIAN "ABOUT" ---
        const aboutSection = document.querySelector('#about');
        const aboutBg = document.querySelector('.about-background');

        aboutSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = aboutSection;
            
            const moveX = ((clientX / offsetWidth) - 0.5) * 30;
            const moveY = ((clientY / offsetHeight) - 0.5) * 30;

            gsap.to(aboutBg, { x: -moveX, y: -moveY, duration: 0.5, ease: 'power2.out' });
        });

        aboutSection.addEventListener('mouseleave', () => {
            gsap.to(aboutBg, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
        });
        
        // --- LOGIKA UNTUK TABS DI BAGIAN PORTFOLIO (KODE BARU) ---
        const tabs = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;

                // Hapus kelas 'active' dari semua tombol dan konten
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(tc => tc.classList.remove('active'));

                // Tambah kelas 'active' ke tombol dan konten yang diklik
                tab.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // --- LOGIKA NAVIGASI MOBILE (HAMBURGER) ---
        const hamburger = document.querySelector('.hamburger');
        const mobileNav = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links li a');

        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('nav-active')) {
                    mobileNav.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
            });
        });

        // --- KONFIGURASI LATAR BELAKANG PARTIKEL (TSPARTICLES) ---
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                },
                modes: {
                    grab: { distance: 150, links: { opacity: 1 } },
                    push: { quantity: 4 },
                },
            },
            particles: {
                color: { value: "#64FFDA" },
                links: { color: "#64FFDA", distance: 150, enable: true, opacity: 0.4, width: 1 },
                move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
                number: { density: { enable: true }, value: 80 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
            background: { color: "#0A192F" }
        });
    };
});