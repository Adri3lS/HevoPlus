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
(function() {
  function offsetToHash(smooth = true) {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    const header = document.querySelector('.header');
    const offset = header ? header.offsetHeight + 8 : 0; 
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  }

  window.addEventListener('hashchange', () => offsetToHash(true));
  window.addEventListener('load', () => offsetToHash(false));
})();

const botao = document.getElementById('botaoenviar');
  form.addEventListener('input', () => {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const altura = document.getElementById('altura').value.trim();
    const nivel = document.getElementById('atividade-exames').value;
    if (nome && idade && altura && nivel) {
      botao.disabled = false;
    } else {
      botao.disabled = true;
    }
  });
  function paginacontinuacao() {
    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const nivel = document.getElementById('atividade-exames').value;

    if (!nome || !idade || !altura || !nivel) {
      alert("Preencha todos os campos corretamente!");
      return;
    }else {
      alert("Formulário enviado com sucesso!");
    }
    window.location.href = "continuação-checkup.html";
}
document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('botaoadd');
    const labelExameDiv = document.getElementById('label-exame');
    addButton.addEventListener('click', adicionarNovoExame);
    function adicionarNovoExame() {
        const newLabel = document.createElement('label');
        newLabel.classList.add('checkbox-item');
        newLabel.innerHTML = `
            <input type="checkbox">
            <span><strong>Outro Exame : </strong></span>
            <input type="date">
            <button type="button" class="remove-exame">✖</button>
        `;
        labelExameDiv.appendChild(newLabel);

        
        const removeButton = newLabel.querySelector('.remove-exame');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                newLabel.remove(); 
            });
        }
    }
});