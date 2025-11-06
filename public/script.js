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

    if (res.ok) {
      localStorage.setItem("userId", data.userId);
      window.location.href = "login.html";
    }
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
    credentials: "include" // 👈 importante
    });


    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
      localStorage.setItem("userId", data.userId);
      window.location.href = "index.html";
    }
  });
}

async function verificarSessao() {
  try {
    console.log("Verificando sessão...");
    const res = await fetch("/api/session", { 
      credentials: "include",
      headers: {
        "Accept": "application/json"
      }
    });
    const data = await res.json();
    console.log("Estado da sessão:", data);

    const loginLink = document.getElementById("link-login");
    const cadastroLink = document.getElementById("link-cadastro");
    const sairBtn = document.getElementById("botao-sair");
    const menu = document.getElementById("menu");

    console.log("Elementos encontrados:", {
      loginLink: !!loginLink,
      cadastroLink: !!cadastroLink,
      sairBtn: !!sairBtn,
      menu: !!menu
    });

    // Verifica se os elementos existem antes de modificar seus estilos
    if (data.loggedIn) {
      console.log("Usuário está logado, atualizando interface...");
      // Usuário logado → esconder login/cadastro e mostrar apenas "Sair"
      if (loginLink) {
        loginLink.style.display = "none";
        console.log("Login link ocultado");
      }
      if (cadastroLink) {
        cadastroLink.style.display = "none";
        console.log("Cadastro link ocultado");
      }
      if (sairBtn) {
        sairBtn.style.display = "block";
        console.log("Botão sair exibido");
      }
      // Ajusta o estilo do menu quando logado
      if (menu) {
        menu.style.flexDirection = "column";
        menu.style.alignItems = "center";
        menu.classList.add("logged-in");
      }
    } else {
      console.log("Usuário não está logado, restaurando interface...");
      // Usuário não logado → mostrar login/cadastro e esconder "Sair"
      if (loginLink) {
        loginLink.style.display = "block";
        console.log("Login link exibido");
      }
      if (cadastroLink) {
        cadastroLink.style.display = "block";
        console.log("Cadastro link exibido");
      }
      if (sairBtn) {
        sairBtn.style.display = "none";
        console.log("Botão sair ocultado");
      }
      // Reseta o estilo do menu quando deslogado
      if (menu) {
        menu.style.flexDirection = "column";
        menu.style.alignItems = "center";
        menu.classList.remove("logged-in");
      }
    }
  } catch (err) {
    console.error("Erro ao verificar sessão:", err);
  }
}

// Chama automaticamente quando a página carrega
document.addEventListener("DOMContentLoaded", verificarSessao);

// ======================
// LOGOUT
// ======================
async function logout() {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });
    window.location.reload(); // Recarrega para atualizar o menu
  } catch (err) {
    console.error("Erro ao sair:", err);
  }
}

// Aciona o logout ao clicar no botão e verifica a sessão
document.addEventListener('DOMContentLoaded', () => {
  console.log("Documento carregado, verificando sessão...");
  verificarSessao(); // Verifica a sessão quando a página carrega
  
  const botaoSair = document.getElementById("botao-sair");
  console.log("Botão sair encontrado:", !!botaoSair);
  
  if (botaoSair) {
    botaoSair.addEventListener("click", logout);
    console.log("Listener de logout adicionado ao botão");
  }
});