/* ============================================
   OSAMA MOHAMED — PORTFOLIO JS (FINAL v5)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── inject styles first ── */
    const s = document.createElement('style');
    s.textContent = `
    /* PROGRESS BAR */
    #pb {
        position: fixed; top: 0; left: 0;
        height: 3px; width: 0%;
        background: linear-gradient(90deg,#ffeb00,#ff4d4d 55%,#a78bfa);
        z-index: 9999; pointer-events: none;
    }

    /* NAVBAR */
    .nav-shrunk { box-shadow: 0 3px 18px rgba(0,0,0,.09); }
    .nav-shrunk .nav-container { padding-top: 8px !important; padding-bottom: 8px !important; }
    .nav-active { color: #ff4d4d !important; }

    /* SCROLL REVEAL */
    .wa {
        opacity: 0;
        transition: opacity .7s cubic-bezier(.22,1,.36,1),
                    transform .7s cubic-bezier(.22,1,.36,1);
    }
    .wa.fb { transform: translateY(50px); }
    .wa.fl { transform: translateX(-50px); }
    .wa.pi { transform: scale(.88); }
    .wa.in { opacity: 1 !important; transform: none !important; }

    .pixel-divider {
        transform: scaleX(0); transform-origin: left;
        transition: transform .75s cubic-bezier(.22,1,.36,1) !important;
    }
    .pixel-divider.in { transform: scaleX(1) !important; }

    /* HOVER EFFECTS */
    .campaign-card { transition: border-color .28s ease, box-shadow .28s ease !important; }
    .campaign-card:hover { border-color: rgba(255,235,0,.18) !important; }

    .mockup-frame {
        transition: transform .35s cubic-bezier(.175,.885,.32,1.275),
                    border-color .28s ease, box-shadow .28s ease !important;
    }
    .mockup-frame:hover {
        transform: translateY(-11px) scale(1.03) !important;
        border-color: #ffeb00 !important;
        box-shadow: 0 18px 34px rgba(255,235,0,.16) !important;
    }

    .service-row {
        transition: transform .3s ease, border-color .28s ease, box-shadow .28s ease !important;
    }
    .service-row:hover {
        transform: translateX(8px) !important;
        border-color: #ffeb00 !important;
        box-shadow: 0 8px 26px rgba(255,235,0,.09) !important;
    }

    .logo-box {
        transition: transform .5s cubic-bezier(.25,.46,.45,.94),
                    filter .4s ease, opacity .4s ease !important;
    }

    .contact-card-link { transition: transform .3s ease, border-color .28s ease, box-shadow .28s ease !important; }
    .contact-card-link:hover {
        transform: translateY(-8px) scale(1.06) !important;
        border-color: #00ffff !important;
        box-shadow: 0 0 20px rgba(0,255,255,.24) !important;
    }

    @keyframes sFlash { 0%,100%{outline:2px solid transparent} 50%{outline:2px solid rgba(255,235,0,.22)} }
    .sf { animation: sFlash .55s ease; }

    @keyframes iBounce {
        0%  {transform:translateY(0) scale(1)}
        35% {transform:translateY(-18px) scale(1.1)}
        65% {transform:translateY(-7px) scale(1.04)}
        85% {transform:translateY(-12px) scale(1.07)}
        100%{transform:translateY(-9px) scale(1.06)}
    }

    .s-conn { height: 55px; width: 100%; display: block; pointer-events: none; }

    .image-frame img { transition: transform .1s linear; will-change: transform; }
    `;
    document.head.appendChild(s);

    /* ── 1. PROGRESS BAR ── */
    const pb = document.createElement('div'); pb.id = 'pb';
    document.body.appendChild(pb);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const t = document.documentElement.scrollHeight - innerHeight;
                pb.style.width = ((scrollY / t) * 100) + '%';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* ── 2. SCROLL REVEAL ── */
    const revealMap = [
        { sel: '.campaign-card',     cls: 'fb', d: 0    },
        { sel: '.service-row',         cls: 'fl', d: .08  },
        { sel: '.logo-box',             cls: 'pi', d: .03  },
        { sel: '.contact-card-link',   cls: 'pi', d: .08  },
        { sel: '.p-card',               cls: 'fb', d: .08  },
        { sel: '.campaigns-nav',       cls: 'fb', d: 0    },
        { sel: '.brands-header',       cls: 'fb', d: 0    },
        { sel: '.section-title',       cls: 'fb', d: 0    },
        { sel: '.pixel-divider',       cls: '',   d: 0    },
        { sel: '.masterpieces-bridge', cls: 'fb', d: 0    },
        { sel: '.section-flow-bridge', cls: 'fb', d: 0    },
    ];
    revealMap.forEach(({ sel, cls, d }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('wa');
            if (cls) el.classList.add(cls);
            el.style.transitionDelay = (d * i) + 's';
        });
    });

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.wa').forEach(el => io.observe(el));

    /* ── 3. SECTION CONNECTORS ── */
    [
        { after: '#hero',   from: '#f5f1ea', to: '#ffffff' },
        { after: '#brands', from: '#ffffff', to: '#f5f1ea' },
    ].forEach(({ after, from, to }) => {
        const sec = document.querySelector(after);
        if (!sec) return;
        const div = document.createElement('div');
        div.className = 's-conn';
        div.style.background = `linear-gradient(to bottom,${from},${to})`;
        sec.insertAdjacentElement('afterend', div);
    });

    /* ── 4. NAVBAR + ACTIVE LINK + DARK FLIP ── */
    const navbar  = document.querySelector('.navbar');
    const secs    = document.querySelectorAll('section[id]');
    const links   = document.querySelectorAll('.nav-links a[href^="#"]');
    const darkIds = new Set(['masterpieces','perspective','services','contact']);

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('nav-shrunk', scrollY > 55);
        let activeSec = '';
        secs.forEach(s => { if (scrollY >= s.offsetTop - 130) activeSec = s.id; });
        links.forEach(l => l.classList.toggle('nav-active', l.getAttribute('href') === `#${activeSec}`));
    }, { passive: true });

    /* ── 5. SMOOTH SCROLL ── */
    links.forEach(l => {
        l.addEventListener('click', e => {
            const t = document.querySelector(l.getAttribute('href'));
            if (!t) return;
            e.preventDefault();
            t.classList.add('sf');
            setTimeout(() => t.classList.remove('sf'), 600);
            window.scrollTo({ top: t.offsetTop - 68, behavior: 'smooth' });
        });
    });

    /* ── 6. HERO PARALLAX (passive, throttled) ── */
    const heroImg = document.querySelector('.image-frame img');
    if (heroImg) {
        let ptick = false;
        window.addEventListener('scroll', () => {
            if (!ptick) {
                requestAnimationFrame(() => {
                    if (scrollY < innerHeight)
                        heroImg.style.transform = `translateY(${(scrollY * .07).toFixed(1)}px)`;
                    ptick = false;
                });
                ptick = true;
            }
        }, { passive: true });
    }

    /* ── 7. LOGO RANDOM TILT (Modified for organised-messy vibe) ── */
    document.querySelectorAll('.logo-box').forEach(logo => {
        // Skip specific logic if it's the center hero
        if (logo.classList.contains('center-hero')) {
            logo.style.transform = 'rotate(0deg)';
            return;
        }

        // Random tilt between -4 and 4 degrees for that messy-but-organised vibe
        const tilt  = (Math.random() * 8 - 4).toFixed(1);
        const moveY = (Math.random() * 10 - 5).toFixed(1);
        const orig  = `rotate(${tilt}deg) translateY(${moveY}px)`;
        
        logo.dataset.orig = orig;
        logo.style.transform = orig;

        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'rotate(0deg) scale(1.1) translateY(-4px)';
            logo.style.opacity   = '1';
            logo.style.filter    = 'grayscale(0%)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = logo.dataset.orig;
            logo.style.opacity   = '';
            logo.style.filter    = '';
        });
    });

    /* ── 8. CONTACT BOUNCE ── */
    document.querySelectorAll('.contact-card-link').forEach(icon => {
        icon.addEventListener('mouseenter', () => { icon.style.animation = 'iBounce .42s ease forwards'; });
        icon.addEventListener('mouseleave', () => { icon.style.animation = ''; icon.style.transform = ''; });
    });

    /* ── 9. PERSPECTIVE 3D TILT ── */
    document.querySelectorAll('.p-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - .5;
            const y = (e.clientY - r.top)  / r.height - .5;
            card.style.transform = `perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) scale(1.03)`;
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.zIndex    = '';
        });
    });

    /* ── 10. FIX IMAGE PATHS ── */
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src') || '';
        if (src.startsWith('/assets')) img.setAttribute('src', src.slice(1));
        img.addEventListener('error', function () { this.style.opacity = '.1'; });
    });

});