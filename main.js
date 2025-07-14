// main.js
// Animations GSAP et micro-interactions sur le contenu dynamique

function animateVitrine() {
  gsap.from('.section-title', { opacity: 0, x: -30, duration: 0.7, delay: 0.1 });
  gsap.from('.section-desc', { opacity: 0, x: -20, duration: 0.7, delay: 0.2 });
  gsap.from('.pricing', { opacity: 0, scale: 0.8, duration: 0.5, delay: 0.3 });
  gsap.from('.section-list li', { opacity: 0, x: -18, stagger: 0.13, duration: 0.5, delay: 0.4 });
  gsap.from('.cta-main', { opacity: 0, y: 18, duration: 0.5, delay: 0.7 });
}

function animateEcommerce() {
  gsap.from('.section-title', { opacity: 0, x: -30, duration: 0.7, delay: 0.1 });
  gsap.from('.section-desc', { opacity: 0, x: -20, duration: 0.7, delay: 0.2 });
  gsap.from('.pricing', { opacity: 0, scale: 0.8, duration: 0.5, delay: 0.3 });
  gsap.from('.section-list li', { opacity: 0, x: -18, stagger: 0.13, duration: 0.5, delay: 0.4 });
  gsap.from('.cta-main', { opacity: 0, y: 18, duration: 0.5, delay: 0.7 });
}

function animateSaaS() {
  gsap.from('.section-title', { opacity: 0, x: -30, duration: 0.7, delay: 0.1 });
  gsap.from('.section-desc', { opacity: 0, x: -20, duration: 0.7, delay: 0.2 });
  gsap.from('.pricing', { opacity: 0, scale: 0.8, duration: 0.5, delay: 0.3 });
  gsap.from('.section-list li', { opacity: 0, x: -18, stagger: 0.13, duration: 0.5, delay: 0.4 });
  gsap.from('.cta-main', { opacity: 0, y: 18, duration: 0.5, delay: 0.7 });
}

function animateContent() {
  const content = document.getElementById('dynamic-content');
  if (!content) return;
  if (content.querySelector('.section-title')) animateVitrine();
  if (content.querySelector('.section-title') && content.innerHTML.includes('E-commerce')) animateEcommerce();
  if (content.querySelector('.section-title') && content.innerHTML.includes('SaaS')) animateSaaS();
}

// Intersection Observer pour reveal au scroll
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7 });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveal() {
  document.querySelectorAll('.valeurs div, .product, .features li').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
}

// Micro-effets sur les boutons (vibration, audio)
function addButtonFeedback() {
  document.querySelectorAll('button, .cta').forEach(btn => {
    btn.addEventListener('click', () => {
      // Vibration mobile
      if (window.navigator.vibrate) window.navigator.vibrate(18);
      // Feedback audio (placeholder)
      // let audio = new Audio('click.mp3'); audio.play();
    });
  });
}

// Animation parallax sur l'image
function addParallaxEffect() {
  const parallax = document.querySelector('.parallax-img');
  if (!parallax) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    parallax.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  window.addEventListener('mouseleave', () => {
    parallax.style.transform = '';
  });
}

// Gestion du modal de contact
function setupContactModal() {
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.querySelector('.close-modal');
  const ctaBtns = document.querySelectorAll('.cta-main');
  ctaBtns.forEach(btn => {
    btn.onclick = () => {
      modal.style.display = 'flex';
      gsap.fromTo('.modal-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' });
    };
  });
  closeBtn.onclick = () => { modal.style.display = 'none'; };
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
  // Formulaire (simulation d'envoi)
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      setTimeout(() => {
        modal.style.display = 'none';
        form.style.display = '';
        success.style.display = 'none';
        form.reset();
      }, 2200);
    };
  }
}

// Hook sur le changement de contenu dynamique
const origUpdateDynamicContent = window.updateDynamicContent;
window.updateDynamicContent = function(mode) {
  origUpdateDynamicContent(mode);
  setTimeout(() => {
    animateContent();
    observeReveal();
    addButtonFeedback();
    addParallaxEffect();
    setupContactModal();
  }, 60);
};

// Premier affichage
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    animateContent();
    observeReveal();
    addButtonFeedback();
    addParallaxEffect();
    setupContactModal();
  }, 400);
}); 