document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica do Theme Toggle ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.classList.add("dark-theme");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    body.classList.remove("dark-theme");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "light");
    }
  });

  // --- Lógica do Cursor Personalizado ---
  const cursorDot = document.querySelector(".custom-cursor-dot");
  const cursorOutline = document.querySelector(".custom-cursor-outline");

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    cursorDot.style.left = `${clientX}px`;
    cursorDot.style.top = `${clientY}px`;
    cursorOutline.animate(
      { left: `${clientX}px`, top: `${clientY}px` },
      { duration: 500, fill: "forwards" }
    );
  });

  document
    .querySelectorAll(
      "a, button, .project-card, .filter-btn, .cert-card, .timeline-content"
    )
    .forEach((el) => {
      el.addEventListener("mouseover", () => cursorOutline.classList.add("hover"));
      el.addEventListener("mouseleave", () =>
        cursorOutline.classList.remove("hover")
      );
    });

  // --- Painel de Animação de Números ---
  const animateNumbers = () => {
    const counters = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.hasAttribute("data-animated")) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            counter.setAttribute("data-animated", "true");
            counter.innerText = "0+";
            let count = 0;
            const speed = 100;
            const increment = target / speed;

            const updateCount = () => {
              if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count) + "+";
                setTimeout(updateCount, 15);
              } else {
                counter.innerText = target + "+";
              }
            };
            updateCount();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
  };
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
        const isVisible = filter === "all" || card.dataset.category === filter;

        card.style.transition = "all 0.4s ease"; // Transição mais abrangente
        
        if (isVisible) {
          // Revelar o card
          card.style.width = "340px"; // Largura original
          card.style.marginRight = "1.5rem"; // Gap original
          card.style.opacity = "1";
          card.querySelector('.project-image').style.height = '200px'; // Altura original da imagem
          card.style.padding = "0"; // Resetar padding do card (conteúdo interno tem padding)
          card.style.transform = "scale(1)";
        } else {
          // Esconder o card
          card.style.width = "0";
          card.style.marginRight = "0";
          card.style.opacity = "0";
          card.querySelector('.project-image').style.height = '0'; // Encolher a imagem
          card.style.padding = "0"; // Remover padding
          card.style.transform = "scale(0.8)"; // Pequeno encolhimento antes de sumir
        }
      });
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

  // --- NOVO: Lógica de Scroll Horizontal (Arrastar) ---
  const sliders = document.querySelectorAll(".scroll-wrapper");
  let isDown = false;
  let startX;
  let scrollLeft;

  sliders.forEach((slider) => {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Multiplicador para scroll mais rápido
      slider.scrollLeft = scrollLeft - walk;
    });
    // Adicionar eventos touch para mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchend', () => {
        isDown = false;
    });
    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
  });

  // --- Lógica do Formulário (Formspree) ---
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Obrigado! Sua mensagem foi enviada.";
          status.style.color = "#00e676";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! Ocorreu um problema ao enviar seu formulário.";
            }
            status.style.color = "#ff5252";
          });
        }
      })
      .catch((error) => {
        status.innerHTML =
          "Oops! Ocorreu um problema ao enviar seu formulário.";
        status.style.color = "#ff5252";
      });
  }
  form.addEventListener("submit", handleSubmit);
});