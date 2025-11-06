(() => {
  // --- Seleciona elementos específicos ---
  const examesForm = document.getElementById("exames-form");
  const examesList = document.getElementById("exames-list");

  // --- Carrega ao abrir ---
  document.addEventListener("DOMContentLoaded", exames_load);

  // --- Submissão do formulário ---
  examesForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("exames-name").value.trim();
    const date = document.getElementById("exames-date").value;

    if (!name || !date) return alert("Preencha todos os campos!");

    const exame = { name, date };

    exames_save(exame);
    exames_load(); // Atualiza lista
    examesForm.reset();
  });

  // --- Adiciona item à lista ---
  function exames_addToList(exame) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exame.name} — ${exames_formatDate(exame.date)}</span>
      <button class="delete-btn">Excluir</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      exames_delete(exame);
    });

    examesList.appendChild(li);
  }

  // --- Salvar ---
  function exames_save(exame) {
    const exames = exames_getAll();
    exames.push(exame);
    localStorage.setItem("exames_data", JSON.stringify(exames));
  }

  // --- Pegar ---
  function exames_getAll() {
    return JSON.parse(localStorage.getItem("exames_data")) || [];
  }

  // --- Carregar e ordenar ---
  function exames_load() {
    examesList.innerHTML = "";
    const exames = exames_getAll();
    exames.sort((a, b) => new Date(a.date) - new Date(b.date));
    exames.forEach(exames_addToList);
  }

  // --- Excluir ---
  function exames_delete(exameToDelete) {
    const exames = exames_getAll().filter(exame =>
      !(exame.name === exameToDelete.name && exame.date === exameToDelete.date)
    );
    localStorage.setItem("exames_data", JSON.stringify(exames));
  }

  // --- Formatar data ---
  function exames_formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(`${year}-${month}-${day}T00:00:00`);

    const diasSemana = [
      "Domingo", "Segunda-feira", "Terça-feira",
      "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    const diaSemana = diasSemana[date.getDay()];
    return `${day}/${month}/${year} — ${diaSemana}`;
  }
})();
