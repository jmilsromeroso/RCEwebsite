import './style.css'

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  function showPage(pageId) {
    pages.forEach(page => {
      page.classList.remove('active');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }

    window.scrollTo(0, 0);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      showPage(pageId);
      history.pushState({ page: pageId }, '', `#${pageId}`);
    });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash) {
    showPage(hash);
  } else {
    showPage('home');
  }

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      showPage(e.state.page);
    }
  });
}

function initForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Form submitted successfully! (This is a demo)');
      form.reset();
    });
  });
}

function initFooterLinks() {
  const footerLinks = document.querySelectorAll('.footer a[href^="#"]');

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href').replace('#', '');
      const navLink = document.querySelector(`[data-page="${href}"]`);
      if (navLink) {
        navLink.click();
      }
    });
  });

  const contactButton = document.querySelector('.contact-button');
  if (contactButton) {
    contactButton.addEventListener('click', () => {
      const contactLink = document.querySelector('[data-page="contact"]');
      if (contactLink) {
        contactLink.click();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initForms();
  initFooterLinks();
});
