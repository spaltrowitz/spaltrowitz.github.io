// ========================================
// Scroll Animations
// ========================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
  observer.observe(el);
});

// ========================================
// Nav scroll effect
// ========================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = scrollY;
});

// ========================================
// Mobile menu toggle
// ========================================
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);

  // Animate hamburger to X
  const spans = toggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ========================================
// Mobile: move project links into header row
// ========================================
function adjustProjectCards() {
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.project-card').forEach(card => {
      const header = card.querySelector('.project-header');
      const links = card.querySelector('.project-links, .project-links-right');
      if (links && links.parentNode !== header) {
        header.insertBefore(links, header.querySelector('.status-badge'));
      }
    });
  }
}
adjustProjectCards();
window.addEventListener('resize', adjustProjectCards);

// ========================================
// Form submission + validation
// ========================================
const form = document.querySelector('.request-form');

form.addEventListener('submit', (e) => {
  const requiredFields = form.querySelectorAll('[required]');
  let firstInvalid = null;

  requiredFields.forEach((field) => {
    const group = field.closest('.form-group');
    const existing = group.querySelector('.error-msg');
    if (existing) existing.remove();

    if (!field.value.trim()) {
      e.preventDefault();
      field.style.borderColor = '#EF4444';
      const msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = 'This field is required';
      msg.style.color = '#EF4444';
      msg.style.fontSize = '0.8rem';
      msg.style.marginTop = '4px';
      group.appendChild(msg);
      if (!firstInvalid) firstInvalid = field;
    } else {
      field.style.borderColor = '';
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
});

// Clear error on input
form.querySelectorAll('[required]').forEach((field) => {
  field.addEventListener('input', () => {
    field.style.borderColor = '';
    const msg = field.closest('.form-group').querySelector('.error-msg');
    if (msg) msg.remove();
  });
});
