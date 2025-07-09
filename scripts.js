document.addEventListener("DOMContentLoaded", () => {
  // --- Configuração do Particles.js ---
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#2a2a2a" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#2a2a2a",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  // --- Lógica para Cursor Personalizado ---
  const cursorDot = document.querySelector(".custom-cursor-dot");
  const cursorOutline = document.querySelector(".custom-cursor-outline");
  if (window.matchMedia("(min-width: 1025px)").matches) {
    const hoverables = document.querySelectorAll(
      "a, button, .project-card, .timeline-item, input, textarea, .filter-btn"
    );
    window.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;
      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;
      cursorOutline.style.left = `${x}px`;
      cursorOutline.style.top = `${y}px`;
    });
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursorOutline.classList.add("hover")
      );
      el.addEventListener("mouseleave", () =>
        cursorOutline.classList.remove("hover")
      );
    });
  }

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
});