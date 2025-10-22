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

function paginadieta(){
    window.location.href = "dieta.html";
}
document.addEventListener('DOMContentLoaded',function() {
    const targetId = '#checkup-list';
    const targetElement = document.querySelector(targetId);
});
function paginacheckup(){
    window.location.href = "check-up.html";
}
document.addEventListener('DOMContentLoaded',function() {
    const targetId = '#receitas-list';
    const targetElement = document.querySelector(targetId);
});
function paginareceitas(){
    window.location.href = "receitas.html";
}
document.addEventListener('DOMContentLoaded',function() {
    const targetId = '#exercicios-list';
    const targetElement = document.querySelector(targetId);
});
function paginaexercicios(){
    window.location.href = "exercicios.html";
}

const menuBtn = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  if (menu.classList.contains("show")) {
    // inicia fadeOut
    menu.classList.remove("show");
    menu.classList.add("hide");

    // remove do DOM após a animação
    setTimeout(() => {
      menu.style.display = "none";
    }, 300);
  } else {
    // mostra com fadeIn
    menu.style.display = "flex";
    menu.classList.remove("hide");
    menu.classList.add("show");
  }
});

// fecha o menu ao clicar em um link
menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
    menu.classList.add("hide");
    setTimeout(() => {
      menu.style.display = "none";
    }, 300);
  });
});