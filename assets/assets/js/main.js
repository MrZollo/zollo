/**
 * main.js - Fixed version for SnapFolio (Zulhairy Yussof)
 * Adds safety checks to prevent null element errors.
 */

(function() {
  "use strict";

  /**
   * Helper function to select elements
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Helper function to add event listeners
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Header toggle for mobile
   */
  const headerToggle = select('.header-toggle');
  const header = select('#header');

  if (headerToggle && header) {
    on('click', '.header-toggle', function(e) {
      header.classList.toggle('open');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Smooth scroll for nav links
   */
  on('click', '#navmenu a', function(e) {
    const target = select(this.hash);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  }, true);

  /**
   * Scroll-top button functionality
   */
  const scrollTop = select('#scroll-top');
  if (scrollTop) {
    const toggleScrollTop = () => {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
    on('click', '#scroll-top', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /**
   * Initialize AOS (Animate On Scroll)
   */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * Initialize Swiper for portfolio sliders
   */
  if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.init-swiper').forEach(swiperEl => {
      const config = JSON.parse(swiperEl.querySelector('.swiper-config').textContent);
      new Swiper(swiperEl, config);
    });
  }

  /**
   * Initialize GLightbox for image previews
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

})();
