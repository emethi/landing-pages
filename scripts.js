// Função para rolar a página para o topo ao atualizar
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Rolagem suave para uma melhor experiência
  });
}

// Menu Lateral
const menuToggle = document.querySelector('.menu-toggle');
const menuToggleInterno = document.querySelector('.menu-toggle-interno');
const menuLateral = document.querySelector('.menu-lateral');

function toggleMenu() {
  menuLateral.classList.toggle('active');
  const isExpanded = menuLateral.classList.contains('active');
  menuToggle.classList.toggle('active', isExpanded);
  menuToggleInterno.classList.toggle('active', isExpanded);
  menuToggle.setAttribute('aria-expanded', isExpanded);
  menuToggleInterno.setAttribute('aria-expanded', isExpanded);
}

menuToggle.addEventListener('click', toggleMenu);
menuToggleInterno.addEventListener('click', toggleMenu);

document.addEventListener('click', (event) => {
  const isClickInsideMenu = menuLateral.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);
  if (!isClickInsideMenu && !isClickOnToggle && menuLateral.classList.contains('active')) {
    menuLateral.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggleInterno.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', false);
    menuToggleInterno.setAttribute('aria-expanded', false);
  }
});

// FAQ e Scroll ao carregar
document.addEventListener('DOMContentLoaded', () => {
  // Rola para o topo ao carregar a página
  scrollToTop();

  // FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');
      const isVisible = answer.style.display === 'block';
      answer.style.display = isVisible ? 'none' : 'block';
      icon.textContent = isVisible ? '+' : '-';
    });
  });
});

  AOS.init()

  // Carrossel Alunos Formados
  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  }

  // Botões
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Eventos de toque
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    // Define o limite de movimento para considerar um swipe
    if (diffX > 50) {
      nextSlide();
      isDragging = false;
    } else if (diffX < -50) {
      prevSlide();
      isDragging = false;
    }
  });

  carousel.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Mostra o primeiro slide ao carregar
  showSlide(currentIndex);
