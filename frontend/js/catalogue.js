const catalogueContainer = document.getElementById("catalogueContainer");
const searchInput = document.getElementById("searchInput");

async function chargerFormations() {
    const formations = await getData("formations");
    afficherFormations(formations);
}

function afficherFormations(formations) {
    catalogueContainer.innerHTML = formations.map(f => `
    <div class="card">
      <h2>${f.titre}</h2>
      <p>${f.categorie} — ${f.duree}</p>
      <a class="btn" href="detail.html?id=${f.id}">Voir les détails</a>
    </div>
  `).join('');
}

searchInput.addEventListener("input", async (e) => {
    const recherche = e.target.value.toLowerCase();
    const toutesFormations = await getData("formations");
    const filtrées = toutesFormations.filter(f =>
        f.titre.toLowerCase().includes(recherche)
    );
    afficherFormations(filtrées);
});

chargerFormations();
