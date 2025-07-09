// --- Painel de Animação de Números ---
const animateNumbers = () => {
  const counters = document.querySelectorAll('.stat-number');
  
  // Opções para o observer
  const observerOptions = {
    root: null, // Observa em relação à viewport
    rootMargin: '0px',
    threshold: 0.4 // Dispara quando 40% do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const counter = entry.target;
      
      // Se o elemento ESTÁ visível na tela
      if (entry.isIntersecting) {
        const target = +counter.getAttribute('data-target');
        counter.innerText = '0+'; // Garante que a contagem sempre comece do zero

        let count = 0;
        const speed = 150; // Ajuste a velocidade se desejar (maior = mais lento)
        const increment = target / speed;

        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count) + '+';
            setTimeout(updateCount, 10); // Intervalo da animação
          } else {
            counter.innerText = target + '+'; // Garante o valor final exato
          }
        };

        updateCount();
        
      } else {
        // Se o elemento NÃO ESTÁ mais visível, reseta o contador
        counter.innerText = '0+';
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
};

  // Chama a função para iniciar a observação
  animateNumbers();

  // --- Lógica para Menu Mobile ---
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.querySelector("i").classList.toggle("fa-bars");
    navToggle.querySelector("i").classList.toggle("fa-times");
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.querySelector("i").classList.remove("fa-times");
        navToggle.querySelector("i").classList.add("fa-bars");
      }
    });
  });

  // --- Lógica para Filtro de Projetos ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        card.style.transition = "transform 0.4s, opacity 0.4s";
        card.style.transform = "scale(0.9)";
        card.style.opacity = "0";
        setTimeout(() => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.transform = "scale(1)";
              card.style.opacity = "1";
            }, 10);
          } else {
            card.style.display = "none";
          }
        }, 400);
      });
    });
  });

  // --- Lógica para Expandir/Colapsar Detalhes ---
  document.querySelectorAll(".expand-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      card.classList.toggle("expanded");
      const details = card.querySelector(".project-details");
      if (card.classList.contains("expanded")) {
        details.style.maxHeight = details.scrollHeight + "px";
        btn.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>';
      } else {
        details.style.maxHeight = "0";
        btn.innerHTML = 'Ver mais <i class="fas fa-chevron-down"></i>';
      }
    });
  });

  // --- Lógica do Botão Scroll-to-Top ---
  const scrollTopBtn = document.getElementById("scroll-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Envio de e-mail
  document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário e o elemento de status
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');

    // Função para lidar com o envio do formulário
    async function handleSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página
        var data = new FormData(event.target);

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Sucesso no envio
                status.innerHTML = "Obrigado! Sua mensagem foi enviada.";
                status.style.color = "#00e676"; // Um verde para sucesso
                form.reset(); // Limpa o formulário
            } else {
                // Se o servidor responder com um erro
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                    }
                    status.style.color = "#ff5252"; // Um vermelho para erro
                })
            }
        }).catch(error => {
            // Erro de rede ou outro problema
            status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
            status.style.color = "#ff5252"; // Um vermelho para erro
        });
    }

    // Adiciona o "escutador" de evento ao formulário
    form.addEventListener("submit", handleSubmit);
});