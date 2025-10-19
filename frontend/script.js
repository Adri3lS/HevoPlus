function voltarinicio(){
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  if (!header) {
    console.error('Header com classe .header não encontrado.');
    return;
  }

  const threshold = 50; // px

  function onScroll() {
    if (window.scrollY > threshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // garante o estado certo ao carregar
});

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll("#list-container");

  function animarScroll() {
    const windowTop = window.innerHeight * 0.60; // 60% da tela

    elementos.forEach(el => {
      const topoElemento = el.getBoundingClientRect().top;

      if (topoElemento < windowTop) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", animarScroll);
  animarScroll(); // executa ao carregar
});

function paginaguia(){
    window.location.href = "guia-alimentar.html";
}