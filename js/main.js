/* ==========================================================================
   sd.insure — Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  /* Mobile Nav Toggle
     ====================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* Scroll-Triggered Fade-In
     ====================================================================== */
  var fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* Active Nav Link Highlighting
     ====================================================================== */
  var currentPath = window.location.pathname;
  var navAnchors = document.querySelectorAll('.nav-links a');

  navAnchors.forEach(function (link) {
    var href = link.getAttribute('href');
    // Normalize paths for comparison
    var linkPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');

    if (
      currentPath === href ||
      currentPath === linkPath ||
      (linkPath !== '/' && currentPath.startsWith(linkPath))
    ) {
      link.classList.add('active');
    }
  });
})();
