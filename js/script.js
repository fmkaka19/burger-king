/**
 * Burger King Fries Guide — Vanilla JavaScript Interactivity
 * Features: Mobile drawer toggle, sticky header, smooth scrollspy, FAQ accordions, 
 * macro bar scroll observer, and back-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Observer
  const header = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button toggle
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);

  // 2. Mobile Drawer Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      hamburgerBtn.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
      hamburgerBtn.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Accessible FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');

    if (button && content) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all other open accordions
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherBtn = otherItem.querySelector('.faq-button');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.style.maxHeight = '0px';
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          button.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
        } else {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstBtn = firstItem.querySelector('.faq-button');
    const firstContent = firstItem.querySelector('.faq-content');
    if (firstItem && firstBtn && firstContent) {
      firstItem.classList.add('is-open');
      firstBtn.setAttribute('aria-expanded', 'true');
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }

  // 4. Scrollspy for Active Navigation Links
  const sections = document.querySelectorAll('section[id]');

  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // 5. Intersection Observer for Macro Progress Bars Animation
  const nutritionSection = document.getElementById('nutrition');
  const progressFills = document.querySelectorAll('.macro-progress-fill');

  if (nutritionSection && progressFills.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            if (targetWidth) {
              fill.style.width = targetWidth;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(nutritionSection);
  }

  // 6. Smooth Back to Top Scroll
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
