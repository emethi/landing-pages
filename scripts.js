// Função para rolar suavemente ao topo (mantida, mas não chamada automaticamente)
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

const menuLinks = document.querySelectorAll('.menu-lateral .nav-link');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu();
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
  // Removido o scrollToTop() automático para evitar rolagem indesejada

  // Lazy loading para iframe
  const iframes = document.querySelectorAll('iframe[data-src]');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  });
  iframes.forEach(iframe => observer.observe(iframe));

  // FAQ interatividade
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

  // Restaurar posição de rolagem ao retornar (se suportado pelo navegador)
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; // Controla manualmente a restauração de rolagem
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }

  // Salvar posição de rolagem antes de sair da página (ao clicar em "Comprar Agora")
  const buyButtons = document.querySelectorAll('.btn');
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    });
  });
});

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