
 // Scroll reveal con IntersectionObserver + secuencia
document.addEventListener("DOMContentLoaded", () => {
  // elementos a revelar
  const heroTitle = document.querySelector(".hero-title");
  const heroSub = document.querySelector(".hero-sub");
  const ctas = document.querySelectorAll(".btn-cta, .btn-outline-cta");
  const miniPanel = document.querySelector(".mini-panel");
  const sectionTitle = document.querySelector(".section-title");
  const features = document.querySelectorAll(".feature-box");

  // Añadimos un pequeño retraso secuencial al cargar la página
  setTimeout(() => {
    heroTitle.classList.add("revealed", "reveal-delay-1");
    heroSub.classList.add("revealed", "reveal-delay-2");
    ctas.forEach((el, i) => el.classList.add("revealed",`reveal-delay-${3 + i}`));
    miniPanel.classList.add("revealed", "reveal-delay-5");
  }, 120);

  // IntersectionObserver para revelar elementos al hacer scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // si es la sección principal, secuenciamos features
        if (entry.target.classList.contains("section-title")) {
          entry.target.classList.add("revealed");
          // revelar features en cadena
          features.forEach((f, i) => {
            setTimeout(() => f.classList.add("revealed"), 120 * i);
          });
        } else {
          entry.target.classList.add("revealed");
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  // Observamos elementos que deben revelarse al scroll
  [sectionTitle, ...features].forEach(el => { if (el) io.observe(el); });

  // Brillo al botón
  const btn = document.getElementById("btnLogin");
  if (btn) {
    btn.addEventListener("mouseenter", () => btn.classList.add("hover-glow"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("hover-glow"));
  }
});

// Detecta los elementos al hacer scroll
const boxes = document.querySelectorAll('.feature-box');

window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
  const triggerBottom = window.innerHeight * 0.85;

  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add('visible');
    } else {
      box.classList.remove('visible');
    }
  });
}

// Suave aparición al cargar
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2')
    .forEach(el => {
      el.style.opacity = 1;
    });
});