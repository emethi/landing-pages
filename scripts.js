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

  AOS.init();
