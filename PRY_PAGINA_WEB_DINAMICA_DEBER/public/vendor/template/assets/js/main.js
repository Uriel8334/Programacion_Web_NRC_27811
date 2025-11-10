/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  function initTyped() {
    // Ensure library and element exist
    if (typeof Typed === 'undefined') return;
    const selectTyped = document.querySelector('.typed');
    if (!selectTyped) return;
    let typed_strings = selectTyped.getAttribute('data-typed-items') || '';
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Init on load
  initTyped();

  // Re-init when content is loaded dynamically
  window.addEventListener('content:loaded', initTyped);
  // Also re-init AOS and Swiper after dynamic content insertion
  window.addEventListener('content:loaded', function() {
    if (typeof AOS !== 'undefined') {
      try { AOS.refresh(); } catch (e) { aosInit(); }
    }
    if (typeof initSwiper === 'function') {
      try { initSwiper(); } catch (e) { /* ignore */ }
    }
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    // Skip isotope for services section (if it exists there)
    if (isotopeItem.closest('#services')) {
      return;
    }
    
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Ensure all service items are always visible (no filtering)
   * This prevents Isotope or other layout engines from hiding service cards
   */
  function ensureServicesVisible() {
    const servicesSection = document.querySelector('.services');
    if (!servicesSection) return;
    
    // Reset section level styles
    servicesSection.style.display = 'block';
    servicesSection.style.visibility = 'visible';
    servicesSection.style.opacity = '1';
    servicesSection.style.overflow = 'visible';
    
    const servicesContainer = servicesSection.querySelector('.row');
    if (!servicesContainer) return;
    
    // Reset container level styles
    servicesContainer.style.display = 'flex';
    servicesContainer.style.flexWrap = 'wrap';
    servicesContainer.style.overflow = 'visible';
    servicesContainer.style.width = '100%';
    servicesContainer.style.minHeight = 'auto';
    
    // Force visibility of all service items - select all divs with col classes
    const allServiceDivs = servicesContainer.querySelectorAll('[class*="col-"]');
    
    allServiceDivs.forEach(function(item) {
      // Remove any display:none that might be set
      item.style.display = 'block';
      item.style.visibility = 'visible';
      item.style.opacity = '1';
      item.style.height = 'auto';
      item.style.minHeight = 'auto';
      item.style.maxHeight = 'none';
      item.style.overflow = 'visible';
      item.style.pointerEvents = 'auto';
      
      // Also check the service-item div inside
      const serviceItem = item.querySelector('.service-item');
      if (serviceItem) {
        serviceItem.style.display = 'block';
        serviceItem.style.visibility = 'visible';
        serviceItem.style.opacity = '1';
        serviceItem.style.height = '100%';
        serviceItem.style.overflow = 'visible';
      }
    });
  }

  /**
   * Monitor Services - Use continuous checking
   */
  function initServicesMonitor() {
    const servicesContainer = document.querySelector('.services');
    if (!servicesContainer) return;

    // First, ensure visibility immediately
    ensureServicesVisible();

    // Create a continuous monitor that fires frequently
    let monitorInterval = setInterval(function() {
      ensureServicesVisible();
    }, 250); // Check every 250ms
    
    // Store interval for potential cleanup
    if (!window._serviceMonitors) window._serviceMonitors = [];
    window._serviceMonitors.push(monitorInterval);
    
    // Also use MutationObserver as backup
    const observer = new MutationObserver(function(mutations) {
      // Any mutation = check services
      ensureServicesVisible();
    });

    const config = {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-aos-animate', 'data-aos'],
      childList: true,
      subtree: true,
      attributeOldValue: false
    };

    observer.observe(servicesContainer, config);
    
    if (!window._serviceMonitors) window._serviceMonitors = [];
    window._serviceMonitors.push(observer);
  }

  // Initialize services visibility on page load
  window.addEventListener('load', function() {
    ensureServicesVisible();
    setTimeout(initServicesMonitor, 100);
  });
  
  // Re-run after dynamic content loads
  window.addEventListener('content:loaded', function() {
    ensureServicesVisible();
    setTimeout(initServicesMonitor, 100);
  });
  
  // Also run it immediately and after short delays for safety
  ensureServicesVisible();
  initServicesMonitor();
  setTimeout(ensureServicesVisible, 50);
  setTimeout(ensureServicesVisible, 200);
  setTimeout(ensureServicesVisible, 500);
  setTimeout(ensureServicesVisible, 1000);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * History / timeline quick jump behavior
   * - Clicking the desktop scroll invitation scrolls to #history
   * - Buttons with .js-scroll-to-block scroll to their target id (data-scroll-to)
   */
  function updateHistoryOverlayText(section) {
    const title = section.getAttribute('data-title');
    const description = section.getAttribute('data-description');
    const overlayTitle = document.querySelector('.history-title');
    const overlayDesc = document.querySelector('.history-description');
    const content = document.querySelector('.history-text-content');

    if (!overlayTitle || !overlayDesc || !content) return;

    // Add blur-out class
    content.classList.add('blur-out');

    // After blur transition, update text and remove blur
    setTimeout(() => {
      overlayTitle.textContent = title;
      overlayDesc.textContent = description;
      content.classList.remove('blur-out');
    }, 500); // match CSS transition duration
  }

  function initHistoryScroll() {
    // If intro overlay exists, set initial hidden state for the history overlay
    const introOverlay = document.getElementById('introOverlay');
    const historyOverlay = document.querySelector('.history-text-overlay');
    if (historyOverlay && introOverlay) {
      historyOverlay.style.opacity = '0';
      historyOverlay.style.transition = 'opacity 0.6s ease';
    }
    // invitation -> history
    const inviteBtn = document.querySelector('.scroll-invitation__label--desktop');
    if (inviteBtn) {
      inviteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        transitionFromIntroToHistory();
      });
    }

    // action buttons inside history (attach click handlers)
    document.querySelectorAll('.js-scroll-to-block').forEach(function(btn) {
      // avoid attaching multiple times on repeated init
      if (btn.__historyBound) return;
      btn.__historyBound = true;
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        transitionFromIntroToHistory();
        const id = this.getAttribute('data-scroll-to');
        if (!id) return;
        const section = document.getElementById(id);
        if (!section) return;
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop || 0;
        window.scrollTo({ top: section.offsetTop - parseInt(scrollMarginTop || 0), behavior: 'smooth' });
      });
    });

    // highlight active history button when its section is in view
    const historySections = document.querySelectorAll('.history-subsection');
    if ('IntersectionObserver' in window && historySections.length) {
      // disconnect previous observer if present
      if (window._historyObserver) {
        try { window._historyObserver.disconnect(); } catch (e) { /* ignore */ }
      }

      const observerOptions = { root: null, rootMargin: '-10% 0% -10% 0%', threshold: [0, 0.25, 0.5, 0.75, 1] };
      window._historyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const btn = document.querySelector('.js-scroll-to-block[data-scroll-to="' + id + '"]');
          // Toggle in-view class so CSS can animate scale / opacity
          if (entry.intersectionRatio >= 0.5) {
            entry.target.classList.add('in-view');
            if (btn) {
              document.querySelectorAll('.block__list-button.active').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
            }
            // Update overlay text with blur/fade transition
            updateHistoryOverlayText(entry.target);
            // If intro overlay is still visible, transition away on first section entry
            const introOverlay = document.getElementById('introOverlay');
            if (introOverlay && !introOverlay.classList.contains('has-transitioned')) {
              transitionFromIntroToHistory();
            }
          } else {
            entry.target.classList.remove('in-view');
            if (btn) {
              btn.classList.remove('active');
            }
          }
        });
      }, observerOptions);

      historySections.forEach(sec => window._historyObserver.observe(sec));
    }
  }

  // init on load and after dynamic content insertion
  window.addEventListener('load', initHistoryScroll);
  window.addEventListener('content:loaded', initHistoryScroll);

  // Transition function: blur out intro overlay and reveal history overlay
  function transitionFromIntroToHistory() {
    const introOverlay = document.getElementById('introOverlay');
    const historyOverlay = document.querySelector('.history-text-overlay');
    const aboutIntroBox = document.getElementById('aboutIntroBox');
    if (!introOverlay || !historyOverlay) return;
    // Prevent re-run
    if (introOverlay.classList.contains('has-transitioned')) return;
    introOverlay.classList.add('has-transitioned');
    introOverlay.classList.add('blur-fade-out');
    if (aboutIntroBox) {
      aboutIntroBox.classList.add('is-hidden');
    }
    // Re-enable scrolling
    document.body.classList.remove('intro-active');
    setTimeout(() => {
      introOverlay.style.display = 'none';
      historyOverlay.style.opacity = '1';
      const target = document.querySelector('#history');
      if (target) {
        window.scrollTo({ top: target.offsetTop + 20, behavior: 'smooth' });
      }
    }, 700); // match blur-fade-out duration
  }

  /**
   * Intro text switcher on scroll/wheel/touch
   * Changes intro text from "Acerca de nosotros" to "La historia hecha realidad"
   * on first scroll/wheel event while intro is visible
   */
  let introTextSwitched = false;
  // keep original values so we can revert
  let introOriginalTitle = null;
  let introOriginalDescription = null;

  function switchIntroText(direction) {
    // direction > 0 => scrolling down (show alternate)
    // direction < 0 => scrolling up (show original)
    const introOverlay = document.getElementById('introOverlay');
    if (!introOverlay) return;
    if (introOverlay.classList.contains('has-transitioned')) return;

    const introTitle = document.getElementById('introTitle');
    const introDescription = document.getElementById('introDescription');
    if (!introTitle || !introDescription) return;

    // capture originals once
    if (introOriginalTitle === null) introOriginalTitle = introTitle.textContent;
    if (introOriginalDescription === null) introOriginalDescription = introDescription.textContent;

    const content = introOverlay.querySelector('.history-overlay-content');

    if (direction > 0 && !introTextSwitched) {
      // switch to alternate
      introTextSwitched = true;
      if (content) content.classList.add('blur-out');

      setTimeout(() => {
        const alt = document.getElementById('introAlt');
        if (alt) {
          introTitle.textContent = alt.getAttribute('data-title') || 'La historia hecha realidad';
          introDescription.textContent = alt.getAttribute('data-description') || 'Queríamos hacer una simple fantasía realidad, y después de mucho tiempo logramos lo imposible.';
        } else {
          introTitle.textContent = 'La historia hecha realidad';
          introDescription.textContent = 'Queríamos hacer una simple fantasía realidad, y después de mucho tiempo logramos lo imposible.';
        }
        if (content) content.classList.remove('blur-out');
        // keep previous behavior: re-enable scrolling after the first change
        document.body.classList.remove('intro-active');
      }, 500);
    } else if (direction < 0 && introTextSwitched) {
      // revert to original
      introTextSwitched = false;
      if (content) content.classList.add('blur-out');
      setTimeout(() => {
        introTitle.textContent = introOriginalTitle || 'Acerca de nosotros';
        introDescription.textContent = introOriginalDescription || 'El auto que era imposible, ahora es una realidad.';
        if (content) content.classList.remove('blur-out');
        // do NOT re-lock scrolling here to avoid user-jank; keep behavior consistent
      }, 500);
    }
  }

  // Attach scroll/wheel/touch listeners to trigger text switch
  function initIntroTextSwitcher() {
    // Set body class to prevent scrolling initially
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay && !introOverlay.classList.contains('has-transitioned')) {
      document.body.classList.add('intro-active');
    }

    let scrollTimeout;
    // For touch we track last Y to determine direction
    let lastTouchY = null;

    const handleWheel = (e) => {
      const introOverlay = document.getElementById('introOverlay');
      if (!introOverlay || introOverlay.classList.contains('has-transitioned')) return;

      // Determine direction from deltaY
      const dir = Math.sign(e.deltaY || 0);

      // Prevent default only before first switch to avoid page jump
      if (!introTextSwitched) {
        e.preventDefault();
        if (e.cancelable) e.stopPropagation();
      }

      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        switchIntroText(dir);
        scrollTimeout = null;
      }, 50);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length) lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const introOverlay = document.getElementById('introOverlay');
      if (!introOverlay || introOverlay.classList.contains('has-transitioned')) return;
      if (!e.touches || !e.touches.length) return;
      const y = e.touches[0].clientY;
      const dir = (lastTouchY !== null) ? Math.sign(lastTouchY - y) : 0; // positive when swiping up -> scroll down

      // If not switched yet, prevent default to avoid page scroll
      if (!introTextSwitched) {
        e.preventDefault();
        if (e.cancelable) e.stopPropagation();
      }

      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        switchIntroText(dir);
        scrollTimeout = null;
      }, 50);

      lastTouchY = y;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    // Keep scroll listener as a fallback, but it's not directional; treat it as 'down'
    const handleScrollFallback = (e) => {
      const introOverlay = document.getElementById('introOverlay');
      if (!introOverlay || introOverlay.classList.contains('has-transitioned')) return;
      if (!introTextSwitched) {
        e.preventDefault();
        if (e.cancelable) e.stopPropagation();
      }
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        switchIntroText(1);
        scrollTimeout = null;
      }, 50);
    };
    window.addEventListener('scroll', handleScrollFallback, { passive: false });
  }

  window.addEventListener('load', initIntroTextSwitcher);
  window.addEventListener('content:loaded', initIntroTextSwitcher);

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();