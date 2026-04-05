/* ============================================
   OSAMA MOHAMED — PORTFOLIO JS (CLEAN v7)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Inject dynamic CSS ── */
    const s = document.createElement('style');
    s.textContent = `
    * { cursor: none !important; }
    #cur {
        position: fixed; width: 11px; height: 11px;
        background: #1a1a1a; border-radius: 50%;
        pointer-events: none; z-index: 999999;
        transform: translate(-50%,-50%);
        transition: width .12s ease, height .12s ease, background .12s ease;
        mix-blend-mode: difference;
    }
    body.on-dark #cur { background: #f5f1ea; }
    #cur.h { width: 18px; height: 18px; }
    #cur.c { width: 7px;  height: 7px;  }

    #pb {
        position: fixed; top: 0; left: 0; height: 3px; width: 0%;
        background: linear-gradient(90deg,#ffeb00,#ff4d4d 55%,#a78bfa);
        z-index: 9999; pointer-events: none; transition: width .06s linear;
    }

    .nav-shrunk { box-shadow: 0 3px 16px rgba(0,0,0,.09); }
    .nav-shrunk .nav-container { padding-top: 8px !important; padding-bottom: 8px !important; }
    .nav-active { color: #ff4d4d !important; }

    .wa {
        opacity: 0;
        transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
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

    @keyframes iBounce {
        0%  { transform:translateY(0) scale(1) }
        35% { transform:translateY(-18px) scale(1.1) }
        65% { transform:translateY(-7px) scale(1.04) }
        85% { transform:translateY(-12px) scale(1.07) }
        100%{ transform:translateY(-9px) scale(1.06) }
    }
    @keyframes sFlash {
        0%,100% { outline: 2px solid transparent }
        50%     { outline: 2px solid rgba(255,235,0,.2) }
    }
    .sf { animation: sFlash .5s ease; }
    .image-frame img { transition: transform .1s linear; will-change: transform; }
    `;
    document.head.appendChild(s);


    /* ── 1. CURSOR ── */
    const cur = document.createElement('div'); cur.id = 'cur';
    document.body.appendChild(cur);
    document.querySelectorAll('.cursor-glow').forEach(e => e.remove());

    document.addEventListener('mousemove', e => {
        cur.style.left = e.clientX + 'px';
        cur.style.top  = e.clientY + 'px';
    }, { passive: true });

    document.querySelectorAll('a,button,.nav-item-mini,.mockup-frame,.logo-box,.service-row,.contact-card-link,.p-card,.thumb-box').forEach(el => {
        el.addEventListener('mouseenter', () => cur.classList.add('h'));
        el.addEventListener('mouseleave', () => cur.classList.remove('h'));
    });
    document.addEventListener('mousedown', () => cur.classList.add('c'));
    document.addEventListener('mouseup',   () => cur.classList.remove('c'));


    /* ── 2. PROGRESS BAR ── */
    const pb = document.createElement('div'); pb.id = 'pb';
    document.body.appendChild(pb);
    let pbTick = false;
    window.addEventListener('scroll', () => {
        if (!pbTick) {
            requestAnimationFrame(() => {
                const t = document.documentElement.scrollHeight - innerHeight;
                pb.style.width = t > 0 ? ((scrollY / t) * 100) + '%' : '0%';
                pbTick = false;
            });
            pbTick = true;
        }
    }, { passive: true });


    /* ── 3. SCROLL REVEAL ── */
    [
        { sel: '.campaign-card',       cls: 'fb', d: 0    },
        { sel: '.service-row',         cls: 'fl', d: 0.08 },
        { sel: '.logo-box',            cls: 'pi', d: 0.03 },
        { sel: '.contact-card-link',   cls: 'pi', d: 0.08 },
        { sel: '.p-card',              cls: 'fb', d: 0.08 },
        { sel: '.campaigns-nav',       cls: 'fb', d: 0    },
        { sel: '.brands-header',       cls: 'fb', d: 0    },
        { sel: '.section-title',       cls: 'fb', d: 0    },
        { sel: '.pixel-divider',       cls: '',   d: 0    },
        { sel: '.masterpieces-bridge', cls: 'fb', d: 0    },
        { sel: '.section-flow-bridge', cls: 'fb', d: 0    },
    ].forEach(({ sel, cls, d }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('wa');
            if (cls) el.classList.add(cls);
            el.style.transitionDelay = (d * i) + 's';
        });
    });

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.wa').forEach(el => io.observe(el));


    /* ── 4. SECTION CONNECTORS ── */
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


    /* ── 5. NAVBAR SCROLL + ACTIVE + DARK FLIP ── */
    const navbar  = document.querySelector('.navbar');
    const secs    = document.querySelectorAll('section[id]');
    const links   = document.querySelectorAll('.nav-links a[href^="#"]');
    const darkIds = new Set(['masterpieces','perspective','services','contact']);

    let navTick = false;
    window.addEventListener('scroll', () => {
        if (!navTick) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('nav-shrunk', scrollY > 55);
                let activeSec = '';
                secs.forEach(sec => { if (scrollY >= sec.offsetTop - 130) activeSec = sec.id; });
                links.forEach(l => l.classList.toggle('nav-active', l.getAttribute('href') === `#${activeSec}`));
                document.body.classList.toggle('on-dark', darkIds.has(activeSec));
                navTick = false;
            });
            navTick = true;
        }
    }, { passive: true });


    /* ── 6. SMOOTH SCROLL ── */
    links.forEach(l => {
        l.addEventListener('click', e => {
            const target = document.querySelector(l.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.classList.add('sf');
            setTimeout(() => target.classList.remove('sf'), 550);
            window.scrollTo({ top: target.offsetTop - 65, behavior: 'smooth' });
        });
    });


    /* ── 7. HERO PARALLAX ── */
    const heroImg = document.querySelector('.image-frame img');
    if (heroImg) {
        let pTick = false;
        window.addEventListener('scroll', () => {
            if (!pTick) {
                requestAnimationFrame(() => {
                    if (scrollY < innerHeight)
                        heroImg.style.transform = `translateY(${(scrollY * 0.07).toFixed(1)}px)`;
                    pTick = false;
                });
                pTick = true;
            }
        }, { passive: true });
    }


    /* ── 8. LOGO RANDOM TILT ── */
    document.querySelectorAll('.logo-box').forEach(logo => {
        const skip = ['su','sd','tl','tr','ts','ch'].some(c => logo.classList.contains(c));
        if (skip) return;
        const tilt  = (Math.random() * 6  - 3).toFixed(1);
        const moveY = (Math.random() * 10 - 5).toFixed(1);
        const orig  = `rotate(${tilt}deg) translateY(${moveY}px)`;
        logo.dataset.orig = orig;
        logo.style.transform = orig;
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'rotate(0deg) scale(1.1) translateY(-4px)';
            logo.style.opacity = '1'; logo.style.filter = 'grayscale(0%)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = logo.dataset.orig;
            logo.style.opacity = ''; logo.style.filter = '';
        });
    });


    /* ── 9. CONTACT BOUNCE ── */
    document.querySelectorAll('.contact-card-link').forEach(icon => {
        icon.addEventListener('mouseenter', () => { icon.style.animation = 'iBounce .42s ease forwards'; });
        icon.addEventListener('mouseleave', () => { icon.style.animation = ''; icon.style.transform = ''; });
    });


    /* ── 10. PERSPECTIVE 3D TILT ── */
    document.querySelectorAll('.p-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) scale(1.03)`;
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.zIndex = ''; });
    });


    /* ── 11. FIX IMAGE PATHS ── */
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src') || '';
        if (src.startsWith('/assets')) img.setAttribute('src', src.slice(1));
        img.addEventListener('error', function () { this.style.opacity = '.1'; });
    });


    /* ── 12. MOBILE MENU ── */
    const menuBtn  = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        const spans = menuBtn.querySelectorAll('span');

        const openMenu = () => {
            navLinks.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity   = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            menuBtn.style.borderColor = '#ffeb00';
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            spans[0].style.transform = '';
            spans[1].style.opacity   = '1';
            spans[2].style.transform = '';
            menuBtn.style.borderColor = '#000';
        };

        menuBtn.addEventListener('click', () => {
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

});

