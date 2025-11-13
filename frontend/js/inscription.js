const formInscription = document.getElementById("formulaireInscription");
const selectApprenant = document.getElementById("selectApprenant");
const selectFormation = document.getElementById("selectFormation");
const messageInscription = document.getElementById("messageInscription");

// Charger les apprenants et formations pour remplir les listes
async function chargerListes() {
    const apprenants = await getData("apprenants");
    const formations = await getData("formations");

    // Remplir la liste des apprenants
    apprenants.forEach(a => {
        const option = document.createElement("option");
        option.value = a.id; // ID envoyé à l'API
        option.textContent = a.nom; // Nom affiché
        selectApprenant.appendChild(option);
    });

    // Remplir la liste des formations
    formations.forEach(f => {
        const option = document.createElement("option");
        option.value = f.id; // ID envoyé à l'API
        option.textContent = f.titre; // Titre affiché
        selectFormation.appendChild(option);
    });
}

// Gérer la soumission du formulaire
formInscription.addEventListener("submit", async (event) => {
    event.preventDefault();

    const apprenantId = Number(selectApprenant.value);
    const formationId = Number(selectFormation.value);

    // Vérifier si l'apprenant est déjà inscrit à cette formation
    const existantes = await getData(`inscriptions?apprenantId=${apprenantId}&formationId=${formationId}`);
    if (existantes.length > 0) {
        messageInscription.textContent = "L'apprenant est déjà inscrit à cette formation.";
        messageInscription.style.color = "orange";
        return;
    }

    // Créer l'inscription
    const nouvelleInscription = {
        apprenantId,
        formationId,
        dateInscription: new Date().toISOString().split("T")[0]
    };

    const response = await sendData("inscriptions", "POST", nouvelleInscription);

    if (response.ok) {
        messageInscription.textContent = "Inscription réussie !";
        messageInscription.style.color = "green";
    } else {
        messageInscription.textContent = "Erreur lors de l'inscription.";
        messageInscription.style.color = "red";
    }
});

// Charger les listes au démarrage
chargerListes();
