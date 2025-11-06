function voltarinicio(){
    window.location.href = "index.html";
}



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

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById("btn-menu");
  const menu = document.getElementById("menu");

  if (menuBtn && menu) {
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
  }
});

// ===== CADASTRO =====
const cadastroBotao = document.getElementById("cadastrobotao");
if (cadastroBotao) {
  cadastroBotao.addEventListener("click", async () => {
    const email = document.getElementById("emailcadastro").value.trim();
    const password = document.getElementById("senhacadastro").value.trim();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  });
}

// ===== LOGIN =====
const loginBotao = document.getElementById("loginbotao");
if (loginBotao) {
  loginBotao.addEventListener("click", async () => {
    const email = document.getElementById("emaillogin").value.trim();
    const password = document.getElementById("senhalogin").value.trim();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
      localStorage.setItem("userId", data.userId);
      window.location.href = "index.html";
    }
  });
}