const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.nav-overlay');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});

// إغلاق المنيو عند الضغط على أي رابط أو على الـ Overlay
[overlay, ...document.querySelectorAll('.nav-links a')].forEach(el => {
    el.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    });
});

/* ── 1. CURSOR ── */
const isMobile = window.matchMedia("(max-width: 991px)").matches;

if (!isMobile) {
    const cur = document.createElement('div'); 
    cur.id = 'cur';
    document.body.appendChild(cur);

    document.addEventListener('mousemove', e => {
        cur.style.left = e.clientX + 'px';
        cur.style.top  = e.clientY + 'px';
    }, { passive: true });

    document.querySelectorAll('a,button,.nav-item-mini,.mockup-frame,.logo-box,.service-row,.contact-card-link,.p-card,.thumb-box').forEach(el => {
        el.addEventListener('mouseenter', () => cur.classList.add('h'));
        el.addEventListener('mouseleave', () => cur.classList.remove('h'));
    });
    
    document.addEventListener('mousedown', () => cur.classList.add('c'));
    document.addEventListener('mouseup',   () => cur.classList.remove('c'));
} else {
    // لو موبايل، نتأكد إن الكرسور العادي شغال ومفيش Cursor None
    document.documentElement.style.cursor = 'auto';
    // لو كنتِ ضايفة الكلاس اللي بيخفي الكرسور في الـ Dynamic CSS شيليه
}

 /* ── Inject dynamic CSS (Updated) ── */
const s = document.createElement('style');
// نتحقق إذا كان المستخدم على كمبيوتر (شاشة أكبر من 991px)
const isDesktop = window.innerWidth > 991;

s.textContent = `
    /* إخفاء الكرسور الأصلي فقط في الديسكتوب */
    ${isDesktop ? '* { cursor: none !important; }' : ''}

    #cur {
        position: fixed; width: 11px; height: 11px;
        background: #1a1a1a; border-radius: 50%;
        pointer-events: none; z-index: 999999;
        transform: translate(-50%,-50%);
        transition: width .12s ease, height .12s ease, background .12s ease;
        mix-blend-mode: difference;
        /* إخفاء عنصر الكرسور المخصص تماماً في الموبايل */
        display: ${isDesktop ? 'block' : 'none'} !important;
    }

    body.on-dark #cur { background: #f5f1ea; }
    #cur.h { width: 18px; height: 18px; }
    #cur.c { width: 7px;  height: 7px;  }

    #pb {
        position: fixed; top: 0; left: 0; height: 3px; width: 0%;
        background: linear-gradient(90deg,#ffeb00,#ff4d4d 55%,#a78bfa);
        z-index: 9999; pointer-events: none; transition: width .06s linear;
    }

    .nav-shrunk { box-shadow: 0 3px 16px rgba(0,0,0,.09); }
    .nav-shrunk .nav-container { padding-top: 8px !important; padding-bottom: 8px !important; }
    .nav-active { color: #ff4d4d !important; }
`;
document.head.appendChild(s);