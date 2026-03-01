// ==============================
// BUILDSURGE IRRIGATION - MAIN JS
// ==============================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
const navHamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// --- Mobile nav toggle ---
navHamburger?.addEventListener('click', () => {
  navHamburger.classList.toggle('open');
  navMobile?.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navHamburger?.classList.remove('open');
    navMobile?.classList.remove('open');
  });
});

// --- Active nav link highlighting ---
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
setActiveNav();

// --- Inquiry Form ---
const inquiryForm = document.getElementById('inquiryForm');
const formSuccess = document.getElementById('formSuccess');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Simulate submission delay
    setTimeout(() => {
      inquiryForm.reset();
      btn.disabled = false;
      btn.textContent = 'Send Inquiry';
      if (formSuccess) {
        formSuccess.classList.add('visible');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1200);
  });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Intersection Observer for fade-in animation ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
