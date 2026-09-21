/* =========================================================
   JDA | DEVELOPER PORTFOLIO
   Behaviour: loader, header, mobile menu, active link,
   reveal on scroll, cursor glow, magnetic buttons
   ========================================================= */
 
(function () {
 
    'use strict';
 
    var doc = document;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
 
    /* -----------------------------------------------------
       1. PAGE LOADER
       ----------------------------------------------------- */
 
    var loader = doc.querySelector('.page-loader');
 
    function hideLoader() {
        if (loader) {
            loader.classList.add('is-done');
        }
    }
 
    window.addEventListener('load', function () {
        setTimeout(hideLoader, prefersReducedMotion ? 0 : 700);
    });
 
    // safety net: never leave the loader on screen
    setTimeout(hideLoader, 3500);
 
 
    /* -----------------------------------------------------
       2. HEADER BACKGROUND ON SCROLL
       ----------------------------------------------------- */
 
    var header = doc.querySelector('.site-header');
 
    function onScroll() {
        if (header) {
            header.classList.toggle('is-scrolled', window.scrollY > 24);
        }
    }
 
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
 
 
    /* -----------------------------------------------------
       3. MOBILE MENU
       ----------------------------------------------------- */
 
    var toggle = doc.querySelector('.menu-toggle');
    var nav = doc.querySelector('.main-nav');
 
    function setMenu(open) {
        if (!toggle || !nav) return;
 
        toggle.classList.toggle('is-open', open);
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        doc.body.style.overflow = open ? 'hidden' : '';
    }
 
    if (toggle && nav) {
 
        toggle.addEventListener('click', function () {
            setMenu(!nav.classList.contains('is-open'));
        });
 
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenu(false);
            });
        });
 
        doc.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setMenu(false);
            }
        });
    }
 
 
    /* -----------------------------------------------------
       4. ACTIVE NAV LINK (dot under the current section)
       ----------------------------------------------------- */
 
    var navLinks = doc.querySelectorAll('.main-nav a:not(.nav-cta)');
    var spySections = doc.querySelectorAll('[data-spy]');
 
    function setActive(name) {
        navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + name);
        });
    }
 
    if ('IntersectionObserver' in window && spySections.length) {
 
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActive(entry.target.dataset.spy);
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
 
        spySections.forEach(function (section) {
            spy.observe(section);
        });
    }
 
 
    /* -----------------------------------------------------
       5. REVEAL ON SCROLL
       ----------------------------------------------------- */
 
    var revealItems = doc.querySelectorAll('.reveal');
 
    if ('IntersectionObserver' in window) {
 
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
 
        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
 
    } else {
 
        revealItems.forEach(function (item) {
            item.classList.add('is-visible');
        });
    }
 
 
    /* -----------------------------------------------------
       6. CURSOR GLOW (desktop only)
       ----------------------------------------------------- */
 
    var glow = doc.querySelector('.cursor-glow');
    var canHover = window.matchMedia('(hover: hover)').matches;
 
    if (glow && canHover && !prefersReducedMotion) {
 
        var targetX = 0;
        var targetY = 0;
        var currentX = 0;
        var currentY = 0;
        var running = false;
 
        function animateGlow() {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            glow.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0)';
 
            if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
                requestAnimationFrame(animateGlow);
            } else {
                running = false;
            }
        }
 
        window.addEventListener('mousemove', function (event) {
            targetX = event.clientX;
            targetY = event.clientY;
            glow.classList.add('is-on');
 
            if (!running) {
                running = true;
                requestAnimationFrame(animateGlow);
            }
        }, { passive: true });
 
        doc.addEventListener('mouseleave', function () {
            glow.classList.remove('is-on');
        });
    }
 
 
    /* -----------------------------------------------------
       7. MAGNETIC BUTTONS (desktop only)
       ----------------------------------------------------- */
 
    if (canHover && !prefersReducedMotion) {
 
        doc.querySelectorAll('.magnetic').forEach(function (button) {
 
            button.addEventListener('mousemove', function (event) {
                var box = button.getBoundingClientRect();
                var x = (event.clientX - box.left - box.width / 2) * 0.18;
                var y = (event.clientY - box.top - box.height / 2) * 0.3;
                button.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            });
 
            button.addEventListener('mouseleave', function () {
                button.style.transform = '';
            });
        });
    }
 
})();
 