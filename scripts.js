function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const menuToggleInterno = document.querySelector('.menu-toggle-interno');
const menuLateral = document.querySelector('.menu-lateral');

function toggleMenu() {
  if (menuLateral && menuToggle && menuToggleInterno) {
    menuLateral.classList.toggle('active');
    const isExpanded = menuLateral.classList.contains('active');
    menuToggle.classList.toggle('active', isExpanded);
    menuToggleInterno.classList.toggle('active', isExpanded);
    menuToggle.setAttribute('aria-expanded', isExpanded);
    menuToggleInterno.setAttribute('aria-expanded', isExpanded);
  }
}

if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
if (menuToggleInterno) menuToggleInterno.addEventListener('click', toggleMenu);

// Fechar o menu ao clicar nos links de navegação
const menuLinks = document.querySelectorAll('.menu-lateral .nav-link');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu(); // Fecha o menu após o clique
  });
});

document.addEventListener('click', (event) => {
  if (menuLateral && menuToggle) {
    const isClickInsideMenu = menuLateral.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    if (!isClickInsideMenu && !isClickOnToggle && menuLateral.classList.contains('active')) {
      toggleMenu();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  scrollToTop();
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');
      if (answer && icon) {
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
        icon.textContent = isVisible ? '+' : '-';
      }
    });
  });
});

// Verifica se AOS está carregado antes de inicializar
if (typeof AOS !== 'undefined') {
  AOS.init();
}

const carousel = document.querySelector('.carousel');
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function showSlide(index) {
  if (carouselInner && items.length > 0) {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }
}

function nextSlide() {
  if (items.length > 0) {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }
}

function prevSlide() {
  if (items.length > 0) {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  }
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

let timeout;
if (carousel) {
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      if (diffX > 50) nextSlide();
      else if (diffX < -50) prevSlide();
      isDragging = false;
    }, 100);
  });

  carousel.addEventListener('touchend', () => {
    isDragging = false;
  });
}

if (items.length > 0) showSlide(currentIndex);