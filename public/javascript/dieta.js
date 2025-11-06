document.getElementById("macroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const idade = parseInt(document.getElementById("idade").value);
  const sexo = document.getElementById("sexo").value;
  const atividade = document.getElementById("atividade").value;
  const objetivo = document.getElementById("objetivo").value;

  if (!peso || !altura || !idade || !sexo || !atividade || !objetivo) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  
  let tmb;
  if (sexo === "masculino") {
    tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
  } else {
    tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
  }

  // 🔥 Fator de atividade
  const fatores = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725
  };

  let calorias = tmb * fatores[atividade];

  // 🎯 Ajuste de acordo com o objetivo
  if (objetivo === "emagrecer") calorias -= 400;
  if (objetivo === "ganhar") calorias += 400;

  // 🍗 Macronutrientes (divisão padrão)
  let proteina = (peso * 2.0); // 2g por kg
  let gordura = ((calorias * 0.25) / 9);
  let carboidrato = ((calorias - (proteina * 4 + gordura * 9)) / 4);

  // 🧾 Exibir resultado
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>Resultados estimados:</h3>
    <ul>
      <li><strong>Calorias diárias:</strong> ${calorias.toFixed(0)} kcal</li>
      <li><strong>Proteínas:</strong> ${proteina.toFixed(1)} g</li>
      <li><strong>Gorduras:</strong> ${gordura.toFixed(1)} g</li>
      <li><strong>Carboidratos:</strong> ${carboidrato.toFixed(1)} g</li>
    </ul>
  `;
});