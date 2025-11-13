async function chargerDashboard() {
    const formations = await getData("formations");
    const inscriptions = await getData("inscriptions");
    const apprenants = await getData("apprenants");

    document.getElementById("statistiquesContainer").innerHTML = `
    <p>📚 Formations : ${formations.length}</p>
    <p>🧾 Inscriptions : ${inscriptions.length}</p>
    <p>👨‍🎓 Apprenants : ${apprenants.length}</p>
  `;
}

chargerDashboard();
