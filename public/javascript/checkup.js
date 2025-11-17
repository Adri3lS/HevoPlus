(() => {
  // --- Seleciona elementos ---
  const examesForm = document.getElementById("exames-form");
  const examesList = document.getElementById("exames-list");
  const sortBtn = document.getElementById("exames-sort");

  // Variável para alternar crescente/decrescente
  let ordemCrescente = true;

  document.addEventListener("DOMContentLoaded", exames_load);

  // --- SUBMIT ---
  examesForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("exames-name").value.trim();
    const date = document.getElementById("exames-date").value;

    if (!name || !date) return alert("Preencha todos os campos!");

    const exame = { name, date };
    exames_save(exame);
    exames_load();
    examesForm.reset();
  });

  // --- Converter yyyy-mm-dd → número yyyymmdd ---
  function dataToNumber(d) {
    return Number(d.replace(/-/g, ""));
  }

  // --- RADIX SORT (crescente) ---
  function radixSort(arr) {
    if (arr.length <= 1) return arr;

    let max = Math.max(...arr);
    let divisor = 1;

    while (parseInt(max / divisor) > 0) {
      const buckets = Array.from({ length: 10 }, () => []);

      arr.forEach(num => {
        const digit = Math.floor(num / divisor) % 10;
        buckets[digit].push(num);
      });

      arr = [].concat(...buckets);
      divisor *= 10;
    }

    return arr;
  }

  // --- BOTÃO A-Z / Z-A ---
  sortBtn.addEventListener("click", () => {
    const exames = exames_getAll();

    // Converte datas para números (yyyymmdd)
    let datasNumericas = exames.map(e => dataToNumber(e.date));

    // Ordena crescente
    let ordenadas = radixSort(datasNumericas);

    // Se for ordem decrescente, inverte
    if (!ordemCrescente) {
      ordenadas.reverse();
    }

    // Alterna para próxima vez
    ordemCrescente = !ordemCrescente;

    // Atualiza texto do botão
    sortBtn.textContent = ordemCrescente ? "A-Z" : "Z-A";

    // Recria lista ordenada
    let novaLista = [];
    ordenadas.forEach(num => {
      const dateStr = num.toString().replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3"
      );
      const item = exames.find(e => e.date === dateStr);
      if (item) novaLista.push(item);
    });

    // Salva nova ordem
    localStorage.setItem("exames_data", JSON.stringify(novaLista));

    exames_load();
  });

  // --- Adiciona na lista ---
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

  // --- Ler ---
  function exames_getAll() {
    return JSON.parse(localStorage.getItem("exames_data")) || [];
  }

  // --- Atualizar interface ---
  function exames_load() {
    examesList.innerHTML = "";
    const exames = exames_getAll();
    exames.forEach(exames_addToList);
  }

  // --- Excluir ---
  function exames_delete(exameToDelete) {
    const exames = exames_getAll().filter(exame =>
      !(exame.name === exameToDelete.name && exame.date === exameToDelete.date)
    );
    localStorage.setItem("exames_data", JSON.stringify(exames));
  }

  // --- Formatar Data ---
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
