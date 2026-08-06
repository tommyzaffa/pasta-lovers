/* Pasta Lovers — runtime.
   No dependencies, no build step. Works over file:// as well as http(s). */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ------------------------------------------------------------------ *
   * i18n
   * ------------------------------------------------------------------ */

  var LANGS = ['en', 'it', 'de', 'fr'];
  var DEFAULT_LANG = 'en';
  var STORE_KEY = 'pl-lang';
  var dict = window.PL_I18N || {};
  var lang = DEFAULT_LANG;

  function readStoredLang() {
    var stored;
    try { stored = localStorage.getItem(STORE_KEY); } catch (e) { stored = null; }
    if (stored && LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    if (LANGS.indexOf(nav) !== -1) return nav;
    return DEFAULT_LANG;
  }

  function t(key) {
    var table = dict[lang] || dict[DEFAULT_LANG] || {};
    if (key in table) return table[key];
    var fallback = dict[DEFAULT_LANG] || {};
    return key in fallback ? fallback[key] : key;
  }

  function applyI18n() {
    root.setAttribute('lang', lang);

    $$('[data-i18n]').forEach(function (el) {
      var value = t(el.getAttribute('data-i18n'));
      if (el.hasAttribute('data-i18n-split')) {
        el.innerHTML = '';
        el.appendChild(buildSplit(value));
      } else {
        el.textContent = value;
      }
    });

    // data-i18n-attr="placeholder:news.placeholder, aria-label:nav.open"
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length !== 2) return;
        el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });

    $$('[data-lang-only]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-only') !== lang;
    });
    $$('[data-lang-not]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-not') === lang;
    });

    updateLangUI();
    renderMenu();
    renderDishRails();
    doc.dispatchEvent(new CustomEvent('pl:lang', { detail: { lang: lang } }));
  }

  function setLang(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
    applyI18n();
  }

  function pick(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj[DEFAULT_LANG] || '';
  }

  /* Language dropdown ------------------------------------------------- */

  function updateLangUI() {
    $$('.lang').forEach(function (wrap) {
      var code = $('.lang__code', wrap);
      if (code) code.textContent = lang.toUpperCase();
      $$('.lang__opt', wrap).forEach(function (opt) {
        var isCur = opt.getAttribute('data-lang') === lang;
        opt.setAttribute('aria-selected', isCur ? 'true' : 'false');
      });
    });
  }

  function initLang() {
    $$('.lang').forEach(function (wrap) {
      var btn = $('.lang__btn', wrap);
      var menu = $('.lang__menu', wrap);
      if (!btn || !menu) return;

      // Fill the options from the dictionaries so labels stay in sync.
      menu.innerHTML = '';
      LANGS.forEach(function (code) {
        var opt = doc.createElement('button');
        opt.type = 'button';
        opt.className = 'lang__opt';
        opt.setAttribute('role', 'option');
        opt.setAttribute('data-lang', code);
        opt.textContent = (dict[code] && dict[code]['lang.name']) || code.toUpperCase();
        opt.addEventListener('click', function () {
          setLang(code);
          close();
        });
        menu.appendChild(opt);
      });

      function open() {
        wrap.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
      function close() {
        wrap.setAttribute('data-open', 'false');
        btn.setAttribute('aria-expanded', 'false');
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (wrap.getAttribute('data-open') === 'true') close(); else open();
      });
      doc.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) close();
      });
      doc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
      close();
    });
  }

  /* ------------------------------------------------------------------ *
   * Kinetic split text
   * ------------------------------------------------------------------ */

  function buildSplit(text) {
    var frag = doc.createDocumentFragment();
    String(text).split('\n').forEach(function (lineText) {
      var line = doc.createElement('span');
      line.className = 'split-line';
      lineText.split(/\s+/).filter(Boolean).forEach(function (word, i) {
        var w = doc.createElement('span');
        w.className = 'split-word';
        w.style.transitionDelay = (i * 55) + 'ms';
        w.textContent = word;
        line.appendChild(w);
        line.appendChild(doc.createTextNode(' '));
      });
      frag.appendChild(line);
    });
    return frag;
  }

  function initSplit() {
    // Static markup (not driven by i18n) can opt in with data-split.
    $$('[data-split]:not([data-i18n])').forEach(function (el) {
      var text = el.textContent.trim();
      el.innerHTML = '';
      el.appendChild(buildSplit(text));
    });
  }

  /* ------------------------------------------------------------------ *
   * Reveal on scroll
   * ------------------------------------------------------------------ */

  var revealObserver = null;

  function observeReveals() {
    if (reduced) {
      $$('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    }
    $$('[data-reveal]:not(.is-in)').forEach(function (el) {
      if (el.getAttribute('data-reveal-delay')) {
        el.style.setProperty('--d', el.getAttribute('data-reveal-delay') + 'ms');
      }
      revealObserver.observe(el);
    });
    // Stagger children of a [data-stagger] container.
    $$('[data-stagger]').forEach(function (parent) {
      var step = parseInt(parent.getAttribute('data-stagger'), 10) || 90;
      $$('[data-reveal]', parent).forEach(function (child, i) {
        if (!child.getAttribute('data-reveal-delay')) {
          child.style.setProperty('--d', (i * step) + 'ms');
        }
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Preloader
   * ------------------------------------------------------------------ */

  function initPreloader() {
    var pre = $('.preloader');
    if (!pre) { body.classList.add('is-ready'); return; }
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      pre.classList.add('is-done');
      body.classList.add('is-ready');
      var hero = $('.hero__title');
      if (hero) hero.classList.add('split-ready');
      window.setTimeout(function () { pre.remove(); }, 900);
    }
    window.addEventListener('load', function () {
      window.setTimeout(finish, reduced ? 0 : 400);
    });
    window.setTimeout(finish, 3500); // never trap the user behind a slow asset
  }

  /* ------------------------------------------------------------------ *
   * Header, scroll progress, back to top
   * ------------------------------------------------------------------ */

  function initHeader() {
    var header = $('.header');
    var progress = $('.progress');
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      if (header) {
        header.classList.toggle('is-stuck', y > 24);
        var hidden = y > 320 && y > lastY + 4;
        if (y < lastY - 4 || y < 320) hidden = false;
        if (!body.classList.contains('is-menu-open')) {
          header.classList.toggle('is-hidden', hidden);
        }
      }
      if (progress) {
        var max = doc.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ *
   * Mobile drawer
   * ------------------------------------------------------------------ */

  function initDrawer() {
    var burger = $('.burger');
    var drawer = $('.drawer');
    if (!burger || !drawer) return;

    function setOpen(open) {
      body.classList.toggle('is-menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('data-i18n-attr', 'aria-label:' + (open ? 'nav.close' : 'nav.open'));
      burger.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      body.style.overflow = open ? 'hidden' : '';
    }

    burger.addEventListener('click', function () {
      setOpen(!body.classList.contains('is-menu-open'));
    });
    $$('a, button', drawer).forEach(function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('is-menu-open')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && body.classList.contains('is-menu-open')) setOpen(false);
    });
    setOpen(false);
  }

  /* ------------------------------------------------------------------ *
   * Smooth anchor scrolling (native scroll stays intact)
   * ------------------------------------------------------------------ */

  function headerOffset() {
    var header = $('.header');
    var nav = $('.menunav');
    return (header ? header.offsetHeight : 0) + (nav ? nav.offsetHeight : 0) + 12;
  }

  function scrollToEl(target) {
    var top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: Math.max(top, 0), behavior: reduced ? 'auto' : 'smooth' });
  }

  function initAnchors() {
    doc.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = doc.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      scrollToEl(target);
      if (history.replaceState) history.replaceState(null, '', id);
    });
  }

  /* ------------------------------------------------------------------ *
   * Parallax + hero media
   * ------------------------------------------------------------------ */

  function initParallax() {
    if (reduced) return;
    var items = $$('[data-parallax]');
    var hero = $('.hero__media');
    if (!items.length && !hero) return;
    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (-progress * speed * 100).toFixed(2) + 'px,0)';
      });
      if (hero) {
        var y = window.scrollY;
        if (y < vh * 1.2) {
          hero.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(2) + 'px,0)';
          hero.style.opacity = String(Math.max(1 - y / (vh * 0.9), 0));
        }
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------------------------ *
   * Marquee — duplicate the group so the -50% loop is seamless
   * ------------------------------------------------------------------ */

  function initMarquee() {
    $$('.marquee__track').forEach(function (track) {
      var groups = $$('.marquee__group', track);
      if (groups.length === 1) track.appendChild(groups[0].cloneNode(true));
      $$('.marquee__group', track).forEach(function (g, i) {
        if (i > 0) g.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Drag-scrollable rails
   * ------------------------------------------------------------------ */

  function initRails() {
    $$('.rail').forEach(function (rail) {
      var down = false, moved = false, startX = 0, startLeft = 0;

      rail.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return; // native momentum is better
        down = true; moved = false;
        startX = e.clientX;
        startLeft = rail.scrollLeft;
      });
      rail.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) {
          if (!moved) { moved = true; rail.classList.add('is-dragging'); rail.setPointerCapture(e.pointerId); }
          rail.scrollLeft = startLeft - dx;
        }
      });
      function end() {
        down = false;
        rail.classList.remove('is-dragging');
      }
      rail.addEventListener('pointerup', function (e) {
        if (moved) { e.preventDefault(); }
        end();
      });
      rail.addEventListener('pointercancel', end);
      rail.addEventListener('pointerleave', end);
      rail.addEventListener('click', function (e) {
        if (moved) { e.preventDefault(); e.stopPropagation(); }
      }, true);

      // Hide the "drag to explore" hint once the user gets it.
      var hint = rail.parentElement && $('.rail__hint', rail.parentElement);
      if (hint) {
        rail.addEventListener('scroll', function () {
          if (rail.scrollLeft > 40) { hint.style.opacity = '0'; }
        }, { passive: true, once: true });
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Lightbox
   * ------------------------------------------------------------------ */

  function initLightbox() {
    var box = $('.lightbox');
    if (!box) return;
    var img = $('img', box);
    var tiles = $$('.tile');
    var index = 0;
    var lastFocus = null;

    function show(i) {
      index = (i + tiles.length) % tiles.length;
      var source = $('img', tiles[index]);
      if (!source) return;
      img.src = source.getAttribute('data-full') || source.currentSrc || source.src;
      img.alt = source.alt || '';
    }
    function open(i) {
      lastFocus = doc.activeElement;
      show(i);
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden';
      var close = $('.lightbox__close', box);
      if (close) close.focus();
    }
    function close() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    tiles.forEach(function (tile, i) {
      tile.addEventListener('click', function () { open(i); });
      tile.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    var closeBtn = $('.lightbox__close', box);
    var prevBtn = $('.lightbox__prev', box);
    var nextBtn = $('.lightbox__next', box);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    doc.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ------------------------------------------------------------------ *
   * Custom cursor + magnetic buttons
   * ------------------------------------------------------------------ */

  function initCursor() {
    if (reduced || coarse) return;
    var cursor = $('.cursor');
    if (!cursor) return;
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    var cx = x, cy = y;

    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      cursor.classList.add('is-on');
      var hot = e.target.closest ? e.target.closest('a, button, .tile, .card, summary, input, .rail') : null;
      cursor.classList.toggle('is-hover', !!hot);
    }, { passive: true });
    doc.addEventListener('mouseleave', function () { cursor.classList.remove('is-on'); });

    (function loop() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      window.requestAnimationFrame(loop);
    })();
  }

  function initMagnetic() {
    if (reduced || coarse) return;
    $$('[data-magnetic]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnetic')) || 0.3;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * strength;
        var dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------------ *
   * Newsletter form
   * ------------------------------------------------------------------ */

  function initNewsletter() {
    var form = $('#newsletter');
    if (!form) return;
    var input = $('input[type="email"]', form);
    var note = $('.formnote', form);
    var consent = $('input[type="checkbox"]', form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((input.value || '').trim());
      if (!ok || (consent && !consent.checked)) {
        note.textContent = t('news.error');
        note.dataset.state = 'error';
        input.focus();
        return;
      }
      note.textContent = t('news.thanks');
      note.dataset.state = 'ok';
      form.reset();
    });
  }

  /* ------------------------------------------------------------------ *
   * Menu rendering (menu.html)
   * ------------------------------------------------------------------ */

  function priceTag(value) {
    return (window.PL_MENU ? window.PL_MENU.currency : '$') + value;
  }

  function buildItem(item, addons) {
    var li = doc.createElement('li');
    li.className = 'mitem' + (item.img ? ' mitem--photo' : '');
    li.id = 'dish-' + item.id;

    if (item.img) {
      var media = doc.createElement('div');
      media.className = 'mitem__media';
      var im = doc.createElement('img');
      im.src = item.img;
      im.alt = pick(item.name);
      im.loading = 'lazy';
      im.decoding = 'async';
      media.appendChild(im);
      li.appendChild(media);
    }

    var bodyEl = doc.createElement('div');
    bodyEl.className = 'mitem__body';

    var top = doc.createElement('div');
    top.className = 'mitem__top';
    var name = doc.createElement('h3');
    name.className = 'mitem__name';
    name.textContent = pick(item.name);
    top.appendChild(name);
    if (item.price) {
      var price = doc.createElement('span');
      price.className = 'mitem__price';
      price.textContent = priceTag(item.price);
      top.appendChild(price);
    }
    bodyEl.appendChild(top);

    if (item.desc) {
      var desc = doc.createElement('p');
      desc.className = 'mitem__desc';
      desc.textContent = pick(item.desc);
      bodyEl.appendChild(desc);
    }

    if (item.variants) {
      var vars = doc.createElement('ul');
      vars.className = 'mitem__variants';
      item.variants.forEach(function (v) {
        var vi = doc.createElement('li');
        vi.className = 'vpill';
        vi.appendChild(doc.createTextNode(pick(v.label) + ' '));
        var b = doc.createElement('b');
        b.textContent = priceTag(v.price);
        vi.appendChild(b);
        vars.appendChild(vi);
      });
      bodyEl.appendChild(vars);
    }

    if (item.addons && addons && addons.length) {
      var det = doc.createElement('details');
      det.className = 'addons';
      var sum = doc.createElement('summary');
      sum.appendChild(doc.createTextNode(t('menuPage.addons')));
      sum.insertAdjacentHTML('beforeend',
        '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      det.appendChild(sum);
      var list = doc.createElement('ul');
      list.className = 'addons__list';
      addons.forEach(function (a) {
        var ai = doc.createElement('li');
        ai.className = 'vpill';
        ai.appendChild(doc.createTextNode(pick(a.name) + ' '));
        var ab = doc.createElement('b');
        ab.textContent = priceTag(a.price);
        ai.appendChild(ab);
        list.appendChild(ai);
      });
      det.appendChild(list);
      bodyEl.appendChild(det);
    }

    li.appendChild(bodyEl);
    return li;
  }

  function renderMenu() {
    var host = $('#menu-root');
    var data = window.PL_MENU;
    if (!host || !data) return;

    host.innerHTML = '';
    data.sections.forEach(function (section) {
      var sec = doc.createElement('section');
      sec.className = 'msection';
      sec.id = section.id;

      var head = doc.createElement('div');
      head.className = 'msection__head';
      head.setAttribute('data-reveal', '');
      var h2 = doc.createElement('h2');
      h2.textContent = pick(section.title);
      head.appendChild(h2);
      if (section.sub) {
        var p = doc.createElement('p');
        p.className = 'muted';
        p.textContent = pick(section.sub);
        head.appendChild(p);
      }
      sec.appendChild(head);

      var ul = doc.createElement('ul');
      ul.className = 'mlist';
      ul.setAttribute('data-stagger', '70');
      section.items.forEach(function (item) {
        var li = buildItem(item, data.addons);
        li.setAttribute('data-reveal', '');
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      host.appendChild(sec);
    });

    renderMenuNav(data);
    observeReveals();
  }

  function renderMenuNav(data) {
    var nav = $('#menu-chips');
    if (!nav) return;
    nav.innerHTML = '';
    data.sections.forEach(function (section) {
      var a = doc.createElement('a');
      a.className = 'chip';
      a.href = '#' + section.id;
      a.textContent = pick(section.title);
      nav.appendChild(a);
    });
    spyMenuNav();
  }

  var menuSpyObserver = null;

  function spyMenuNav() {
    var chips = $$('#menu-chips .chip');
    if (!chips.length) return;
    if (menuSpyObserver) menuSpyObserver.disconnect();
    menuSpyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        chips.forEach(function (c) {
          var active = c.getAttribute('href') === '#' + entry.target.id;
          c.classList.toggle('is-active', active);
          if (active && c.parentElement) {
            c.parentElement.scrollTo({ left: c.offsetLeft - 24, behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    $$('.msection').forEach(function (s) { menuSpyObserver.observe(s); });
  }

  /* ------------------------------------------------------------------ *
   * Signature dish rail (index.html) — same data source as the menu
   * ------------------------------------------------------------------ */

  function findDish(id) {
    var data = window.PL_MENU;
    if (!data) return null;
    for (var i = 0; i < data.sections.length; i++) {
      var items = data.sections[i].items;
      for (var j = 0; j < items.length; j++) {
        if (items[j].id === id) return items[j];
      }
    }
    return null;
  }

  function renderDishRails() {
    $$('[data-dishes]').forEach(function (rail) {
      var ids = rail.getAttribute('data-dishes').split(',').map(function (s) { return s.trim(); });
      rail.innerHTML = '';
      ids.forEach(function (id, i) {
        var dish = findDish(id);
        if (!dish) return;

        var card = doc.createElement('article');
        card.className = 'card';
        card.setAttribute('data-reveal', 'zoom');
        card.style.setProperty('--d', (i * 70) + 'ms');

        var media = doc.createElement('div');
        media.className = 'card__media';
        var img = doc.createElement('img');
        img.src = dish.img || 'assets/img/pastas.jpg';
        img.alt = pick(dish.name);
        img.loading = 'lazy';
        img.decoding = 'async';
        media.appendChild(img);
        if (dish.price) {
          var tag = doc.createElement('span');
          tag.className = 'card__price';
          tag.textContent = priceTag(dish.price);
          media.appendChild(tag);
        }
        card.appendChild(media);

        var bodyEl = doc.createElement('div');
        bodyEl.className = 'card__body';
        var h3 = doc.createElement('h3');
        h3.className = 'card__title';
        h3.textContent = pick(dish.name);
        bodyEl.appendChild(h3);
        var p = doc.createElement('p');
        p.className = 'card__desc';
        p.textContent = pick(dish.desc);
        bodyEl.appendChild(p);
        card.appendChild(bodyEl);

        rail.appendChild(card);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Misc
   * ------------------------------------------------------------------ */

  function initYear() {
    $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  function initHeroVideo() {
    var video = $('.hero__media video');
    if (!video) return;
    if (reduced) { video.pause(); return; }
    var play = video.play();
    if (play && play.catch) play.catch(function () { /* autoplay blocked, poster stays */ });
  }

  function initCurrentNav() {
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link, .drawer__link').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].split('/').pop().toLowerCase();
      if (href && href === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */

  function boot() {
    body = doc.body;
    lang = readStoredLang();
    initLang();
    initSplit();
    applyI18n();

    initPreloader();
    initHeader();
    initDrawer();
    initAnchors();
    initParallax();
    initMarquee();
    initRails();
    initLightbox();
    initCursor();
    initMagnetic();
    initNewsletter();
    initYear();
    initHeroVideo();
    initCurrentNav();
    observeReveals();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
