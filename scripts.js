// Função para o FAQ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Função para enviar formulário de e-mail
  document.querySelector('.email-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Obrigado! Enviaremos mais informações para: ${email}`);
  });

  // Script para funcionalidade do FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      // Seleciona a resposta associada à pergunta
      const answer = question.nextElementSibling;

      // Alterna a visibilidade da resposta
      if (answer.style.display === "block") {
        answer.style.display = "none";
        question.querySelector(".faq-icon").textContent = "+"; // Altera para "+"
      } else {
        answer.style.display = "block";
        question.querySelector(".faq-icon").textContent = "-"; // Altera para "-"
      }
    });
  });
});