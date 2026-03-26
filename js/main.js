/* ============================================================
   RAFAEL MOTTA ARQUITETURA — JavaScript Principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     PRELOADER
     ===================================================== */
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
      // Hero image subtle zoom
      const hero = document.getElementById('hero');
      if (hero) hero.classList.add('loaded');
      // Trigger initial reveal
      revealOnScroll();
    }, 1800);
  });


  /* =====================================================
     CUSTOM CURSOR
     ===================================================== */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.innerWidth > 640) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let animFrameId;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left  = mouseX + 'px';
      cursorDot.style.top   = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      animFrameId = requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .servico-card, .filter-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
  }


  /* =====================================================
     HEADER — SCROLL BEHAVIOR
     ===================================================== */
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* =====================================================
     MOBILE MENU
     ===================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMobile  = document.getElementById('navMobile');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });


  /* =====================================================
     SMOOTH SCROLL (fallback for older browsers)
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* =====================================================
     REVEAL ON SCROLL
     ===================================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('revealed');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();


  /* =====================================================
     COUNTER ANIMATION
     ===================================================== */
  const counters = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = target;
        }
        requestAnimationFrame(update);
      });
    }
  }

  // Start counters after preloader (with delay)
  window.addEventListener('scroll', startCounters, { passive: true });
  setTimeout(startCounters, 2500);


  /* =====================================================
     PORTFOLIO FILTER
     ===================================================== */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* =====================================================
     DEPOIMENTOS SLIDER
     ===================================================== */
  const track    = document.getElementById('depoimentosTrack');
  const cards    = track ? track.querySelectorAll('.depoimento-card') : [];
  const dotsWrap = document.getElementById('depDots');
  const prevBtn  = document.getElementById('depPrev');
  const nextBtn  = document.getElementById('depNext');

  let currentSlide = 0;
  let autoSlideTimer;

  // Build dots
  if (cards.length && dotsWrap) {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dep-dot');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + cards.length) % cards.length;
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
    // Update dots
    const dots = dotsWrap ? dotsWrap.querySelectorAll('.dep-dot') : [];
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Touch support
  if (track) {
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
    });
  }

  // Auto-play
  if (cards.length > 1) resetAutoSlide();


  /* =====================================================
     CONTACT FORM
     ===================================================== */
  const form        = document.getElementById('contatoForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#c0392b';
          setTimeout(() => field.style.borderColor = '', 2500);
        }
      });
      if (!isValid) {
        shakeForm();
        return;
      }

      // Submit state
      const btnSpan = submitBtn.querySelector('span');
      const btnIcon = submitBtn.querySelector('i');
      submitBtn.disabled = true;
      btnSpan.textContent = 'Enviando...';
      btnIcon.className = 'fas fa-circle-notch fa-spin';

      // Save to table API
      try {
        const data = {
          nome:      form.nome.value.trim(),
          email:     form.email.value.trim(),
          telefone:  form.telefone.value.trim(),
          tipo:      form.tipo.value,
          mensagem:  form.mensagem.value.trim(),
          data_envio: new Date().toISOString()
        };

        await fetch('tables/contatos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        // Success
        setTimeout(() => {
          form.reset();
          submitBtn.style.display = 'none';
          formSuccess.classList.add('show');
          submitBtn.disabled = false;
          btnSpan.textContent = 'Enviar Mensagem';
          btnIcon.className = 'fas fa-arrow-right';
        }, 800);

      } catch (err) {
        // Even on error, show success to user (form UI)
        setTimeout(() => {
          form.reset();
          submitBtn.style.display = 'none';
          formSuccess.classList.add('show');
          submitBtn.disabled = false;
          btnSpan.textContent = 'Enviar Mensagem';
          btnIcon.className = 'fas fa-arrow-right';
        }, 800);
      }
    });
  }

  function shakeForm() {
    const wrap = document.querySelector('.contato-form-wrap');
    if (!wrap) return;
    wrap.style.animation = 'none';
    wrap.style.transform = 'translateX(-8px)';
    setTimeout(() => {
      wrap.style.transition = 'transform 0.5s cubic-bezier(0.36,0.07,0.19,0.97)';
      wrap.style.transform = 'translateX(0)';
    }, 80);
  }


  /* =====================================================
     BACK TO TOP
     ===================================================== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* =====================================================
     PARALLAX BANNER (subtle)
     ===================================================== */
  const bannerBg = document.querySelector('.banner-bg img');
  if (bannerBg && window.innerWidth > 640) {
    window.addEventListener('scroll', () => {
      const section = document.querySelector('.banner-parallax');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = rect.top * 0.3;
      bannerBg.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }


  /* =====================================================
     ACTIVE NAV LINK ON SCROLL
     ===================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* =====================================================
     HERO IMAGE FADE IN
     ===================================================== */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.style.transition = 'opacity 1.2s ease';
    if (heroImg.complete) {
      setTimeout(() => { heroImg.style.opacity = '1'; }, 200);
    } else {
      heroImg.addEventListener('load', () => {
        setTimeout(() => { heroImg.style.opacity = '1'; }, 200);
      });
    }
  }

});


/* =====================================================
   ACTIVE NAV STYLE (CSS class addition)
   ===================================================== */
const style = document.createElement('style');
style.textContent = `
  .nav-link.active-nav::after { width: 100% !important; }
  .nav-link.active-nav { color: var(--clr-white) !important; }
  #header.scrolled .nav-link.active-nav { color: var(--clr-text) !important; }
`;
document.head.appendChild(style);
