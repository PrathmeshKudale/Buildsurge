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
// ⚠️  IMPORTANT: Replace the URL below with YOUR Formspree endpoint.
//    Steps: 1) Go to https://formspree.io  2) Sign up (free)
//           3) Create a new form → copy the endpoint URL → paste it here
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meelwggn';

const inquiryForm = document.getElementById('inquiryForm');
const formSuccess = document.getElementById('formSuccess');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    btn.disabled = true;
    btn.innerHTML = 'Sending… <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>';

    // Collect form data
    const data = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phone: this.phone.value,
      email: this.email.value,
      company: this.company.value,
      pipeSize: this.pipeSize.value,
      quantity: this.quantity.value,
      application: this.application.value,
      message: this.message.value,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Success
        inquiryForm.reset();
        inquiryForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('visible');
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        const result = await response.json();
        alert('Submission failed: ' + (result.error || 'Please try again or contact us directly.'));
        btn.disabled = false;
        btn.innerHTML = 'Send Inquiry <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
      btn.disabled = false;
      btn.innerHTML = 'Send Inquiry <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    }
  });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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
