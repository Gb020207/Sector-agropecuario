
  // Carrusel automático
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  function showSlides() {
    index++;
    if (index >= slides.length) index = 0;
    document.querySelector(".carousel").style.transform = translateX(`-${index * 100}vw`);
  }
  setInterval(showSlides, 4000);

  